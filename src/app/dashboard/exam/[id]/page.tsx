"use client";
import React from "react";
import { use } from "react";
import { useGetExamsQuery } from "@/redux/examApiSlice";
import ExamInterface from "@/components/dashboard/student/exam-interface";

const ExamPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  // In a real application we should fetch the data from database based on id.
  // Here for simplicity we used mapping.
  const { data } = useGetExamsQuery();
  const exam = data?.data?.find((item) => item._id === id);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleExamSubmit = (studentAnswers: Record<string, any>) => {
    // This will fire when the timer runs out OR the user clicks "Submit Exam"
    console.log(
      "Exam finished! Here are the answers payload to send to the DB:",
    );
    console.log(studentAnswers);
  };

  if (!exam) {
    return <div>No exam found</div>;
  }
  return <ExamInterface onSubmitExam={handleExamSubmit} examData={exam} />;
};

export default ExamPage;
