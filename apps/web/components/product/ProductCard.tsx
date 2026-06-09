"use client";

import type { Product } from "@org/lib";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";

export default function ProductCard({ product }: { product: Product }) {
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : null;

  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex flex-col rounded-2xl overflow-hidden bg-card ring-1 ring-foreground/10 transition-all duration-200 text-foreground no-underline hover:shadow-lg hover:ring-primary/40"
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <ViewTransition
          name={`product-img-${product.id}`}
          share="morph"
          default="none"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </ViewTransition>
        {product.badge && (
          <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full z-10 uppercase tracking-wide">
            {product.badge}
          </span>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-sm font-semibold">
            Out of Stock
          </div>
        )}
        {discount && (
          <span className="absolute top-2 right-2 bg-destructive text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
            -{discount}%
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1 p-3 flex-1">
        <p className="text-[11px] uppercase tracking-widest text-muted-foreground font-medium">
          {product.category}
        </p>
        <h3 className="text-sm font-semibold text-foreground leading-snug line-clamp-2 font-heading">
          {product.name}
        </h3>

        <div className="flex items-center gap-1 mt-0.5">
          <Star size={13} className="fill-amber-400 text-amber-400" />
          <span className="text-xs font-semibold text-foreground">
            {product.rating}
          </span>
          <span className="text-xs text-muted-foreground">
            ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        <div className="flex items-baseline gap-2 mt-auto pt-2">
          <span className="text-base font-bold text-primary">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
