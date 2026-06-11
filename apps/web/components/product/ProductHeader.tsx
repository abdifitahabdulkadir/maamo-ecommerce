"use client";

import Link from "next/link";
import UserLogout from "../auth/UserLogout";
import UserProfile from "../auth/UserProfile";
import ProductCart from "./ProductCart";

export function ProductHeader() {
  return (
    <header
      className="sticky top-0 py-4 px-6 z-50 w-full bg-white  border-b flex itce justify-between border-border shadow-sm"
      style={{ viewTransitionName: "shop-header" } as React.CSSProperties}
    >
      <Link href="/" className="flex items-center gap-2 shrink-0 no-underline">
        <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary text-primary-foreground text-lg font-bold font-heading">
          M
        </span>
        <span className="text-xl font-bold font-heading text-foreground tracking-tight">
          maamo
        </span>
      </Link>

      <div className="flex items-center gap-2 shrink-0">
        <UserProfile />
        <ProductCart />
        <UserLogout />
      </div>
    </header>
  );
}
