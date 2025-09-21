"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiGet, apiPost } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Job {
  job_id: string;
  title: string;
  description: string;
  deadline: string;
  status: string;
}

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    if (params?.id) {
      apiGet<Job>(`/jobs/${params.id}`).then(setJob).catch(console.error);
    }
  }, [params]);

  const handleApply = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("session") || "{}").user;
      await apiPost("/apply", { job_id: job?.job_id, candidate_id: user?.user_id });
      alert("สมัครงานเรียบร้อยแล้ว");
      router.push("/jobs");
    } catch {
      alert("ไม่สามารถสมัครงานได้");
    }
  };

  if (!job) return <p className="p-6">กำลังโหลด...</p>;

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>{job.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{job.description}</p>
          <p className="text-sm text-gray-500">
            วันปิดรับ: {new Date(job.deadline).toLocaleDateString()}
          </p>
          <Button className="mt-4" onClick={handleApply}>สมัครงาน</Button>
        </CardContent>
      </Card>
    </div>
  );
}
