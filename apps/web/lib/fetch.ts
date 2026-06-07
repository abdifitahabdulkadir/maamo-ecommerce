import { type ActionResponse } from "@org/lib";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3001";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type FetchOptions = {
  method?: Method;
  body?: unknown;
  cookie?: string;
  cache?: RequestCache;
};

export async function serverFetch<T>(
  path: string,
  options: FetchOptions = {},
): Promise<ActionResponse<T>> {
  const { method = "GET", body, cookie, cache } = options;

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (cookie) headers["Cookie"] = cookie;

  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      cache,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

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

export { BASE_URL };
