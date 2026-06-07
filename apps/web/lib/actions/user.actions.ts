"use server";

import { type ActionResponse, type LoginSchemaType, type RegisterSchemaType } from "@org/lib";
import { cookies } from "next/headers";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3001";

export async function signUp(data: RegisterSchemaType): Promise<ActionResponse<string>> {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => null);
      const message = body?.message ?? `Registration failed (${res.status})`;
      return { status: false, errors: { message } };
    }
    return { status: true };
  } catch (error) {
    console.log("current Error: ",error)
    return { status: false, errors: { message: error instanceof Error ? error.message : "Failed to reach the server." } };
  }
}

export async function signIn(data: LoginSchemaType): Promise<ActionResponse<string>> {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
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

    return {
      status:true,
    }
  } catch {
    return { status: false, errors: { message: "Could not reach the server." } };
  }
}
