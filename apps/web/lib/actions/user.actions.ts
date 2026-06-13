"use server";

import { serverFetch } from "@/lib/fetch";
import {
  AuthCookieType,
  parseError,
  type ActionResponse,
  type LoginSchemaType,
  type RegisterSchemaType,
  type SessionUser,
} from "@org/lib";
import { cookies } from "next/headers";

// get user session from cookie.
export async function getSessionToken(): Promise<
  ActionResponse<string | null>
> {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session")?.value ?? null;

    return {
      status: true,
      data: sessionToken,
    };
  } catch (error) {
    return {
      status: false,
      errors: {
        message: parseError(error, "Failed to get Sesssion. try again."),
      },
    };
  }
}

export async function signUp(
  data: RegisterSchemaType,
): Promise<ActionResponse<{ userId: string }>> {
  try {
    return serverFetch<{ userId: string }>("/api/auth/signup", {
      method: "POST",
      body: data,
    });
  } catch (error) {
    return {
      status: false,
      errors: {
        message: parseError(error, "Failed to SignUp. try again."),
      },
    };
  }
}

export async function signIn(
  data: LoginSchemaType,
): Promise<ActionResponse<string>> {
  try {
    const result = await serverFetch<AuthCookieType>("/api/auth/signin", {
      method: "POST",
      body: data,
    });
    if (!result.status) {
      throw new Error(result.errors?.message);
    }

    if (result.status && result.data) {
      const { token, expiresInMilliseconds } = result.data;
      const cookieStore = await cookies();
      cookieStore.set("session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        expires: new Date(expiresInMilliseconds),
      });
    }

    return {
      status: true,
    };
  } catch (error) {
    return {
      status: false,
      errors: {
        message: parseError(error, "Failed to Login. try again."),
      },
    };
  }
}

export async function getSession(): Promise<ActionResponse<SessionUser>> {
  try {
    const result = await getSessionToken();
    if (!result.status || !result.data)
      return { status: false, errors: { message: "No session" } };

    const dataSession = await serverFetch<SessionUser>("/api/auth/session", {
      cache: "no-store",
    });
    if (!dataSession.status) {
      return { status: false, errors: { message: "No session" } };
    }
    return dataSession;
  } catch (error) {
    return {
      status: false,
      errors: {
        message: parseError(error, "Failed to Login. try again."),
      },
    };
  }
}

export async function signOut(): Promise<ActionResponse<string>> {
  try {
    const data = await getSessionToken();
    if (!data.status || !data.data)
      return { status: false, errors: { message: "No active session" } };

    const result = await serverFetch<string>("/api/auth/signout", {
      method: "POST",
    });

    if (result.status) {
      const cookieStore = await cookies();
      cookieStore.delete("session");
    }
    return result;
  } catch (error) {
    return {
      status: false,
      errors: {
        message: parseError(error, "Failed to get Sesssion. try again."),
      },
    };
  }
}
