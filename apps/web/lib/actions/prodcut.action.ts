"use server";
import { ActionResponse, PaginatedProducts, Product, ProductsQuery } from "@org/lib";
import { serverFetch } from "../fetch";

export async function GetAllProducts({
  page = 1,
  limit = 20,
  search = "",
  category = "",
}: ProductsQuery = {}): Promise<ActionResponse<PaginatedProducts>> {
  try {
    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    if (search) params.set("search", search);
    if (category) params.set("category", category);
    const result = await serverFetch<PaginatedProducts>(`/api/products?${params}`, {
      method: "GET",
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
    const result = await serverFetch<Product>(`/api/products/${id}`, {
      method: "GET",
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
    const params = new URLSearchParams({ category, excludeId });
    const result = await serverFetch<Product[]>(`/api/products/related?${params}`, {
      method: "GET",
    });
    return { status: result.status, data: result.data, errors: result.errors };
  } catch (error) {
    return {
      status: false,
      errors: { message: error instanceof Error ? error.message : "Failed to load related products" },
    };
  }
}
