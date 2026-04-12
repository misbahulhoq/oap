"use client";

import React from "react";
import ExamInfoCard from "@/components/dashboard/student/exam-card";
import { useGetExamsQuery } from "@/redux/examApiSlice";

const StudentHome = () => {
  const { data } = useGetExamsQuery();

  if (data?.data) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {data?.data.map((exam) => {
          const { _id, title, duration, questions } = exam;
          return (
            <ExamInfoCard
              key={_id}
              title={title}
              id={_id}
              duration={duration}
              questionCount={questions.length}
            />
          );
        })}
      </div>
    );
  }

  return <div>No exams found.</div>;
};

export default StudentHome;
