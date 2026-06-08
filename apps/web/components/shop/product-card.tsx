import type { Product } from "@org/lib";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";

export function ProductCard({ product }: { product: Product }) {
  const discount =
    product.originalPrice
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <Link
      href={`/products/${product.id}`}
      className="product-card"
    >
      <div className="product-card-img-wrap">
        <ViewTransition name={`product-img-${product.id}`} share="morph" default="none">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
            className="product-card-img"
          />
        </ViewTransition>
        {product.badge && (
          <span className="product-card-badge">{product.badge}</span>
        )}
        {!product.inStock && (
          <div className="product-card-oos">Out of Stock</div>
        )}
        {discount && (
          <span className="product-card-discount">-{discount}%</span>
        )}
      </div>

      <div className="product-card-body">
        <p className="product-card-category">{product.category}</p>
        <h3 className="product-card-name">{product.name}</h3>

        <div className="product-card-rating">
          <Star size={13} className="product-card-star" />
          <span className="product-card-rating-val">{product.rating}</span>
          <span className="product-card-review-count">
            ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        <div className="product-card-price-row">
          <span className="product-card-price">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="product-card-original-price">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
