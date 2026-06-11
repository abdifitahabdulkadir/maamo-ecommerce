"use server";

import { serverFetch } from "@/lib/fetch";
import {
  type ActionResponse,
  type LoginSchemaType,
  type RegisterSchemaType,
  type SessionUser,
} from "@org/lib";
import { cookies } from "next/headers";

export async function getSessionToken(): Promise<string | null> {
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
  return serverFetch<string>("/api/auth/signin", {
    method: "POST",
    body: data,
  });
}

export async function getSession(): Promise<ActionResponse<SessionUser>> {
  const token = await getSessionToken();
  if (!token) return { status: false, errors: { message: "No session" } };

  return serverFetch<SessionUser>("/api/auth/session", { cache: "no-store" });
}



export async function signOut(): Promise<ActionResponse<string>> {
  const token = await getSessionToken();
  if (!token) return { status: false, errors: { message: "No active session" } };

  return serverFetch<string>("/api/auth/signout", { method: "POST" });
}
