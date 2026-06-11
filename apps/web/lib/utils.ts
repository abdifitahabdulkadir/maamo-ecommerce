import { clsx, type ClassValue } from "clsx";
import type { Route } from "next";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function updateQueryParams(params: Record<string, string>): Route {
  const searchParams = new URLSearchParams(window.location.search);
  for (const [key, value] of Object.entries(params)) {
    if (value) searchParams.set(key, value);
    else searchParams.delete(key);
  }
  const query = searchParams.toString();
  return (
    query ? `${window.location.pathname}?${query}` : window.location.pathname
  ) as Route;
}



export function buildPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | "...")[] = [1];
  if (current > 3) pages.push("...");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);

  if (current < total - 2) pages.push("...");
  pages.push(total);

  return pages;
}
