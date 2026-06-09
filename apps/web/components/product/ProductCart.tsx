import { ShoppingCart } from "lucide-react";

export default function ProductCart() {
  return (
    <button
      className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-muted transition-colors text-foreground cursor-pointer"
      aria-label="Cart"
    >
      <ShoppingCart size={20} />
      <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
        0
      </span>
    </button>
  );
}
