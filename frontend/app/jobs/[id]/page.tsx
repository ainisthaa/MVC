"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiGet } from "@/lib/api";

import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import AppShell from "@/app/components/AppShell";

type Job = {
  job_id: string;
  title: string;
  description: string;
  deadline: string;
  status: string;
};

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    apiGet<Job[]>("/jobs").then(setJobs).catch(console.error);
  }, []);

  return (
    <AppShell title="ตำแหน่งงานที่เปิด">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ตำแหน่ง</TableHead>
            <TableHead>รายละเอียด</TableHead>
            <TableHead>วันปิดรับ</TableHead>
            <TableHead>สถานะ</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map(job => (
            <TableRow key={job.job_id}>
              <TableCell>{job.title}</TableCell>
              <TableCell>{job.description}</TableCell>
              <TableCell>{new Date(job.deadline).toLocaleDateString("th-TH")}</TableCell>
              <TableCell><Badge>{job.status}</Badge></TableCell>
              <TableCell>
                <Link href={`/jobs/${job.job_id}`} className="underline">รายละเอียด</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </AppShell>
  );
}
