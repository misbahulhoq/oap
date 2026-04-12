"use client";

import React from "react";
import ExamInfoForm from "@/components/dashboard/admin/exam-info-form";
import { useManageExamStore } from "@/stores/manage-exam-store";
import ExamInfoCard from "@/components/dashboard/admin/exam-info-card";

const NewExamPage = () => {
  const examInfo = useManageExamStore((state) => state.examInfo);
  const isExamInfoEditing = useManageExamStore(
    (state) => state.isExamInfoEditing,
  );

  if (examInfo && !isExamInfoEditing) {
    return <ExamInfoCard />;
  }

  return <ExamInfoForm />;
};

export default NewExamPage;
