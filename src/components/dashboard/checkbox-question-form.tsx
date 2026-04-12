"use client";

import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus, Trash2 } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

// 1. Validation Schema
const checkboxSchema = z.object({
  title: z.string().min(1, "Question title is required"),
  options: z
    .array(
      z.object({
        text: z.string().min(1, "Option text cannot be empty"),
        isCorrect: z.boolean().default(false),
      }),
    )
    .min(1, "At least one option is required"),
});

type CheckboxFormValues = z.infer<typeof checkboxSchema>;

export default function AddCheckboxQuestion() {
  // 2. Form Setup
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CheckboxFormValues>({
    resolver: zodResolver(checkboxSchema),
    defaultValues: {
      title: "",
      options: [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ],
    },
  });

  // 3. Dynamic Options Array
  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const onSubmit = (data: CheckboxFormValues) => {
    console.log("Checkbox Question Data:", data);
  };

  return (
    <Card className="mx-auto w-full max-w-3xl rounded-2xl border-slate-100 p-8 shadow-sm">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h2 className="text-xl font-bold text-slate-800">
            Add Checkbox Question
          </h2>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
            Multiple Answers Allowed
          </span>
        </div>

        {/* Question Title */}
        <div className="space-y-2">
          <Label htmlFor="title" className="font-semibold text-slate-700">
            Question Title <span className="text-red-500">*</span>
          </Label>
          <Input
            id="title"
            placeholder="e.g., Which of the following are primary colors?"
            className={`h-12 border-slate-200 focus:ring-violet-500 ${
              errors.title ? "border-red-500" : ""
            }`}
            {...register("title")}
          />
          {errors.title && (
            <p className="text-xs font-medium text-red-500">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Options List */}
        <div className="space-y-4">
          <Label className="mb-2 block font-semibold text-slate-700">
            Options & Correct Answers
          </Label>

          {fields.map((field, index) => (
            <div
              key={field.id}
              className="group flex flex-col gap-2 rounded-xl border border-slate-100 bg-slate-50/30 p-4"
            >
              <div className="flex items-center gap-4">
                {/* Checkbox for Correct Answer */}
                <Controller
                  name={`options.${index}.isCorrect`}
                  control={control}
                  render={({ field: checkField }) => (
                    <div className="flex min-w-[140px] items-center gap-2">
                      <Checkbox
                        id={`check-${index}`}
                        checked={checkField.value}
                        onCheckedChange={checkField.onChange}
                        className="h-5 w-5 border-slate-300 data-[state=checked]:border-violet-600 data-[state=checked]:bg-violet-600"
                      />
                      <Label
                        htmlFor={`check-${index}`}
                        className="cursor-pointer text-xs font-medium text-slate-500"
                      >
                        Set as correct
                      </Label>
                    </div>
                  )}
                />

                {/* Option Input */}
                <div className="relative flex-1">
                  <Input
                    placeholder={`Option ${String.fromCharCode(65 + index)}`}
                    className={`h-11 border-slate-200 bg-white ${
                      errors.options?.[index]?.text ? "border-red-500" : ""
                    }`}
                    {...register(`options.${index}.text` as const)}
                  />
                </div>

                {/* Remove Button */}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-slate-300 opacity-0 transition-opacity group-hover:opacity-100 hover:text-red-500"
                  onClick={() => remove(index)}
                  disabled={fields.length <= 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              {errors.options?.[index]?.text && (
                <p className="ml-[156px] text-[10px] font-medium text-red-500">
                  {errors.options[index]?.text?.message}
                </p>
              )}
            </div>
          ))}

          <Button
            type="button"
            variant="ghost"
            className="font-semibold text-violet-600 hover:bg-violet-50 hover:text-violet-700"
            onClick={() => append({ text: "", isCorrect: false })}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Another Option
          </Button>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end gap-3 border-t border-slate-100 pt-6">
          <Button
            type="reset"
            variant="outline"
            className="w-32 border-slate-200 text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            className="w-48 bg-violet-600 text-white hover:bg-violet-700"
          >
            Save Question
          </Button>
        </div>
      </form>
    </Card>
  );
}
