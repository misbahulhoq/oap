"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Clock } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Field, FieldLabel, FieldError } from "@/components/ui/field";

const formSchema = z.object({
  title: z.string().min(1, "Test title is required"),
  candidates: z.string().min(1, "Total candidates is required"),
  slots: z.string().min(1, "Slots are required"),
  questionSet: z.string().min(1, "Question set is required"),
  questionType: z.string().min(1, "Question type is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  duration: z.string().optional(),
});

export default function ExamInfo() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      candidates: "",
      slots: "",
      questionSet: "",
      questionType: "",
      startTime: "",
      endTime: "",
      duration: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  return (
    <Card className="mx-auto w-full max-w-5xl rounded-xl border-slate-100 p-8 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-800">
          Basic Information
        </h2>
      </div>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-6 md:grid-cols-12"
      >
        {/* Row 1: Online Test Title */}
        <div className="col-span-1 md:col-span-12">
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor={field.name}
                  className="mb-2 block font-semibold text-slate-700"
                >
                  Online Test Title <span className="text-red-500">*</span>
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter online test title"
                  className="h-11 border-slate-200"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        {/* Row 2: Candidates */}
        <div className="col-span-1 md:col-span-6">
          <Controller
            name="candidates"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor={field.name}
                  className="mb-2 block font-semibold text-slate-700"
                >
                  Total Candidates <span className="text-red-500">*</span>
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="number"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter total candidates"
                  className="h-11 border-slate-200"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        {/* Row 2: Slots */}
        <div className="col-span-1 md:col-span-6">
          <Controller
            name="slots"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor={`select-${field.name}`}
                  className="mb-2 block font-semibold text-slate-700"
                >
                  Total Slots <span className="text-red-500">*</span>
                </FieldLabel>
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    id={`select-${field.name}`}
                    aria-invalid={fieldState.invalid}
                    className="h-11 border-slate-200 text-slate-500"
                  >
                    <SelectValue placeholder="Select total slots" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Slot</SelectItem>
                    <SelectItem value="2">2 Slots</SelectItem>
                    <SelectItem value="3">3 Slots</SelectItem>
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        {/* Row 3: Question Set */}
        <div className="col-span-1 md:col-span-6">
          <Controller
            name="questionSet"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor={`select-${field.name}`}
                  className="mb-2 block font-semibold text-slate-700"
                >
                  Total Question Set <span className="text-red-500">*</span>
                </FieldLabel>
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    id={`select-${field.name}`}
                    aria-invalid={fieldState.invalid}
                    className="h-11 border-slate-200 text-slate-500"
                  >
                    <SelectValue placeholder="Select total question set" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="set-a">Set A</SelectItem>
                    <SelectItem value="set-b">Set B</SelectItem>
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        {/* Row 3: Question Type */}
        <div className="col-span-1 md:col-span-6">
          <Controller
            name="questionType"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor={`select-${field.name}`}
                  className="mb-2 block font-semibold text-slate-700"
                >
                  Question Type <span className="text-red-500">*</span>
                </FieldLabel>
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    id={`select-${field.name}`}
                    aria-invalid={fieldState.invalid}
                    className="h-11 border-slate-200 text-slate-500"
                  >
                    <SelectValue placeholder="Select question type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mcq">Multiple Choice (MCQ)</SelectItem>
                    <SelectItem value="essay">Essay</SelectItem>
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        {/* Row 4: Start Time */}
        <div className="col-span-1 md:col-span-5">
          <Controller
            name="startTime"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor={field.name}
                  className="mb-2 block font-semibold text-slate-700"
                >
                  Start Time <span className="text-red-500">*</span>
                </FieldLabel>
                <div className="relative">
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter start time"
                    className="h-11 border-slate-200 pr-10"
                  />
                  <Clock className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-slate-400" />
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        {/* Row 4: End Time */}
        <div className="col-span-1 md:col-span-5">
          <Controller
            name="endTime"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor={field.name}
                  className="mb-2 block font-semibold text-slate-700"
                >
                  End Time <span className="text-red-500">*</span>
                </FieldLabel>
                <div className="relative">
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter end time"
                    className="h-11 border-slate-200 pr-10"
                  />
                  <Clock className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-slate-400" />
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        {/* Row 4: Duration */}
        <div className="col-span-1 md:col-span-2">
          <Controller
            name="duration"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor={field.name}
                  className="mb-2 block font-semibold text-slate-700"
                >
                  Duration
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Duration Time"
                  className="h-11 border-slate-200 bg-slate-50/50"
                  readOnly
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
      </form>
    </Card>
  );
}
