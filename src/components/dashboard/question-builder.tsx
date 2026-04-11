// components/QuestionBuilder.tsx
"use client";

import React, { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus, Trash2, X } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { RichEditor } from "./rich-editor";

// Types & Schema
type QuestionType = "Checkbox" | "Radio" | "Text";

const questionSchema = z.object({
  type: z.enum(["Checkbox", "Radio", "Text"]),
  score: z.string().default("1"),
  questionBody: z.string().min(1, "Question is required"),
  options: z
    .array(
      z.object({
        content: z.string(),
        isCorrect: z.boolean().default(false),
      }),
    )
    .optional(),
});

type QuestionFormValues = z.infer<typeof questionSchema>;

export default function QuestionBuilder() {
  const [isOpen, setIsOpen] = useState(false);

  const { control, handleSubmit, watch, setValue, reset } =
    useForm<QuestionFormValues>({
      resolver: zodResolver(questionSchema),
      defaultValues: {
        type: "Checkbox",
        score: "1",
        questionBody: "",
        options: [
          { content: "", isCorrect: false },
          { content: "", isCorrect: false },
          { content: "", isCorrect: false },
        ],
      },
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const currentType = watch("type");

  const handleTypeChange = (val: QuestionType) => {
    setValue("type", val);
    if (val === "Text") {
      setValue("options", []);
    } else if (!watch("options")?.length) {
      setValue("options", [{ content: "", isCorrect: false }]);
    }
  };

  const onSubmit = (data: QuestionFormValues) => {
    console.log("Saved Question:", data);
    setIsOpen(false);
    reset();
  };

  return (
    <div className="p-8">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            size="default"
            className="mx-auto flex w-full max-w-md items-center"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Question
          </Button>
        </DialogTrigger>

        <DialogContent className="max-h-[90vh] overflow-y-auto rounded-xl border-none p-0">
          <DialogTitle>Add Question</DialogTitle>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
            {/* Header Section */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 font-medium text-slate-500">
                  1
                </div>
                <h3 className="font-semibold text-slate-800">Question 1</h3>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-500">Score:</span>
                  <Controller
                    name="score"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        className="h-9 w-12 border-slate-200 bg-slate-50 text-center"
                      />
                    )}
                  />
                </div>

                <Select
                  value={currentType}
                  onValueChange={(val: QuestionType) => handleTypeChange(val)}
                >
                  <SelectTrigger className="h-9 w-32 border-slate-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Checkbox">Checkbox</SelectItem>
                    <SelectItem value="Radio">Radio</SelectItem>
                    <SelectItem value="Text">Text</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-slate-400 hover:text-red-500"
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Question Body */}
            <Controller
              name="questionBody"
              control={control}
              render={({ field }) => (
                <RichEditor content={field.value} onChange={field.onChange} />
              )}
            />

            {/* Options Section */}
            {currentType !== "Text" && (
              <div className="space-y-4">
                {fields.map((field, index) => (
                  <div key={field.id} className="group relative space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {/* Letter Identifier */}
                        <div className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-xs font-bold text-slate-500">
                          {String.fromCharCode(65 + index)}
                        </div>

                        {/* Correct Answer Toggle */}
                        <div className="flex items-center gap-2">
                          {currentType === "Checkbox" ? (
                            <Controller
                              name={`options.${index}.isCorrect`}
                              control={control}
                              render={({ field: checkField }) => (
                                <Checkbox
                                  id={`correct-${index}`}
                                  checked={checkField.value}
                                  onCheckedChange={checkField.onChange}
                                  className="border-slate-300 data-[state=checked]:border-violet-600 data-[state=checked]:bg-violet-600"
                                />
                              )}
                            />
                          ) : (
                            <Controller
                              name="options" // Radio logic: ensure only one isCorrect
                              control={control}
                              render={({ field: optionsField }) => (
                                <RadioGroup
                                  value={optionsField.value
                                    .findIndex((o) => o.isCorrect)
                                    .toString()}
                                  onValueChange={(val) => {
                                    const updated = optionsField.value.map(
                                      (opt, i) => ({
                                        ...opt,
                                        isCorrect: i === parseInt(val),
                                      }),
                                    );
                                    setValue("options", updated);
                                  }}
                                >
                                  <RadioGroupItem
                                    value={index.toString()}
                                    id={`correct-${index}`}
                                    className="border-slate-300 text-violet-600"
                                  />
                                </RadioGroup>
                              )}
                            />
                          )}
                          <label
                            htmlFor={`correct-${index}`}
                            className="cursor-pointer text-xs font-medium text-slate-500"
                          >
                            Set as correct answer
                          </label>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(index)}
                        className="text-slate-300 opacity-0 transition-opacity group-hover:opacity-100 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <Controller
                      name={`options.${index}.content`}
                      control={control}
                      render={({ field: optionField }) => (
                        <RichEditor
                          content={optionField.value}
                          onChange={optionField.onChange}
                        />
                      )}
                    />
                  </div>
                ))}

                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => append({ content: "", isCorrect: false })}
                  className="pl-0 font-semibold text-violet-600 hover:bg-violet-50 hover:text-violet-700"
                >
                  <Plus className="mr-2 h-4 w-4" /> Another options
                </Button>
              </div>
            )}

            {/* Footer Actions */}
            <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
              <Button
                type="button"
                variant="outline"
                className="w-32 border-violet-200 text-violet-600 hover:bg-violet-50"
                onClick={() => setIsOpen(false)}
              >
                Save
              </Button>
              <Button
                type="submit"
                className="w-48 bg-violet-600 text-white hover:bg-violet-700"
              >
                Save & Add More
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
