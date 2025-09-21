"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiGet } from "@/lib/api";

import { Table, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import AppShell from "../components/AppShell";

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
        <TableHead>
          <tr>
            <th className="px-3 py-2 text-left">ตำแหน่ง</th>
            <th className="px-3 py-2 text-left">รายละเอียด</th>
            <th className="px-3 py-2">วันปิดรับ</th>
            <th className="px-3 py-2">สถานะ</th>
            <th></th>
          </tr>
        </TableHead>
        <tbody>
          {jobs.map(job => (
            <TableRow key={job.job_id}>
              <TableCell>{job.title}</TableCell>
              <TableCell>{job.description}</TableCell>
              <TableCell>{new Date(job.deadline).toLocaleDateString("th-TH")}</TableCell>
              <TableCell>
                <Badge>{job.status}</Badge>
              </TableCell>
              <TableCell>
                <Link href={`/jobs/${job.job_id}`} className="underline">รายละเอียด</Link>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </AppShell>
  );
}
