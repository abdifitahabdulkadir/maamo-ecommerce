"use client";

import { PRODUCTS } from "@/constants/products";
import type { ProductCategory } from "@org/lib";
import { useState } from "react";
import { ProductCard } from "./product-card";
import { ShopHeader } from "./shop-header";

export function ShopView() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<
    "All" | ProductCategory
  >("All");

  const filtered = PRODUCTS.filter((p) => {
    const matchesCat = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch =
      search.trim() === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="shop-root">
      <ShopHeader
        search={search}
        onSearchChange={setSearch}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <main className="shop-main">
        <div className="shop-results-bar">
          <span className="shop-results-count">
            {filtered.length} product{filtered.length !== 1 ? "s" : ""}
          </span>
          {(search || activeCategory !== "All") && (
            <button
              className="shop-clear-btn"
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
          <div className="shop-empty">
            <p>No products found. Try a different search or category.</p>
          </div>
        ) : (
          <div className="shop-grid">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
