import React from "react";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

interface Option {
  id: string;
  label: string; // e.g., 'A', 'B', 'C'
  text: string;
  isCorrect: boolean;
}

interface MultiChoiceQuestionDisplayProps {
  questionNumber: number;
  typeTag: string; // e.g., "Checkbox"
  pointTag: string; // e.g., "1 pt"
  questionText: string;
  options: Option[];
  onEdit?: () => void;
  onRemove?: () => void;
}

export default function MultiChoiceQuestionDisplay({
  questionNumber,
  typeTag,
  pointTag,
  questionText,
  options,
  onEdit,
  onRemove,
}: MultiChoiceQuestionDisplayProps) {
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

      {/* Question Text */}
      <h3
        className="mb-8 text-xl font-bold text-slate-900"
        dangerouslySetInnerHTML={{
          __html: questionText,
        }}
      ></h3>

      {/* Options List */}
      <div className="mb-8 space-y-4">
        {options.map((option) => (
          <div key={option.id}>
            {option.isCorrect ? (
              /* Correct Option Highlighted State */
              <div className="flex items-center justify-between rounded-xl border border-transparent bg-green-50 p-4 font-medium text-slate-700">
                <span className="text-base">
                  {option.label}. {option.text}
                </span>
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white">
                  <Check className="h-4 w-4 stroke-[3px]" />
                </div>
              </div>
            ) : (
              /* Normal Option State */
              <div className="px-4 py-2 text-base text-slate-600">
                {option.label}. {option.text}
              </div>
            )}
          </div>
        ))}
      </div>

      <hr className="mb-4 border-t border-slate-100" />

      {/* Footer Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={onEdit}
          className="text-sm font-semibold text-violet-600 transition-colors hover:text-violet-700"
        >
          Edit
        </button>
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
