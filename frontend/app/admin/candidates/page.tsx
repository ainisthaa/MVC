"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiGet } from "@/lib/api";

import { Table, TableHead, TableRow, TableCell } from "@/components/ui/table";
import AppShell from "@/app/components/AppShell";

type Candidate = {
  candidate_id: string;
  first_name: string;
  last_name: string;
  email: string;
};

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    apiGet<Candidate[]>("/candidates").then(setCandidates).catch(console.error);
  }, []);

  return (
    <AppShell title="ผู้สมัครทั้งหมด">
      <Table>
        <TableHead>
          <tr>
            <th className="px-3 py-2 text-left">ชื่อ</th>
            <th className="px-3 py-2 text-left">นามสกุล</th>
            <th className="px-3 py-2 text-left">อีเมล</th>
            <th></th>
          </tr>
        </TableHead>
        <tbody>
          {candidates.map(c => (
            <TableRow key={c.candidate_id}>
              <TableCell>{c.first_name}</TableCell>
              <TableCell>{c.last_name}</TableCell>
              <TableCell>{c.email}</TableCell>
              <TableCell>
                <Link href={`/admin/candidates/${c.candidate_id}`} className="underline">ดูรายละเอียด</Link>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </AppShell>
  );
}
