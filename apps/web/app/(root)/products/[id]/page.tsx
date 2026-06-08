import { PRODUCTS } from "@/constants/products";
import { ArrowLeft, ShieldCheck, Star, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) notFound();

  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id,
  ).slice(0, 4);

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : null;

  return (
    <div className="detail-root">
      <div className="detail-back-wrap">
        <Link href="/" className="detail-back-link">
          <ArrowLeft size={16} />
          Back to shop
        </Link>
      </div>

      <div className="detail-hero">
        <div className="detail-img-wrap">
          <ViewTransition name={`product-img-${product.id}`} share="morph" default="none">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width:768px) 100vw, 50vw"
              className="detail-img"
              priority
            />
          </ViewTransition>
          {product.badge && (
            <span className="product-card-badge">{product.badge}</span>
          )}
        </div>

        <div className="detail-info">
          <p className="detail-category">{product.category}</p>
          <h1 className="detail-title">{product.name}</h1>

          <div className="detail-rating">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={16}
                className={
                  i < Math.floor(product.rating)
                    ? "detail-star--filled"
                    : "detail-star--empty"
                }
              />
            ))}
            <span className="detail-rating-val">{product.rating}</span>
            <span className="detail-review-count">
              ({product.reviewCount.toLocaleString()} reviews)
            </span>
          </div>

          <div className="detail-price-row">
            <span className="detail-price">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <>
                <span className="detail-original-price">
                  ${product.originalPrice.toFixed(2)}
                </span>
                <span className="detail-discount-badge">-{discount}%</span>
              </>
            )}
          </div>

          <p className="detail-description">{product.description}</p>

          <div className="detail-perks">
            <div className="detail-perk">
              <Truck size={18} />
              <span>Free shipping on orders over $75</span>
            </div>
            <div className="detail-perk">
              <ShieldCheck size={18} />
              <span>30-day hassle-free returns</span>
            </div>
          </div>

          <div className="detail-actions">
            {product.inStock ? (
              <>
                <button className="detail-add-btn">Add to Cart</button>
                <button className="detail-buy-btn">Buy Now</button>
              </>
            ) : (
              <p className="detail-oos-msg">Currently out of stock</p>
            )}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="detail-related">
          <h2 className="detail-related-title">More in {product.category}</h2>
          <div className="detail-related-grid">
            {related.map((p) => (
              <Link
                key={p.id}
                href={`/products/${p.id}`}
                className="detail-related-card"
              >
                <div className="detail-related-img-wrap">
                  <ViewTransition name={`product-img-${p.id}`} share="morph" default="none">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(max-width:640px) 50vw, 20vw"
                      className="detail-img"
                    />
                  </ViewTransition>
                </div>
                <p className="detail-related-name">{p.name}</p>
                <p className="detail-related-price">${p.price.toFixed(2)}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
