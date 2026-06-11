import { type ActionResponse } from "@org/lib";
import { cookies } from "next/headers";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3001";
const SESSION_COOKIE = "session";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type FetchOptions = {
  method?: Method;
  body?: unknown;
  cache?: RequestCache;
};

export async function serverFetch<T>(
  path: string,
  options: FetchOptions = {},
): Promise<ActionResponse<T>> {
  const { method = "GET", body, cache } = options;

  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers["Cookie"] = `${SESSION_COOKIE}=${token}`;

  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      cache,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    await relaySessionCookie(res);

    const json = await res.json().catch(() => null);

    if (!res.ok) {
      const message =
        json?.message ??
        json?.errors?.message ??
        `Request failed (${res.status})`;
      return { status: false, errors: { message } };
    }

    return json as ActionResponse<T>;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Network error";
    return { status: false, errors: { message } };
  }
}

// The browser never talks to the API directly, so its Set-Cookie header
// stops at the Next.js server. This forwards the API's `session` cookie
// onto the browser response (set on sign-in, removed on sign-out). The API
// only sends Set-Cookie from sign-in/sign-out, which are invoked as server
// actions where cookie mutation is allowed.
async function relaySessionCookie(res: Response) {
  const sessionCookie = res.headers
    .getSetCookie()
    .find((cookie) => cookie.startsWith(`${SESSION_COOKIE}=`));
  if (!sessionCookie) return;

  const [pair, ...attributes] = sessionCookie.split(";");
  const token = pair.slice(pair.indexOf("=") + 1).trim();
  const expiresValue = attributes
    .map((attribute) => attribute.trim())
    .find((attribute) => attribute.toLowerCase().startsWith("expires="))
    ?.slice("expires=".length);
  const expires = expiresValue ? new Date(expiresValue) : undefined;

  const cookieStore = await cookies();
  if (!token || (expires && expires.getTime() <= Date.now())) {
    cookieStore.delete(SESSION_COOKIE);
    return;
  }

  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires,
  });
}

export { BASE_URL };
