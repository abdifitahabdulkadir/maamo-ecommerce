import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function updateQueryParams(params: Record<string, string>) {
  const searchPrams = new URLSearchParams(params);

  return `${window.location.pathname}?${searchPrams.toString()}`


}
