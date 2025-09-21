"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { loadSession } from "@/lib/auth";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const s = loadSession();
    if (s.role === "admin") router.replace("/admin/candidates");
    else if (s.role === "candidate") router.replace("/jobs");
    else router.replace("/login");
  }, [router]);
  return null;
}
