"use client";

import { GetAllProducts } from "@/lib/actions/prodcut.action";
import type { ProductCategory } from "@org/lib";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { ProductCard, ProductCardSkeleton } from "./ProductCard";
import { ProductHeader } from "./ProductHeader";

const SKELETON_COUNT = 8;

export function ProductView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const search = searchParams.get("q") ?? "";
  const activeCategory = (searchParams.get("category") ?? "All") as "All" | ProductCategory;
  function setSearch(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set("q", value); else params.delete("q");
    params.delete("scrollY");
    const qs = params.toString();
    window.history.replaceState(null, "", qs ? `${pathname}?${qs}` : pathname);
  }

  function setActiveCategory(cat: "All" | ProductCategory) {
    const params = new URLSearchParams(searchParams.toString());
    if (cat === "All") params.delete("category"); else params.set("category", cat);
    params.delete("scrollY");
    const qs = params.toString();
    window.history.replaceState(null, "", qs ? `${pathname}?${qs}` : pathname);
  }

  function clearFilters() {
    window.history.replaceState(null, "", pathname);
  }

  function handleBeforeNavigate() {
    const params = new URLSearchParams(searchParams.toString());
    params.set("scrollY", String(Math.round(window.scrollY)));
    window.history.replaceState(null, "", `${pathname}?${params.toString()}`);
  }

  const { isLoading, data, isError } = useQuery({
    queryKey: ["products"],
    queryFn: GetAllProducts,
  });

  const products = data?.data ?? [];

  const filtered = products.filter((p) => {
    const matchesCat = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch =
      search.trim() === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const scrollRestored = useRef(false);
  useEffect(() => {
    const savedY = searchParams.get("scrollY");
    if (!savedY || isLoading || scrollRestored.current) return;
    scrollRestored.current = true;
    window.scrollTo({ top: parseInt(savedY, 10), behavior: "instant" });
  }, [searchParams, isLoading]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ProductHeader
        search={search}
        onSearchChange={setSearch}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        {!isLoading && (
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-muted-foreground">
              {filtered.length} product{filtered.length !== 1 ? "s" : ""}
            </span>
            {(search || activeCategory !== "All") && (
              <button
                className="text-sm text-primary hover:underline cursor-pointer"
                onClick={clearFilters}
              >
                Clear filters
              </button>
            )}
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : isError || !data?.status ? (
          <div className="flex items-center justify-center py-32 text-muted-foreground">
            <p>Failed to load products. Please try again.</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex items-center justify-center py-32 text-muted-foreground">
            <p>No products found. Try a different search or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} onBeforeNavigate={handleBeforeNavigate} />

            ))}
          </div>
        )}
      </main>
    </div>
  );
}
