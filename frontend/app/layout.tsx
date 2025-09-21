import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "JobFair MVC",
  description: "Frontend Next.js + shadcn/ui",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="th">
      <body className="min-h-screen bg-neutral-50 text-neutral-900 antialiased">
        <div className="mx-auto max-w-6xl px-4 py-6">{children}</div>
      </body>
    </html>
  );
}
