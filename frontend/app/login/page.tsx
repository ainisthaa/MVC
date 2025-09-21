"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiPost } from "@/lib/api";
import { saveSession } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await apiPost<{ role: string; user: any }>("/login", { email, password });
      saveSession({ role: res.role as any, user: res.user });
      if (res.role === "admin") router.push("/admin/candidates");
      else router.push("/jobs");
    } catch {
      setError("เข้าสู่ระบบไม่สำเร็จ");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md space-y-4 p-6">
        <h2 className="text-xl font-semibold">เข้าสู่ระบบ</h2>
        <div>
          <Label htmlFor="email">อีเมล</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="password">รหัสผ่าน</Label>
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button className="w-full" onClick={handleLogin}>เข้าสู่ระบบ</Button>
      </Card>
    </div>
  );
}
