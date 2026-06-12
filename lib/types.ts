export type ActionResponse<T = null> = {
  data?: T;
  status: boolean;
  errors?: {
    message: string;
  };
};

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  gender: string;
  createdAt: string;
  updatedAt: string;
};

export enum AuthProviderID {
  credentail,
}

export type ProductCategory =
  | "Electronics"
  | "Clothing"
  | "Home & Kitchen"
  | "Sports"
  | "Beauty"
  | "Books"
  | "Furniture";

export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number | null;
  category: ProductCategory;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  badge?: string;
};

export type ProductsQuery = {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
};

export type PaginatedProducts = {
  products: Product[];
  page: number;
  totalPages: number;
  hasNextPage: boolean;
};

export type AuthCookieType = {
  token: string;
  expiresInMilliseconds: number;
};
