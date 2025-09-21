"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiGet } from "@/lib/api";

import { Card } from "@/components/ui/card";
import { Table, TableHead, TableRow, TableCell } from "@/components/ui/table";
import AppShell from "@/app/components/AppShell";

type Application = {
  job_id: string;
  candidate_id: string;
  applied_at: string;
};

type CandidateDetail = {
  candidate: {
    candidate_id: string;
    first_name: string;
    last_name: string;
    email: string;
  };
  applications: Application[];
};

export default function CandidateDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [detail, setDetail] = useState<CandidateDetail | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    apiGet<CandidateDetail>(`/candidates/${id}`)
      .then(setDetail)
      .catch(() => setError("ไม่พบข้อมูลผู้สมัคร"));
  }, [id]);

  if (!detail) return <div className="p-4">{error || "กำลังโหลด..."}</div>;

  return (
    <AppShell title="รายละเอียดผู้สมัคร">
      <Card className="space-y-2">
        <h2 className="text-lg font-semibold">
          {detail.candidate.first_name} {detail.candidate.last_name}
        </h2>
        <p>อีเมล: {detail.candidate.email}</p>
      </Card>

      <h3 className="mt-6 mb-2 text-lg font-semibold">ตำแหน่งที่สมัคร</h3>
      <Table>
        <TableHead>
          <tr>
            <th className="px-3 py-2 text-left">รหัสงาน</th>
            <th className="px-3 py-2 text-left">วันที่สมัคร</th>
          </tr>
        </TableHead>
        <tbody>
          {detail.applications.map(app => (
            <TableRow key={app.job_id}>
              <TableCell>{app.job_id}</TableCell>
              <TableCell>{new Date(app.applied_at).toLocaleDateString("th-TH")}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </AppShell>
  );
}
