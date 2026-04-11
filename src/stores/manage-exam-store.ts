import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { type ManageExamStore } from "./types";

export const useManageExamStore = create<ManageExamStore>()(
  persist(
    (set) => ({
      examInfo: null,
      isExamInfoEditing: false,
      questions: [],

      setExamInfo: (data) => set({ examInfo: data }),
      setIsExamInfoEditing: (value) => set({ isExamInfoEditing: value }),
      removeExamInfo: () => set({ examInfo: null }),
      addQuestion: (question) =>
        set((state) => ({ questions: [...state.questions, question] })),
      setQuestions: (questions) => set({ questions }),
      clearExamStore: () => set({ examInfo: null, questions: [] }),
    }),
    {
      name: "manage-exam-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        examInfo: state.examInfo,
        questions: state.questions,
        isExamInfoEditing: state.isExamInfoEditing,
      }),
    },
  ),
);
