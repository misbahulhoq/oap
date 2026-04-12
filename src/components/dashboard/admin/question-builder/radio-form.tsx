"use client";

import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus, Trash2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FormHeader, FormFooter } from "./shared-ui";
import { radioSchema, QuestionType } from "./schemas";

interface Props {
  questionNumber: number;
  selectedType: QuestionType;
  onTypeChange: (type: QuestionType) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSave: (data: any, keepOpen: boolean) => void;
  onClose: () => void;
}

export default function RadioForm({
  questionNumber,
  selectedType,
  onTypeChange,
  onSave,
  onClose,
}: Props) {
  const form = useForm<z.infer<typeof radioSchema>>({
    resolver: zodResolver(radioSchema),
    defaultValues: {
      score: "1",
      questionBody: "",
      options: [
        { content: "", isCorrect: false },
        { content: "", isCorrect: false },
        { content: "", isCorrect: false },
      ],
    },
  });

  const {
    control,
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });
  const options = watch("options");

  const submitForm = (data: z.infer<typeof radioSchema>, addMore: boolean) => {
    if (!data.options.some((opt) => opt.isCorrect))
      return alert("Please select a correct answer!");
    onSave({ ...data, type: "Radio" }, addMore);
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
          placeholder="e.g., What is the capital of France?"
          {...register("questionBody")}
          className={errors.questionBody ? "border-red-500" : ""}
        />
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="group relative space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-xs font-bold text-slate-500">
                  {String.fromCharCode(65 + index)}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    role="radio"
                    className={`flex h-4 w-4 items-center justify-center rounded-full border transition-colors ${
                      options[index]?.isCorrect
                        ? "border-violet-600 bg-violet-600"
                        : "border-slate-300 bg-white"
                    }`}
                    onClick={() => {
                      const updated = options.map((opt, i) => ({
                        ...opt,
                        isCorrect: i === index,
                      }));
                      setValue("options", updated);
                    }}
                  >
                    {options[index]?.isCorrect && (
                      <div className="h-1.5 w-1.5 rounded-full bg-white" />
                    )}
                  </button>
                  <Label className="cursor-pointer text-xs font-medium text-slate-500">
                    Set as correct answer
                  </Label>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => remove(index)}
                className="text-slate-300 opacity-0 group-hover:opacity-100 hover:text-red-500"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <Input
              placeholder={`Option ${String.fromCharCode(65 + index)}`}
              {...register(`options.${index}.content`)}
              className={
                errors.options?.[index]?.content ? "border-red-500" : ""
              }
            />
          </div>
        ))}
        <Button
          type="button"
          variant="ghost"
          onClick={() => append({ content: "", isCorrect: false })}
          className="pl-0 font-semibold text-violet-600 hover:bg-violet-50 hover:text-violet-700"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Another Option
        </Button>
      </div>

      <FormFooter
        onClose={onClose}
        onSaveAndAdd={handleSubmit((data) => submitForm(data, true))}
      />
    </form>
  );
}
