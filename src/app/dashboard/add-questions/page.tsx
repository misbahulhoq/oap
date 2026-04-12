import React from "react";
import QuestionBuilder from "@/components/dashboard/admin/question-builder";
import QuestionList from "@/components/dashboard/admin/question-list";

const AddQuestionPage = () => {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <QuestionList />
      <QuestionBuilder />
    </div>
  );
};

export default AddQuestionPage;
