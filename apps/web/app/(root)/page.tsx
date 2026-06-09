import { ProductHeader } from "@/components/product/ProductHeader";
import { ProductView } from "@/components/product/ProductView";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col gap-3">
      <ProductHeader />
      <Suspense>
        <ProductView />
      </Suspense>
    </div>
  );
}
