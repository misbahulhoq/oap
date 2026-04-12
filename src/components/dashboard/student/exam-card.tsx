import React from "react";
import { Clock, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExamInfo } from "@/stores/types";
import Link from "next/link";

export default function ExamInfoCard({
  title,
  duration,
  id,
  questionCount,
}: Partial<ExamInfo> & { id: string; questionCount: number }) {
  return (
    <Card className="w-full max-w-3xl rounded-2xl border-slate-200 bg-white p-6 shadow-sm">
      {/* Title */}
      <h2 className="mb-5 text-xl font-bold tracking-tight text-slate-700 md:text-2xl">
        {title}
      </h2>

      {/* Metadata Row */}
      <div className="mb-6 flex flex-wrap items-center gap-x-8 gap-y-4">
        {/* Duration */}
        <div className="flex items-center gap-2 text-slate-500">
          <Clock className="h-5 w-5 text-slate-400" />
          <span className="text-base">
            Duration:{" "}
            <span className="font-semibold text-slate-700">{duration}</span>
          </span>
        </div>

        {/* Questions */}
        <div className="flex items-center gap-2 text-slate-500">
          <FileText className="h-5 w-5 text-slate-400" />
          <span className="text-base">
            Question:{" "}
            <span className="font-semibold text-slate-700">
              {questionCount}
            </span>
          </span>
        </div>
      </div>

      {/* Action Button */}
      {questionCount > 0 && (
        <Button
          variant="outline"
          className="h-11 w-32 rounded-xl border-violet-500 text-base font-semibold text-violet-600 transition-colors hover:bg-violet-50 hover:text-violet-700"
          asChild
        >
          <Link href={`/dashboard/exam/${id}`}>Start</Link>
        </Button>
      )}
    </Card>
  );
}
