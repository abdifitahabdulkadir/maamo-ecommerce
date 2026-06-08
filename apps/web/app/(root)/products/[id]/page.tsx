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
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors no-underline"
        >
          <ArrowLeft size={16} />
          Back to shop
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted ring-1 ring-foreground/10">
          <ViewTransition name={`product-img-${product.id}`} share="morph" default="none">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width:768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </ViewTransition>
          {product.badge && (
            <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full z-10 uppercase tracking-wide">
              {product.badge}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
            {product.category}
          </p>
          <h1 className="text-2xl md:text-3xl font-bold font-heading text-foreground leading-tight">
            {product.name}
          </h1>

          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={16}
                className={
                  i < Math.floor(product.rating)
                    ? "fill-amber-400 text-amber-400"
                    : "fill-muted text-muted-foreground"
                }
              />
            ))}
            <span className="text-sm font-semibold ml-1">{product.rating}</span>
            <span className="text-sm text-muted-foreground">
              ({product.reviewCount.toLocaleString()} reviews)
            </span>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-lg text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
                <span className="bg-destructive text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  -{discount}%
                </span>
              </>
            )}
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          <div className="flex flex-col gap-2 py-4 border-y border-border">
            <div className="flex items-center gap-2 text-sm text-foreground">
              <Truck size={18} className="text-primary shrink-0" />
              <span>Free shipping on orders over $75</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground">
              <ShieldCheck size={18} className="text-primary shrink-0" />
              <span>30-day hassle-free returns</span>
            </div>
          </div>

          <div className="flex gap-3 flex-wrap">
            {product.inStock ? (
              <>
                <button className="flex-1 min-w-[140px] h-12 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity cursor-pointer">
                  Add to Cart
                </button>
                <button className="flex-1 min-w-[140px] h-12 rounded-full border-2 border-primary text-primary font-semibold hover:bg-primary/10 transition-colors cursor-pointer">
                  Buy Now
                </button>
              </>
            ) : (
              <p className="text-muted-foreground text-sm font-medium">Currently out of stock</p>
            )}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="border-t border-border pt-10">
          <h2 className="text-xl font-bold font-heading mb-6">More in {product.category}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {related.map((p) => (
              <Link
                key={p.id}
                href={`/products/${p.id}`}
                className="group flex flex-col gap-2 text-foreground no-underline"
              >
                <div className="relative aspect-square rounded-xl overflow-hidden bg-muted ring-1 ring-foreground/10 transition-all group-hover:ring-primary/40">
                  <ViewTransition name={`product-img-${p.id}`} share="morph" default="none">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(max-width:640px) 50vw, 20vw"
                      className="object-cover"
                    />
                  </ViewTransition>
                </div>
                <p className="text-sm font-semibold leading-snug line-clamp-2 font-heading">
                  {p.name}
                </p>
                <p className="text-sm font-bold text-primary">${p.price.toFixed(2)}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
