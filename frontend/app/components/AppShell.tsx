"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { clearSession, loadSession } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export default function AppShell({ title, children }: { title: string; children: React.ReactNode }) {
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    setRole(loadSession().role);
  }, []);

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between border-b border-neutral-200 pb-4">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <nav className="flex items-center gap-3">
          {role === "admin" ? (
            <>
              <Link href="/admin/candidates" className="text-sm underline">ผู้สมัคร</Link>
              <Link href="/jobs" className="text-sm underline">ตำแหน่งงาน</Link>
            </>
          ) : (
            <Link href="/jobs" className="text-sm underline">ตำแหน่งงาน</Link>
          )}
          <Button
            variant="outline"
            onClick={() => {
              clearSession();
              window.location.href = "/login";
            }}
          >
            ออกจากระบบ
          </Button>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
