"use server";
import { ActionResponse, Product } from "@org/lib";
import { serverFetch } from "../fetch";
import { getSessionToken } from "./user.actions";

export async function GetAllProducts(): Promise<ActionResponse<Product[]>> {
  try {
    const token = await getSessionToken();
    const result = await serverFetch<Product[]>("/api/products", {
      method: "GET",
      cookie: `session=${token}`,
    });
    return { status: true, data: result.data };
  } catch (error) {
    return {
      status: false,
      errors: { message: error instanceof Error ? error.message : "Failed to load Products" },
    };
  }
}

export async function GetProductById(id: string): Promise<ActionResponse<Product>> {
  try {
    const token = await getSessionToken();
    const result = await serverFetch<Product>(`/api/products/${id}`, {
      method: "GET",
      cookie: `session=${token}`,
    });
    return { status: result.status, data: result.data, errors: result.errors };
  } catch (error) {
    return {
      status: false,
      errors: { message: error instanceof Error ? error.message : "Failed to load product" },
    };
  }
}

export async function GetRelatedProducts(
  category: string,
  excludeId: string,
): Promise<ActionResponse<Product[]>> {
  try {
    const token = await getSessionToken();
    const params = new URLSearchParams({ category, excludeId });
    const result = await serverFetch<Product[]>(`/api/products/related?${params}`, {
      method: "GET",
      cookie: `session=${token}`,
    });
    return { status: result.status, data: result.data, errors: result.errors };
  } catch (error) {
    return {
      status: false,
      errors: { message: error instanceof Error ? error.message : "Failed to load related products" },
    };
  }
}
