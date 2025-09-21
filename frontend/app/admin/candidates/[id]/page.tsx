"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiGet } from "@/lib/api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Candidate {
  candidate_id: string;
  first_name: string;
  last_name: string;
  email: string;
}

interface Application {
  job_id: string;
  candidate_id: string;
  applied_at: string;
}

export default function CandidateDetailPage() {
  const params = useParams();
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    if (params?.id) {
      apiGet<{ candidate: Candidate; applications: Application[] }>(`/candidates/${params.id}`)
        .then((res) => {
          setCandidate(res.candidate);
          setApplications(res.applications);
        })
        .catch(console.error);
    }
  }, [params]);

  if (!candidate) return <p className="p-6">กำลังโหลด...</p>;

  return (
    <div className="p-6 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>{candidate.first_name} {candidate.last_name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Email: {candidate.email}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>ประวัติการสมัครงาน</CardTitle>
        </CardHeader>
        <CardContent>
          {applications.map((a) => (
            <p key={a.job_id}>
              {a.job_id} - {new Date(a.applied_at).toLocaleDateString()}
            </p>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
