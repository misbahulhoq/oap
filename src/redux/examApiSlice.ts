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

    // GET /exams
    getExams: builder.query<
      {
        success: boolean;
        data: {
          _id: string;
          title: string;
          candidates: string;
          slots: string;
          questionSet: string;
          questionType: string;
          duration: string;
          startTime?: Date | undefined;
          endTime?: Date | undefined;
          questions: (Question & { _id: string })[];
        }[];
      },
      void
    >({
      query: () => "/exams",
      providesTags: ["Exam"],
    }),
  }),

  overrideExisting: false,
});

export const { useCreateExamMutation, useGetExamsQuery } = examApi;
