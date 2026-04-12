import { ExamInfo, Question } from "@/stores/types";
import { baseApi } from "./baseApi";

export interface Exam {
  examInfo: ExamInfo;
  questions: Question[];
}

export const examApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // POST /exams
    createExam: builder.mutation<Exam, Exam>({
      query: (body) => ({
        url: "/exams",
        method: "POST",
        body: { ...body.examInfo, questions: body.questions },
      }),
      invalidatesTags: ["Exam"],
    }),
  }),

  overrideExisting: false,
});

export const { useCreateExamMutation } = examApi;
