"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiGet, apiPost } from "@/lib/api";
import { loadSession } from "@/lib/auth";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Job = {
  job_id: string;
  title: string;
  description: string;
  deadline: string;
  status: string;
};

export default function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    apiGet<Job>(`/jobs/${id}`).then(setJob).catch(() => setError("ไม่พบงานนี้"));
  }, [id]);

  const handleApply = async () => {
    const s = loadSession();
    if (!s.user) {
      setError("กรุณาเข้าสู่ระบบก่อน");
      return;
    }
    try {
      await apiPost("/apply", { job_id: id, candidate_id: s.user.user_id });
      alert("สมัครงานสำเร็จ!");
      router.push("/jobs");
    } catch (e: any) {
      setError("ไม่สามารถสมัครงานได้");
    }
  };

  if (!job) return <div className="p-4">{error || "กำลังโหลด..."}</div>;

  return (
    <AppShell title={`ตำแหน่ง: ${job.title}`}>
      <Card className="space-y-3">
        <h2 className="text-xl font-semibold">{job.title}</h2>
        <p>{job.description}</p>
        <p>วันปิดรับ: {new Date(job.deadline).toLocaleDateString("th-TH")}</p>
        <Badge>{job.status}</Badge>
        {job.status === "open" && (
          <Button onClick={handleApply}>สมัครงาน</Button>
        )}
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </Card>
    </AppShell>
  );
}
