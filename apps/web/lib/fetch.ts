import { ActionResponse } from "@org/lib";
import { HTTP_METHOD } from "next/dist/server/web/http";


const BASE_URL = process.env.BASE_URL ?? "http://localhost:3001";

type RequestParams<B = unknown> = {
  url: string;
  method: HTTP_METHOD;
  headers?: Record<string, string>;
  body?: B;
  params?: Record<string, string>;
  isMultipart?: boolean;
};

export async function handleRequest<T = unknown, B = unknown>(
  options: RequestParams<B>,
): Promise<ActionResponse<T>> {
  const { url, method, headers = {}, body, params, isMultipart } = options;

  if (!isMultipart) {
    headers["Content-Type"] = "application/json";
  }



  const queryString =
    params && Object.keys(params).length > 0
      ? `?${new URLSearchParams(params).toString()}`
      : "";
  const fullUrl = `${BASE_URL}${url}${queryString}`;

  try {
    const res = await fetch(fullUrl, {
      method,
      headers,
      credentials: "include",
      body:
        body === undefined
          ? undefined
          : isMultipart
            ? (body as FormData)
            : JSON.stringify(body),
    });

    const data: T = await res.json();
    return { status: true, data };
  } catch (err) {
    const message = err instanceof Error ? err.message : "An unexpected error occurred";
    return { status: false, errors: { message } };
  }
}
