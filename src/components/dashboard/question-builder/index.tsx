/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useManageExamStore } from "@/stores/manage-exam-store";
import { type Question } from "@/stores/types";

import { QuestionType } from "./schemas";
import CheckboxForm from "./checkbox-form";
import RadioForm from "./radio-form";
import TextForm from "./text-form";

export default function QuestionBuilder() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<QuestionType>("Checkbox");

  const { questions, addQuestion } = useManageExamStore();
  const questionNumber = questions.length + 1;

  // Formatter for the Global Store
  const handleSave = (rawFormData: any, keepOpen: boolean) => {
    const formattedOptions =
      rawFormData.type === "Text"
        ? null
        : rawFormData.options.map((opt: any) => ({
            option: opt.content,
            isCorrect: opt.isCorrect,
          }));

    const finalQuestion: Question = {
      type: rawFormData.type.toLowerCase() as "checkbox" | "radio" | "text",
      score: rawFormData.score,
      question: rawFormData.questionBody,
      options: formattedOptions,
      answerText: rawFormData.type === "Text" ? "" : null,
    };

    addQuestion(finalQuestion);

    if (!keepOpen) {
      setIsOpen(false);
      setSelectedType("Checkbox"); // Reset back to default for next time
    }
  };

  const closeDialog = () => {
    setIsOpen(false);
    setSelectedType("Checkbox");
  };

  return (
    <div className="w-full px-8 py-4">
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) setSelectedType("Checkbox");
        }}
      >
        <DialogTrigger asChild>
          <Button
            size="default"
            className="mx-auto flex w-full max-w-md items-center bg-violet-600 hover:bg-violet-700"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Question
          </Button>
        </DialogTrigger>

        <DialogContent className="max-h-[90vh] max-w-[90%]! overflow-y-auto rounded-2xl border-none p-0">
          <DialogTitle className="sr-only">Add Question</DialogTitle>

          {/* Conditional Rendering dynamically mounts/unmounts isolating states */}
          {selectedType === "Checkbox" && (
            <CheckboxForm
              questionNumber={questionNumber}
              selectedType={selectedType}
              onTypeChange={setSelectedType}
              onSave={handleSave}
              onClose={closeDialog}
            />
          )}

          {selectedType === "Radio" && (
            <RadioForm
              questionNumber={questionNumber}
              selectedType={selectedType}
              onTypeChange={setSelectedType}
              onSave={handleSave}
              onClose={closeDialog}
            />
          )}

          {selectedType === "Text" && (
            <TextForm
              questionNumber={questionNumber}
              selectedType={selectedType}
              onTypeChange={setSelectedType}
              onSave={handleSave}
              onClose={closeDialog}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
