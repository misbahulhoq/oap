import React from "react";
import { Card } from "@/components/ui/card";

interface TextQuestionDisplayProps {
  questionNumber: number;
  typeTag: string; // e.g., "Text"
  pointTag: string; // e.g., "5 pt"
  questionTitle: string;
  description: string;
  onEdit?: () => void;
  onRemove?: () => void;
}

export default function TextQuestionDisplay({
  questionNumber,
  typeTag,
  pointTag,
  questionTitle,
  description,
  onRemove,
}: TextQuestionDisplayProps) {
  return (
    <Card className="mx-auto w-full max-w-5xl rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
      {/* Header Section */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800">
          Question {questionNumber}
        </h2>
        <div className="flex items-center gap-2">
          <div className="rounded-full border border-slate-200 bg-white px-4 py-1 text-xs font-medium text-slate-500">
            {typeTag}
          </div>
          <div className="rounded-full border border-slate-200 bg-white px-4 py-1 text-xs font-medium text-slate-500">
            {pointTag}
          </div>
        </div>
      </div>

      <hr className="mb-6 border-t border-slate-100" />

      {/* Question Content */}
      <div className="mb-8 space-y-4">
        <h3
          className="text-xl font-bold text-slate-900"
          dangerouslySetInnerHTML={{ __html: questionTitle }}
        >
          {/* {questionTitle} */}
        </h3>
        <div
          className="text-base leading-relaxed text-slate-500"
          dangerouslySetInnerHTML={{ __html: description }}
        >
          {/* {description} */}
        </div>
      </div>

      <hr className="mb-4 border-t border-slate-100" />

      {/* Footer Actions */}
      <div className="flex items-center justify-end">
        <button
          onClick={onRemove}
          className="text-sm font-semibold text-red-500 transition-colors hover:text-red-600"
        >
          Remove From Exam
        </button>
      </div>
    </Card>
  );
}
