"use client";
import React from "react";
import ExamCard from "@/components/dashboard/admin/exam-card";
import { useGetExamsQuery } from "@/redux/examApiSlice";

const AdminHomePage = () => {
  const { data } = useGetExamsQuery();

  console.log(data);

  if (data) {
    return (
      <div className="grid grid-cols-3 gap-5">
        {data?.data?.map((exam, idx) => {
          const {
            candidates,
            slots,
            duration,
            questionSet,
            questionType,
            title,
            endTime,
            startTime,
          } = exam;
          return (
            <ExamCard
              key={idx}
              candidates={candidates}
              duration={duration}
              endTime={endTime}
              questionSet={questionSet}
              questionType={questionType}
              slots={slots}
              startTime={startTime}
              title={title}
            />
          );
        })}
      </div>
    );
  }

  return <div>No Exam Found. Start Adding</div>;
};

export default AdminHomePage;
