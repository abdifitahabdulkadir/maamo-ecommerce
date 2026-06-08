import Providers from "@/components/Providers";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full">
      <Providers>{children}</Providers>
    </div>
  );
}
