"use client";

import { ProductGridSkeleton } from "@/components/shared/loaders";
import { GetAllProducts } from "@/lib/actions/prodcut.action";
import { useDebouncedValue } from "@tanstack/react-pacer";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Input } from "../ui/input";
import Categories from "./Categories";
import ProductCard from "./ProductCard";

export function ProductView() {
  const searchParams = useSearchParams();
  const search = searchParams.get("category") ?? "";
  const [searchTerm, setSearchTerm] = useState(search);
  const [debouncedTerm] = useDebouncedValue(searchTerm, {
    wait: 1500,
  });

  const { isLoading, data, isError } = useQuery({
    queryKey: ["products"],
    queryFn: GetAllProducts,
  });

  const products = data?.data ?? [];

  return (
    <div className="min-h-screen px-4 flex flex-col bg-background">
      <div className="w-full grid grid-cols-1 md:gap-5 place-items-center h-fit md:grid-cols-[1fr_3fr] xl:grid-cols-[2fr_1fr]">
        <Categories />
        <div className="h-fit py-4 isolate w-full relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            size={18}
          />
          <Input
            className="pl-10 h-10 rounded-full border-border bg-muted/40 focus:bg-white w-full"
            placeholder="Search products…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        {/*{!isLoading && (
           <div className="flex items-center justify-between mb-6">
             <span className="text-sm text-muted-foreground">
               {filtered.length} product{filtered.length !== 1 ? "s" : ""}
             </span>
             {(search || activeCategory !== "All") && (
               <button
                 className="text-sm text-primary hover:underline cursor-pointer"
                 onClick={() => {}}
               >
                 Clear filters
               </button>
             )}
           </div>
        )}*/}

        {isLoading ? (
          <ProductGridSkeleton count={products.length} />
        ) : isError || !data?.status ? (
          <div className="flex items-center justify-center py-32 text-muted-foreground">
            <p>Failed to load products. Please try again.</p>
          </div>
        ) : 0 === 0 ? (
          <div className="flex items-center justify-center py-32 text-muted-foreground">
            <p>No products found. Try a different search or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
