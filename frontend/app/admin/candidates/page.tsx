"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiGet } from "@/lib/api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Candidate {
  candidate_id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const router = useRouter();

  useEffect(() => {
    apiGet<Candidate[]>("/candidates").then(setCandidates).catch(console.error);
  }, []);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">ผู้สมัครทั้งหมด</h1>
      {candidates.map((c) => (
        <Card
          key={c.candidate_id}
          className="cursor-pointer"
          onClick={() => router.push(`/admin/candidates/${c.candidate_id}`)}
        >
          <CardHeader>
            <CardTitle>{c.first_name} {c.last_name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{c.email}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
