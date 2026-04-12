/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormHeader, FormFooter } from "./shared-ui";
import { textSchema, QuestionType } from "./schemas";

interface Props {
  questionNumber: number;
  selectedType: QuestionType;
  onTypeChange: (type: QuestionType) => void;
  onSave: (data: any, keepOpen: boolean) => void;
  onClose: () => void;
}

export default function TextForm({
  questionNumber,
  selectedType,
  onTypeChange,
  onSave,
  onClose,
}: Props) {
  const form = useForm<z.infer<typeof textSchema>>({
    resolver: zodResolver(textSchema),
    defaultValues: { score: "5", questionBody: "" },
  });

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  const submitForm = (data: z.infer<typeof textSchema>, addMore: boolean) => {
    onSave({ ...data, type: "Text", options: [] }, addMore);
    if (addMore) form.reset();
  };

  return (
    <form className="space-y-6 p-6">
      <FormHeader
        questionNumber={questionNumber}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        control={control}
        selectedType={selectedType}
        onTypeChange={onTypeChange}
        onClose={onClose}
      />

      <div className="space-y-2">
        <Label>
          Enter your question <span className="text-red-500">*</span>
        </Label>
        <Input
          placeholder="e.g., Write a brief essay..."
          {...register("questionBody")}
          className={errors.questionBody ? "border-red-500" : ""}
        />
      </div>

      <div className="space-y-2 pt-2">
        <Label className="text-sm text-slate-500">
          Student Answer Area Preview
        </Label>
        <Textarea
          readOnly
          disabled
          placeholder="Students will write their descriptive answer here..."
          className="min-h-[120px] cursor-not-allowed resize-none border-slate-200 bg-slate-50"
        />
      </div>

      <FormFooter
        onClose={onClose}
        onSaveAndAdd={handleSubmit((data) => submitForm(data, true))}
      />
    </form>
  );
}
