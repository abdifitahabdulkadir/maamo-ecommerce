import { PRODUCT_CATEGORIES } from "@/constants/products";
import { updateQueryParams } from "@/lib/utils";
import { ProductCategory } from "@org/lib";
import { useRouter, useSearchParams } from "next/navigation";

export default function Categories() {
  const searchParams = useSearchParams();
  const activeCategory = (searchParams.get("category") ?? "All") as
    | "All"
    | ProductCategory;

  const router = useRouter();

  function handleCategory(category: string) {
    const newUrl = updateQueryParams({
      category,
    });
    router.push(newUrl, {
      scroll: false,
    });
  }

  return (
    <nav className="flex flex-1   items-center gap-1 overflow-x-auto  w-full scrollbar-none [&::-webkit-scrollbar]:hidden">
      {PRODUCT_CATEGORIES.map((cat, index) => (
        <button
          key={index}
          onClick={() => handleCategory(cat)}
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
  );
}
