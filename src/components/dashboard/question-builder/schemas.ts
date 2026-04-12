import * as z from "zod";

export type QuestionType = "Checkbox" | "Radio" | "Text";

export const baseQuestionSchema = z.object({
  score: z.string().min(1, "Score required"),
  questionBody: z.string().min(1, "Question is required"),
});

export const checkboxSchema = baseQuestionSchema.extend({
  options: z
    .array(
      z.object({
        content: z.string().min(1, "Option text cannot be empty"),
        isCorrect: z.boolean(),
      }),
    )
    .min(1, "At least one option is required"),
});

export const radioSchema = baseQuestionSchema.extend({
  options: z
    .array(
      z.object({
        content: z.string().min(1, "Option text cannot be empty"),
        isCorrect: z.boolean(),
      }),
    )
    .min(2, "At least two options are required"),
});

export const textSchema = baseQuestionSchema;
