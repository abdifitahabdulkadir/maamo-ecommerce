"use client";

import { ProductGridSkeleton } from "@/components/shared/loaders";
import { GetAllProducts } from "@/lib/actions/prodcut.action";
import { useDebouncedValue } from "@tanstack/react-pacer";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Categories from "./Categories";
import ProductCard from "./ProductCard";

export function ProductView() {
  const searchParams = useSearchParams();
  const search = searchParams.get("category") ?? "";
  const [searchTerm, setSearchTerm] = useState(search);
  const [debouncedTerm] = useDebouncedValue(searchTerm, { wait: 1500 });
  const [currentPage, setCurrent] = useState(1);

  const {
    isLoading,
    data,
    fetchNextPage,
    fetchPreviousPage,
    isError,
    hasNextPage,
    hasPreviousPage,
    isFetchingPreviousPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["products", currentPage],

    queryFn: ({ pageParam }) => GetAllProducts({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.data?.hasNextPage ? lastPage.data.page + 1 : undefined,
    getPreviousPageParam: (firstPage) =>
      firstPage.data?.page && firstPage.data.page > 1
        ? firstPage.data.page - 1
        : undefined,
  });

  const products = data?.pages.at(currentPage - 1)?.data?.products;

  const totalPages = data?.pages[0]?.data?.totalPages ?? 0;
  const isPageLoading =
    isLoading || isFetchingNextPage || isFetchingPreviousPage;

  console.log(hasPreviousPage, currentPage, totalPages);
  return (
    <div className="min-h-screen px-4 flex flex-col bg-background">
      <div className="w-full grid grid-cols-1 md:gap-5 place-items-center h-fit md:grid-cols-[1fr_3fr] xl:grid-cols-[2fr_1fr]">
        <Categories disabled={isPageLoading} />
        <div className="h-fit py-4 isolate w-full relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            size={18}
          />
          <Input
            disabled={isPageLoading}
            className="pl-10 h-10 rounded-full border-border bg-muted/40 focus:bg-white w-full"
            placeholder="Search products…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        {isPageLoading ? (
          <ProductGridSkeleton count={20} />
        ) : isError || !products?.length ? (
          <div className="flex items-center justify-center py-32 text-muted-foreground">
            <p>Failed to load products. Please try again.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
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
              aria-label="First page"
            >
              <ChevronsLeft size={16} />
            </Button>

            <Button
              variant="outline"
              size="icon"
              disabled={currentPage === 1 || isPageLoading}
              title="back to previous page"
              onClick={() => {
                setCurrent((prev) => prev - 1);
                fetchPreviousPage();
              }}
              aria-label="Previous page"
            >
              <ChevronLeft size={16} />
            </Button>

            {/* Page input */}
            <div className="flex items-center gap-2">
              <Input
                type="number"
                min={1}
                max={totalPages}
                // value={currentPage}
                onChange={(e) => {
                  const valueInNumber = Number.parseInt(e.target.value);
                  if (!isNaN(valueInNumber)) {
                    setCurrent(valueInNumber);
                  }
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
              disabled={currentPage === totalPages || isPageLoading}
              onClick={() => {
                fetchNextPage();
                setCurrent((prev) => prev + 1);
              }}
              aria-label="Next page"
            >
              <ChevronRight size={16} />
            </Button>

            {/* Last page */}
            <Button
              title="Navigate to last Page"
              variant="outline"
              size="icon"
              disabled={!hasNextPage || isPageLoading}
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
