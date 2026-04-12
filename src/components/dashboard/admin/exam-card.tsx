import React from "react";
import { CalendarClock, FileText, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExamInfo } from "@/stores/types";

const ExamCard = ({ title, candidates, questionSet, slots }: ExamInfo) => {
  return (
    <section
      className="bg-card border-border flex w-full flex-col gap-6 rounded-2xl border px-5 py-6 sm:px-8 sm:py-8"
      data-slot="exam-card"
    >
      <div className="flex flex-col gap-5">
        <h2 className="max-w-3xl text-xl leading-[1.4] font-semibold">
          {title}
        </h2>

        <div className="grid gap-4 text-sm sm:grid-cols-2 xl:grid-cols-3">
          {/* Candidates */}
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground flex size-6 items-center justify-center">
              <UsersRound className="size-5 stroke-[1.75]" />
            </span>
            <span className="text-muted-foreground">Candidates:</span>
            <span className="font-medium">{candidates}</span>
          </div>

          {/* {/* Question Set */}
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground flex size-6 items-center justify-center">
              <FileText className="size-5 stroke-[1.75]" />
            </span>
            <span className="text-muted-foreground">Question Set:</span>
            <span className="font-medium">{questionSet}</span>
          </div>

          {/* Exam Slots */}
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground flex size-6 items-center justify-center">
              <CalendarClock className="size-5 stroke-[1.75]" />
            </span>
            <span className="text-muted-foreground">Exam Slot:</span>
            <span className="font-medium">{slots}</span>
          </div>
        </div>
      </div>

      <div>
        <Button
          type="button"
          className="text-primary border-primary hover:bg-primary/5 focus-visible:border-ring focus-visible:ring-ring/30 inline-flex h-12 items-center justify-center rounded-xl border bg-transparent px-6 text-sm leading-[1.4] font-semibold transition-colors focus-visible:ring-2 focus-visible:outline-none"
        >
          View Candidates
        </Button>
      </div>
    </section>
  );
};

export default ExamCard;
