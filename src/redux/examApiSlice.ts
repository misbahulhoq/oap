import { baseApi } from "./baseApi";

// ── Types ────────────────────────────────────────────────────────────────────

export interface CreateExamDto {
  title: string;
  description?: string;
  duration: number; // in minutes
  scheduledAt: string; // ISO date string
}

export interface Exam {
  id: number;
  title: string;
  description?: string;
  duration: number;
  scheduledAt: string;
  createdAt: string;
}

// ── Injected endpoints ───────────────────────────────────────────────────────

export const examApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // POST /exams
    createExam: builder.mutation<Exam, CreateExamDto>({
      query: (body) => ({
        url: "/exams",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Exam"],
    }),
  }),

  overrideExisting: false,
});

export const { useCreateExamMutation } = examApi;
