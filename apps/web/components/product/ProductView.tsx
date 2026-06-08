"use client";

import { PRODUCTS } from "@/constants/products";
import type { ProductCategory } from "@org/lib";
import { useState } from "react";
import { ProductCard } from "./ProductCard";
import { ProductHeader } from "./ProductHeader";

export function ProductView() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<"All" | ProductCategory>(
    "All",
  );

  const filtered = PRODUCTS.filter((p) => {
    const matchesCat =
      activeCategory === "All" || p.category === activeCategory;
    const matchesSearch =
      search.trim() === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ProductHeader
        search={search}
        onSearchChange={setSearch}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm text-muted-foreground">
            {filtered.length} product{filtered.length !== 1 ? "s" : ""}
          </span>
          {(search || activeCategory !== "All") && (
            <button
              className="text-sm text-primary hover:underline cursor-pointer"
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
            >
              Clear filters
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="flex items-center justify-center py-32 text-muted-foreground">
            <p>No products found. Try a different search or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
