import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen w-full">{children}</div>;
}
