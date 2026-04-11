import React from "react";
import { Pencil } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useManageExamStore } from "@/stores/manage-exam-store";

export default function ExamInfoCard() {
  const removeExamInfo = useManageExamStore((state) => state.removeExamInfo);
  const examInfo = useManageExamStore((state) => state.examInfo);
  const setExamInfoEditing = useManageExamStore(
    (state) => state.setIsExamInfoEditing,
  );

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      {/* Top Card: Information Summary */}
      <Card className="rounded-xl border-slate-100 p-8 shadow-sm">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800">
            Basic Information
          </h2>
          <Button
            variant="ghost"
            className="h-8 px-3 font-medium text-violet-600 hover:bg-violet-50 hover:text-violet-700"
            onClick={() => {
              setExamInfoEditing(true);
            }}
          >
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </div>

        {/* Data Grid */}
        <div className="grid grid-cols-1 gap-x-4 gap-y-6 md:grid-cols-4">
          {/* Row 1 */}
          <div className="col-span-1 flex flex-col gap-1 md:col-span-4">
            <span className="text-muted-foreground text-sm font-medium">
              Online Test Title
            </span>
            <span className="text-base font-semibold">{examInfo?.title}</span>
          </div>

          {/* Row 2 */}
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground text-sm font-medium">
              Total Candidates
            </span>
            <span className="text-base font-semibold">
              {examInfo?.candidates}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground text-sm font-medium">
              Total Slots
            </span>
            <span className="text-base font-semibold">{examInfo?.slots}</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground text-sm font-medium">
              Total Question Set
            </span>
            <span className="text-base font-semibold">
              {examInfo?.questionSet}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground text-sm font-medium">
              Duration Per Slots (Minutes)
            </span>
            <span className="text-base font-semibold">
              {examInfo?.duration}
            </span>
          </div>

          {/* Row 3 */}
          <div className="col-span-1 flex flex-col gap-1 md:col-span-4">
            <span className="text-muted-foreground text-sm font-medium">
              Question Type
            </span>
            <span className="text-base font-semibold">
              {examInfo?.questionType.toLocaleUpperCase()}
            </span>
          </div>
        </div>
      </Card>

      {/* Bottom Card: Action Buttons */}
      <Card className="flex flex-row items-center justify-between rounded-xl border-slate-100 p-6 shadow-sm">
        <Button
          variant="outline"
          className="w-28"
          onClick={() => {
            removeExamInfo();
          }}
        >
          Cancel
        </Button>

        <Button className="w-28">Save & Continue</Button>
      </Card>
    </div>
  );
}
