"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiGet } from "@/lib/api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Job {
  job_id: string;
  title: string;
  description: string;
  deadline: string;
  status: string;
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const router = useRouter();

  useEffect(() => {
    apiGet<Job[]>("/jobs").then(setJobs).catch(console.error);
  }, []);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">ตำแหน่งงานที่เปิดรับ</h1>
      
      {jobs.map((job,i) => (

        <Card
          key={i}
          className="border border-gray-300 cursor-pointer"
          onClick={() => router.push(`/jobs/${job.JobID}`)}
        >
          <CardHeader>
            <CardTitle>{job.Title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{job.Description}</p>
            <p className="text-sm text-gray-500">
              วันปิดรับ: {new Date(job.Deadline).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
