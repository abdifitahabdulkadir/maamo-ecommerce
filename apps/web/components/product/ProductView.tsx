"use client";

import { ProductGridSkeleton } from "@/components/shared/loaders";
import { GetAllProducts } from "@/lib/actions/prodcut.action";
import { cn, updateQueryParams } from "@/lib/utils";
import { useDebouncedValue } from "@tanstack/react-pacer";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
} from "lucide-react";
import { Route } from "next";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Categories from "./Categories";
import ProductCard from "./ProductCard";

function normalizeTerm(term: string) {
  return term.trim().toLowerCase().replace(/\s+/g, " ");
}

export function ProductView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? "";
  const term = searchParams.get("q") ?? "";

  const currentPage = Math.max(1, Number(searchParams.get("page")) || 1);

  const [searchTerm, setSearchTerm] = useState(term);
  const [debouncedTerm] = useDebouncedValue(searchTerm, { wait: 1500 });

  const normalizedTerm = normalizeTerm(debouncedTerm);

  const { data, isLoading, isError, isPlaceholderData } = useQuery({
    queryKey: ["products", currentPage, category, normalizedTerm],
    queryFn: () =>
      GetAllProducts({ page: currentPage, search: normalizedTerm, category }),
    placeholderData: keepPreviousData,
    staleTime: normalizedTerm ? 0 : 5 * 60 * 1000, // 5 minutes,
    gcTime: normalizedTerm ? 0 : undefined,
  });

  // Sync the debounced term into the URL (?q=) and reset to page 1
  useEffect(() => {
    if (debouncedTerm === term) return;
    const newUrl = updateQueryParams({ q: debouncedTerm, page: "" }) as Route;
    router.push(newUrl, { scroll: false });
  }, [debouncedTerm, term, router]);

  const products = data?.data?.products;
  const totalPages = data?.data?.totalPages ?? 0;
  const failed = isError || data?.status === false;

  function goToPage(page: number) {
    const target = Math.min(Math.max(page, 1), totalPages || 1);
    const newUrl = updateQueryParams({
      page: target > 1 ? String(target) : "",
    }) as Route;
    router.push(newUrl, {
      scroll: false,
    });
  }

  return (
    <div className="min-h-screen px-4 flex flex-col bg-background">
      <div className="w-full isolate sticky top-(--header-height) z-40 bg-background grid grid-cols-1 md:gap-5 place-items-center h-fit md:grid-cols-[1fr_3fr] xl:grid-cols-[2fr_1fr]">
        <Categories disabled={isLoading} />
        <div className="h-fit py-4 isolate w-full relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            size={18}
          />
          <Input
            disabled={isLoading}
            className="pl-10 h-10 rounded-full border-border bg-muted/40 focus:bg-white w-full"
            placeholder="Search products…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        <p className="text-foreground/10 italic font-medium py-3">
          Search Results: {products?.length}
        </p>
        {isLoading ? (
          <ProductGridSkeleton count={20} />
        ) : failed ? (
          <div className="flex items-center justify-center py-32 text-muted-foreground">
            <p>Failed to load products. Please try again.</p>
          </div>
        ) : !products?.length ? (
          <div className="flex items-center justify-center py-32 text-muted-foreground">
            <p>No products found.</p>
          </div>
        ) : (
          <div
            className={cn(
              "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 transition-opacity",
              isPlaceholderData && "opacity-60",
            )}
          >
            {products.map((product) => (
              <ProductCard key={product?.id} product={product!} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <Button
              title="navigate to first page"
              variant="outline"
              size="icon"
              disabled={currentPage === 1}
              onClick={() => goToPage(1)}
              aria-label="First page"
            >
              <ChevronsLeft size={16} />
            </Button>

            <Button
              variant="outline"
              size="icon"
              disabled={currentPage === 1}
              title="back to previous page"
              onClick={() => goToPage(currentPage - 1)}
              aria-label="Previous page"
            >
              <ChevronLeft size={16} />
            </Button>

            {/* Page input — commits on Enter */}
            <div className="flex items-center gap-2">
              <Input
                type="number"
                min={1}
                max={totalPages}
                key={currentPage}
                defaultValue={currentPage}
                onKeyDown={(e) => {
                  if (e.key !== "Enter") return;
                  const valueInNumber = Number.parseInt(e.currentTarget.value);
                  if (!Number.isNaN(valueInNumber)) goToPage(valueInNumber);
                }}
                className="w-16 h-9 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                aria-label="Current page"
              />
            </div>

            {/* Next page */}
            <Button
              title="navigate to next page"
              variant="outline"
              size="icon"
              disabled={currentPage >= totalPages}
              onClick={() => goToPage(currentPage + 1)}
              aria-label="Next page"
            >
              <ChevronRight size={16} />
            </Button>
            {/* Last page */}
            <Button
              title="Navigate to last Page"
              variant="outline"
              size="icon"
              disabled={currentPage >= totalPages}
              onClick={() => goToPage(totalPages)}
              aria-label="Last page"
            >
              <ChevronsRight size={16} />
            </Button>
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              {currentPage} of {totalPages.toLocaleString()} pages
            </span>
          </div>
        )}
      </main>
    </div>
  );
}
