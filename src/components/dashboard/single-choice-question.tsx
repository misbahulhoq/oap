import React from "react";
import { Card } from "@/components/ui/card";
import { Check, Trash2 } from "lucide-react";

interface Option {
  id: string;
  label: string; // e.g., 'A', 'B'
  text: string;
  correct: boolean;
}

interface SingleChoiceQuestionDisplayProps {
  questionNumber: number;
  typeTag: string;
  pointTag: string;
  questionText: string;
  options: Option[];
  onEdit?: () => void;
  onRemove?: () => void;
}

const stripHtml = (html: string) => html.replace(/<\/?[^>]+(>|$)/g, "");

export const SingleChoiceQuestionDisplay: React.FC<
  SingleChoiceQuestionDisplayProps
> = ({
  questionNumber,
  typeTag,
  pointTag,
  questionText,
  options,

  onRemove,
}) => {
  return (
    <Card className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
      {/* Header Row */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-800">
          Question {questionNumber}
        </h2>
        <div className="flex items-center gap-2">
          <div className="rounded-full border border-slate-200 px-4 py-1 text-sm font-medium text-slate-500">
            {typeTag}
          </div>
          <div className="rounded-full border border-slate-200 px-4 py-1 text-sm font-medium text-slate-500">
            {pointTag}
          </div>
        </div>
      </div>

      <hr className="mb-6 border-b border-slate-100" />

      {/* Question Body */}
      <h3
        className="mb-6 text-2xl font-bold text-slate-900"
        dangerouslySetInnerHTML={{ __html: questionText }}
      >
        {/* {questionText} */}
      </h3>

      {/* Answer Options */}
      <div className="space-y-4">
        {options.map((option) => {
          console.log(
            JSON.stringify(option.label),
            JSON.stringify(option.text),
          );

          return (
            <div key={option.id}>
              {option.correct ? (
                // Highlighted Correct Option Container
                <div
                  className="flex flex-row items-center justify-between rounded-2xl bg-green-50 p-4 font-semibold text-green-900 transition-colors"
                  dangerouslySetInnerHTML={{
                    __html: `<span class="text-base">${option.label + "." + stripHtml(option.text)}</span> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-icon lucide-check"><path d="M20 6 9 17l-5-5"/></svg>`,
                  }}
                ></div>
              ) : (
                // Simple Incorrect Option Row
                <span
                  className="py-1 text-base text-slate-700"
                  dangerouslySetInnerHTML={{
                    __html: `<span>${option.label}. ${stripHtml(option.text)}</span>`,
                  }}
                >
                  {/* <span>
                  {option.label}. {option.text}
                </span> */}
                </span>
              )}
            </div>
          );
        })}
      </div>

      <hr className="mt-6 mb-4 border-b border-slate-100" />

      {/* Footer Actions */}
      <div className="flex items-center justify-end pt-1">
        <button
          onClick={onRemove}
          className="flex items-center gap-2 font-semibold text-red-500 transition-colors hover:text-red-600"
        >
          <Trash2 className="h-4 w-4" />
          Remove From Exam
        </button>
      </div>
    </Card>
  );
};

// Example usage to match the image_6.png
const questionData = {
  questionNumber: 1,
  typeTag: "MCQ",
  pointTag: "1 pt",
  questionText: "What is the Capital of Bangladesh?",
  options: [
    { id: "a1", label: "A", text: "Dhaka", correct: true },
    { id: "b2", label: "B", text: "Chattogram", correct: false },
    { id: "c3", label: "C", text: "Rajshahi", correct: false },
    { id: "d4", label: "D", text: "Barishal", correct: false },
  ],
};

const QuestionDisplayCard: React.FC = () => {
  return (
    <div className="flex min-h-screen items-start justify-center bg-slate-50 p-8">
      <div className="w-full max-w-5xl">
        <SingleChoiceQuestionDisplay
          {...questionData}
          onEdit={() => console.log("Edit clicked")}
          onRemove={() => console.log("Remove clicked")}
        />
      </div>
    </div>
  );
};

export default QuestionDisplayCard;
