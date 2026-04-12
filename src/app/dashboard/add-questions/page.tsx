import QuestionBuilder from "@/components/dashboard/question-builder";
import QuestionList from "@/components/dashboard/question-list";
import React from "react";

const AddQuestionPage = () => {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <QuestionList />
      <QuestionBuilder />
    </div>
  );
};

export default AddQuestionPage;
