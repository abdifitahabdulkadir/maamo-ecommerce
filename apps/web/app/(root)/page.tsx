import { ProductView } from "@/components/product/ProductView";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense>
      <ProductView />
    </Suspense>
  );
}
