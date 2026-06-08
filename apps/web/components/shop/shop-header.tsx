"use client";

import { Input } from "@/components/ui/input";
import { PRODUCT_CATEGORIES } from "@/constants/products";
import type { ProductCategory } from "@org/lib";
import { Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";

type Props = {
  search: string;
  onSearchChange: (value: string) => void;
  activeCategory: "All" | ProductCategory;
  onCategoryChange: (cat: "All" | ProductCategory) => void;
};

export function ShopHeader({
  search,
  onSearchChange,
  activeCategory,
  onCategoryChange,
}: Props) {
  return (
    <header
      className="shop-header"
      style={{ viewTransitionName: "shop-header" } as React.CSSProperties}
    >
      <div className="shop-header-top">
        <Link href="/" className="shop-logo">
          <span className="shop-logo-icon">M</span>
          <span className="shop-logo-text">maamo</span>
          <span className="shop-logo-sub">ecommerce</span>
        </Link>

        <div className="shop-search-wrap">
          <Search className="shop-search-icon" size={18} />
          <Input
            className="shop-search-input"
            placeholder="Search products…"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="shop-header-actions">
          <button className="shop-icon-btn" aria-label="Account">
            <User size={20} />
          </button>
          <button className="shop-icon-btn" aria-label="Cart">
            <ShoppingCart size={20} />
            <span className="shop-cart-badge">0</span>
          </button>
        </div>
      </div>

      <nav className="shop-categories">
        {PRODUCT_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat as "All" | ProductCategory)}
            className={`shop-cat-btn ${activeCategory === cat ? "shop-cat-btn--active" : ""}`}
          >
            {cat}
          </button>
        ))}
      </nav>
    </header>
  );
}
