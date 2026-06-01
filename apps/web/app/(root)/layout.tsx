import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-full">
      <h2>Hello world for children root</h2>
      {children}
    </div>
  );
}
