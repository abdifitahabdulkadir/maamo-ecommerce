import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PRODUCT_CATEGORIES } from "@/constants/products";
import { updateQueryParams } from "@/lib/utils";
import { ProductCategory } from "@org/lib";
import { Route } from "next";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  disabled?: boolean;
}
export default function Categories({ disabled }: Props) {
  const searchParams = useSearchParams();
  const activeCategory = (searchParams.get("category") ?? "All") as
    | "All"
    | ProductCategory;

  const router = useRouter();

  function handleCategory(category: string) {
    const newUrl = updateQueryParams({
      category,
      page: "",
    }) as Route;
    router.push(newUrl, {
      scroll: false,
    });
  }

  return (
    <>
      <div className="flex xl:hidden w-full">
        <Select
          disabled={disabled}
          value={activeCategory}
          onValueChange={handleCategory}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {PRODUCT_CATEGORIES.map((cat, index) => (
              <SelectItem disabled={disabled} key={index} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <nav className="hidden xl:flex flex-1 items-center gap-1 overflow-x-auto w-full scrollbar-none [&::-webkit-scrollbar]:hidden">
        {PRODUCT_CATEGORIES.map((cat, index) => (
          <button
            disabled={disabled}
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
    </>
  );
}
