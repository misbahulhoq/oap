/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Question } from "@/stores/types";

interface ExamData {
  _id: string;
  title: string;
  candidates: string;
  slots: string;
  questionSet: string;
  questionType: string;
  duration: string;
  startTime?: Date | undefined;
  endTime?: Date | undefined;
  questions: (Question & { _id: string })[];
}

interface ExamInterfaceProps {
  examData: ExamData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmitExam?: (answers: Record<string, any>) => void;
}

export default function ExamInterface({
  examData,
  onSubmitExam,
}: ExamInterfaceProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(parseInt(examData.duration) * 60); // Convert minutes to seconds

  // State to store student's answers. Key is question _id, value is selected option _id(s) or text
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});

  const currentQuestion = examData.questions[currentIndex];
  const isLastQuestion = currentIndex === examData.questions.length - 1;

  const handleCompleteExam = useCallback(() => {
    console.log("Exam Completed. Final Answers:", answers);
    if (onSubmitExam) onSubmitExam(answers);
  }, [answers, onSubmitExam]);

  // Timer Effect
  useEffect(() => {
    if (timeLeft <= 0) {
      handleCompleteExam();
      return;
    }
    const timerId = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timerId);
  }, [timeLeft, handleCompleteExam]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // --- Answer Handlers ---
  const handleRadioSelect = (optionId: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion._id]: optionId }));
  };

  const handleCheckboxSelect = (optionId: string) => {
    setAnswers((prev) => {
      const currentSelected = (prev[currentQuestion._id] as string[]) || [];
      if (currentSelected.includes(optionId)) {
        return {
          ...prev,
          [currentQuestion._id]: currentSelected.filter(
            (id) => id !== optionId,
          ),
        };
      } else {
        return {
          ...prev,
          [currentQuestion._id]: [...currentSelected, optionId],
        };
      }
    });
  };

  const handleTextChange = (text: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion._id]: text }));
  };

  // --- Navigation Handlers ---
  const handleNext = () => {
    if (isLastQuestion) {
      handleCompleteExam();
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 p-4 md:p-8">
      {/* Top Header Card */}
      <Card className="flex items-center justify-between rounded-2xl border-slate-200 bg-white p-4 shadow-sm md:p-5">
        <h2 className="text-lg font-medium text-slate-800">
          Question ({currentIndex + 1}/{examData.questions.length})
        </h2>
        <div className="rounded-xl bg-slate-100 px-5 py-2.5 text-sm font-semibold tracking-wide text-slate-700 md:text-base">
          {formatTime(timeLeft)} left
        </div>
      </Card>

      {/* Main Question Card */}
      <Card className="flex min-h-[400px] flex-col rounded-2xl border-slate-200 bg-white p-6 shadow-sm md:p-8">
        {/* Question Text */}
        <h3 className="mb-6 text-xl leading-relaxed font-semibold text-slate-800">
          Q{currentIndex + 1}. {currentQuestion.question}
        </h3>

        {/* Dynamic Options Rendering */}
        <div className="mb-10 flex-1 space-y-4">
          {/* RADIO BUTTONS (Single Choice) */}
          {currentQuestion.type === "radio" &&
            currentQuestion.options?.map((option) => {
              //@ts-ignore
              const isSelected = answers[currentQuestion._id] === option._id;
              return (
                <div
                  //@ts-ignore
                  key={option._id}
                  //@ts-ignore
                  onClick={() => handleRadioSelect(option._id)}
                  className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-all duration-200 ${
                    isSelected
                      ? "border-violet-600 bg-violet-50/40"
                      : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
                  }`}
                >
                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${
                      isSelected
                        ? "border-violet-600 bg-white"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {isSelected && (
                      <div className="h-2.5 w-2.5 rounded-full bg-violet-600" />
                    )}
                  </div>
                  <span
                    className={`text-base ${isSelected ? "font-medium text-violet-900" : "text-slate-600"}`}
                  >
                    {option.option}
                  </span>
                </div>
              );
            })}

          {/* CHECKBOXES (Multiple Choice) */}
          {currentQuestion.type === "checkbox" &&
            currentQuestion.options?.map((option) => {
              const isSelected = (answers[currentQuestion._id] as string[])
                //@ts-ignore
                ?.includes(option._id);
              return (
                <div
                  //@ts-ignore
                  key={option._id}
                  //@ts-ignore
                  onClick={() => handleCheckboxSelect(option._id)}
                  className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-all duration-200 ${
                    isSelected
                      ? "border-violet-600 bg-violet-50/40"
                      : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
                  }`}
                >
                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded-[4px] border transition-colors ${
                      isSelected
                        ? "border-violet-600 bg-violet-600"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {isSelected && (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 3L4.5 8.5L2 6"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                  <span
                    className={`text-base ${isSelected ? "font-medium text-violet-900" : "text-slate-600"}`}
                  >
                    {option.option}
                  </span>
                </div>
              );
            })}

          {/* TEXT / ESSAY (Written Answer) */}
          {(currentQuestion.type === "text" ||
            //@ts-ignore
            currentQuestion.type === "essay") && (
            <Textarea
              placeholder="Type your answer here..."
              value={(answers[currentQuestion._id] as string) || ""}
              onChange={(e) => handleTextChange(e.target.value)}
              className="min-h-[200px] resize-y border-slate-200 p-4 text-base focus-visible:ring-violet-600"
            />
          )}
        </div>

        {/* Footer Actions */}
        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
          <Button
            variant="outline"
            onClick={handleNext}
            className="h-11 rounded-xl border-slate-200 px-6 font-semibold text-slate-700 hover:bg-slate-50"
          >
            Skip this Question
          </Button>

          <Button
            onClick={handleNext}
            className="h-11 rounded-xl bg-violet-600 px-6 font-semibold text-white transition-colors hover:bg-violet-700"
          >
            {isLastQuestion ? "Submit Exam" : "Save & Continue"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
