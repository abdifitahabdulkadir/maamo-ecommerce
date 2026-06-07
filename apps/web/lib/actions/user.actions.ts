"use server";

import { BASE_URL, serverFetch } from "@/lib/fetch";
import {
  type ActionResponse,
  type LoginSchemaType,
  type RegisterSchemaType,
  type SessionUser,
} from "@org/lib";
import { cookies } from "next/headers";

async function getSessionToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("session")?.value ?? null;
}

export async function signUp(
  data: RegisterSchemaType,
): Promise<ActionResponse<{ userId: string }>> {
  return serverFetch<{ userId: string }>("/api/auth/signup", {
    method: "POST",
    body: data,
  });
}

export async function signIn(
  data: LoginSchemaType,
): Promise<ActionResponse<string>> {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json().catch(() => null);

    if (!res.ok) {
      const message =
        json?.message ?? json?.errors?.message ?? `Sign in failed (${res.status})`;
      return { status: false, errors: { message } };
    }

    const setCookieHeader = res.headers.get("set-cookie");
    if (setCookieHeader) {
      const token = setCookieHeader.split(";")[0].split("=")[1];
      const cookieStore = await cookies();
      cookieStore.set("session", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });
    }

    return { status: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not reach the server.";
    return { status: false, errors: { message } };
  }
}

export async function getSession(): Promise<ActionResponse<SessionUser>> {
  const token = await getSessionToken();
  if (!token) return { status: false, errors: { message: "No session" } };

  return serverFetch<SessionUser>("/api/auth/session", {
    cookie: `session=${token}`,
    cache: "no-store",
  });
}

export async function signOut(): Promise<ActionResponse<string>> {
  const token = await getSessionToken();
  if (!token) return { status: false, errors: { message: "No active session" } };

  const result = await serverFetch<string>("/api/auth/signout", {
    method: "POST",
    cookie: `session=${token}`,
  });

  if (result.status) {
    const cookieStore = await cookies();
    cookieStore.delete("session");
  }

  return result;
}
