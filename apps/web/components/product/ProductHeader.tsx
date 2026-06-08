"use client";

import { Input } from "@/components/ui/input";
import { PRODUCT_CATEGORIES } from "@/constants/products";
import type { ProductCategory } from "@org/lib";
import { Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import UserProfile from "../auth/UserProfile";

type Props = {
  search: string;
  onSearchChange: (value: string) => void;
  activeCategory: "All" | ProductCategory;
  onCategoryChange: (cat: "All" | ProductCategory) => void;
};

export function ProductHeader({
  search,
  onSearchChange,
  activeCategory,
  onCategoryChange,
}: Props) {
  return (
    <header
      className="sticky top-0 z-50 bg-white border-b border-border shadow-sm"
      style={{ viewTransitionName: "shop-header" } as React.CSSProperties}
    >
      <div className="flex items-center gap-4 px-6 py-4 max-w-7xl mx-auto w-full">
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0 no-underline"
        >
          <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary text-primary-foreground text-lg font-bold font-heading">
            M
          </span>
          <span className="text-xl font-bold font-heading text-foreground tracking-tight">
            maamo
          </span>
        </Link>
        <div className="flex-1 relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            size={18}
          />
          <Input
            className="pl-10 h-10 rounded-full border-border bg-muted/40 focus:bg-white w-full"
            placeholder="Search products…"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <UserProfile />
          <button
            className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-muted transition-colors text-foreground cursor-pointer"
            aria-label="Cart"
          >
            <ShoppingCart size={20} />
            <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
              0
            </span>
          </button>
        </div>
      </div>

      <nav className="flex items-center gap-1 overflow-x-auto px-6 py-2 max-w-7xl mx-auto w-full scrollbar-none [&::-webkit-scrollbar]:hidden">
        {PRODUCT_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat as "All" | ProductCategory)}
            className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer border ${
              activeCategory === cat
                ? "bg-primary text-primary-foreground border-primary hover:bg-primary hover:text-primary-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            {cat}
          </button>
        ))}
      </nav>
    </header>
  );
}
