"use client";

import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useManageExamStore } from "@/stores/manage-exam-store";

export const basicFormSchema = z.object({
  title: z.string().min(1, "Test title is required"),
  candidates: z.string().min(1, "Total candidates is required"),
  slots: z.string().min(1, "Slots are required"),
  questionSet: z.string().min(1, "Question set is required"),
  questionType: z.string().min(1, "Question type is required"),
  startTime: z.date().optional(),
  endTime: z.date().optional(),
  duration: z.string().min(1, "Duration is required"),
});

const emptyDefaultValues = {
  title: "",
  candidates: "",
  slots: "",
  questionSet: "",
  questionType: "",
  startTime: new Date(Date.now()),
  endTime: new Date(Date.now() + 20000000),
  duration: "",
};

export default function ExamInfoForm() {
  const examInfo = useManageExamStore((state) => state.examInfo);
  const setExamInfo = useManageExamStore((state) => state.setExamInfo);
  const setExamInfoEditing = useManageExamStore(
    (state) => state.setIsExamInfoEditing,
  );

  const form = useForm<z.infer<typeof basicFormSchema>>({
    resolver: zodResolver(basicFormSchema),
    defaultValues: examInfo || emptyDefaultValues,
  });

  function onSubmit(data: z.infer<typeof basicFormSchema>) {
    setExamInfo(data);
    setExamInfoEditing(false);
  }

  return (
    <Card className="mx-auto w-full max-w-5xl rounded-xl p-8 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Basic Information</h2>
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
                  className="text-foreground/80 mb-2 block font-semibold"
                >
                  Online Test Title <span className="text-destructive">*</span>
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter online test title"
                  className="h-11"
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
                  className="text-foreground/80 mb-2 block font-semibold"
                >
                  Total Candidates <span className="text-destructive">*</span>
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="number"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter total candidates"
                  className="h-11"
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
                  className="text-foreground/80 mb-2 block font-semibold"
                >
                  Total Slots <span className="text-destructive">*</span>
                </FieldLabel>
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    id={`select-${field.name}`}
                    aria-invalid={fieldState.invalid}
                    className="h-10!"
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
                  className="text-foreground/80 mb-2 block font-semibold"
                >
                  Total Question Set <span className="text-destructive">*</span>
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="number"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter total candidates"
                  className="h-11"
                />
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
                  className="text-foreground/80 mb-2 block font-semibold"
                >
                  Question Type <span className="text-destructive">*</span>
                </FieldLabel>
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    id={`select-${field.name}`}
                    aria-invalid={fieldState.invalid}
                    className="h-10!"
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
            render={({ field, fieldState }) => {
              return (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-foreground/80 mb-2 block font-semibold"
                  >
                    Start Time <span className="text-destructive">*</span>
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      id={field.name}
                      type="datetime-local"
                      aria-invalid={fieldState.invalid}
                      className="h-11 pr-10"
                      // Convert Date → string for the input's value
                      value={
                        field.value instanceof Date
                          ? field.value.toISOString().slice(0, 16)
                          : typeof field.value === "string"
                            ? (field.value as string).slice(0, 16)
                            : ""
                      }
                      // Convert string → Date before storing in RHF
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? new Date(e.target.value) : undefined,
                        )
                      }
                      onBlur={field.onBlur}
                      ref={field.ref}
                    />
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              );
            }}
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
                  className="text-foreground/80 mb-2 block font-semibold"
                >
                  End Time <span className="text-destructive">*</span>
                </FieldLabel>

                <div className="relative">
                  <Input
                    id={field.name}
                    type="datetime-local"
                    aria-invalid={fieldState.invalid}
                    className="h-11 pr-10"
                    value={
                      field.value instanceof Date
                        ? field.value.toISOString().slice(0, 16)
                        : typeof field.value === "string"
                          ? (field.value as string).slice(0, 16)
                          : ""
                    }
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? new Date(e.target.value) : undefined,
                      )
                    }
                    onBlur={field.onBlur}
                    ref={field.ref}
                  />
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
                  className="text-foreground/80 mb-2 block font-semibold"
                >
                  Duration (minutes) <span className="text-destructive">*</span>
                </FieldLabel>
                <Input
                  {...field}
                  type="number"
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Duration Time"
                  className="h-11 bg-slate-50/50"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        {/* Row 5: Submit */}
        <div className="col-span-1 flex justify-between md:col-span-10">
          <Button
            type="reset"
            variant="outline"
            className="w-[100px]"
            onClick={() => {
              if (examInfo) setExamInfo(null);
              form.reset(emptyDefaultValues);
            }}
          >
            Cancel
          </Button>

          <Button type="submit" className="w-[100px]">
            Save
          </Button>
        </div>
      </form>
    </Card>
  );
}
