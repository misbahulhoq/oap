import React from "react";
import { CalendarClock, FileText, UsersRound } from "lucide-react";

const examStats = [
  {
    label: "Candidates",
    value: "10,000",
    icon: UsersRound,
  },
  {
    label: "Question Set",
    value: "3",
    icon: FileText,
  },
  {
    label: "Exam Slots",
    value: "3",
    icon: CalendarClock,
  },
];

const ExamCard = () => {
  return (
    <section
      className="bg-card flex w-full flex-col gap-6 rounded-2xl border border-[#E5E7EB] px-5 py-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:px-8 sm:py-8"
      data-slot="exam-card"
    >
      <div className="flex flex-col gap-5">
        <h2 className="max-w-3xl text-xl leading-[1.4] font-semibold text-[#334155]">
          Psychometric Test for Management Trainee Officer
        </h2>

        <div className="grid gap-4 text-sm sm:grid-cols-2 xl:grid-cols-3">
          {examStats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="flex items-center gap-2">
              <span className="flex size-6 items-center justify-center text-[#94A3B8]">
                <Icon className="size-5 stroke-[1.75]" />
              </span>
              <span className="text-[#64748B]">{label}:</span>
              <span className="font-medium text-[#334155]">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <button
          type="button"
          className="text-primary border-primary hover:bg-primary/5 focus-visible:border-ring focus-visible:ring-ring/30 inline-flex h-12 items-center justify-center rounded-xl border bg-transparent px-6 text-sm leading-[1.4] font-semibold transition-colors focus-visible:ring-2 focus-visible:outline-none"
        >
          View Candidates
        </button>
      </div>
    </section>
  );
};

export default ExamCard;
