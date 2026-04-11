import * as z from "zod";
import { basicFormSchema } from "@/components/dashboard/exam-info-form";

export type Question = {
  type: "checkbox" | "radio" | "text";
  question: string;
  options: { option: string; isCorrect: boolean }[] | null;
  answerText: string | null;
};

export type ManageExamStore = {
  examInfo: z.infer<typeof basicFormSchema> | null;
  isExamInfoEditing: boolean;
  questions: Question[];

  setExamInfo: (data: z.infer<typeof basicFormSchema> | null) => void;
  setIsExamInfoEditing: (value: boolean) => void;
  removeExamInfo: () => void;
  addQuestion: (question: Question) => void;
  setQuestions: (questions: Question[]) => void;
  clearExamStore: () => void;
};
