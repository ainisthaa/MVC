"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiGet } from "@/lib/api";

import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
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
        <TableHeader>
          <TableRow>
            <TableHead>ชื่อ</TableHead>
            <TableHead>นามสกุล</TableHead>
            <TableHead>อีเมล</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
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
        </TableBody>
      </Table>
    </AppShell>
  );
}
