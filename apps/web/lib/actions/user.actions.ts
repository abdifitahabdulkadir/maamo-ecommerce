"use server";

import { type ActionResponse, type LoginSchemaType, type RegisterSchemaType } from "@org/lib";
import { cookies } from "next/headers";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3001";

function parseSetCookie(header: string) {
  const [nameValue, ...attrs] = header.split(";").map((s) => s.trim());
  const eqIdx = nameValue.indexOf("=");
  const name = nameValue.slice(0, eqIdx);
  const value = nameValue.slice(eqIdx + 1);

  const options: {
    path?: string;
    expires?: Date;
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: "lax" | "strict" | "none";
  } = {};

  for (const attr of attrs) {
    const lower = attr.toLowerCase();
    if (lower.startsWith("expires=")) options.expires = new Date(attr.slice(8));
    else if (lower.startsWith("path=")) options.path = attr.slice(5);
    else if (lower === "httponly") options.httpOnly = true;
    else if (lower === "secure") options.secure = true;
    else if (lower.startsWith("samesite="))
      options.sameSite = attr.slice(9).toLowerCase() as "lax" | "strict" | "none";
  }

  return { name, value, options };
}

export async function signUp(data: RegisterSchemaType): Promise<ActionResponse<string>> {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  } catch {
    return { status: false, errors: { message: "Could not reach the server." } };
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
      const { name, value, options } = parseSetCookie(setCookieHeader);
      const cookieStore = await cookies();
      cookieStore.set(name, value, options);
    }

    return res.json();
  } catch {
    return { status: false, errors: { message: "Could not reach the server." } };
  }
}
