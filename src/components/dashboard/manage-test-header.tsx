"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useManageExamStore } from "@/stores/manage-exam-store";
import { useCreateExamMutation } from "@/redux/examApiSlice";

export default function ManageTestHeader() {
  const pathName = usePathname();
  const examInfo = useManageExamStore((state) => state.examInfo);
  const questions = useManageExamStore((state) => state.questions);
  const isAddQuestionsPage = pathName === "/dashboard/add-questions";
  console.log(questions);

  const [addExam, { isLoading }] = useCreateExamMutation();

  const handleAddExam = async () => {
    if (examInfo) {
      try {
        await addExam({ examInfo, questions }).unwrap();
        toast("Exam Created Successfully");
      } catch (_err) {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <Card className="mx-auto mb-4 flex w-full max-w-6xl flex-row items-center justify-between rounded-xl p-6 shadow-sm">
      {/* Left Section: Title and Stepper */}
      <div className="flex flex-col gap-5">
        <h1 className="text-xl font-semibold text-slate-800">
          Manage Online Test
        </h1>

        {/* Stepper */}
        <div className="flex items-center gap-4">
          {/*  Step 1 */}
          <Step isActive={true} serial={1} label="Basic Info" />

          {/* Divider Line */}
          <div className="h-px w-20 rounded-full bg-slate-300"></div>

          {/*  Step 2 */}
          <Step
            isActive={pathName === "/dashboard/add-questions"}
            serial={2}
            label="Questions"
          />
        </div>
      </div>

      {/* Right Section: Action Button */}
      <div className="flex items-center gap-2">
        {isAddQuestionsPage && questions.length > 0 && (
          <Button size={"lg"} disabled={isLoading} onClick={handleAddExam}>
            {isLoading ? "Saving.." : "Save"}
          </Button>
        )}

        <Button variant="outline" size={"lg"} asChild>
          <Link href={"/dashboard/admin"}>Back to Dashboard</Link>
        </Button>
      </div>
    </Card>
  );
}

function Step({
  isActive,
  serial,
  label,
}: {
  serial: number;
  isActive: boolean;
  label: string;
}) {
  if (isActive)
    return (
      <div className="flex items-center gap-2">
        <div className="bg-primary flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold text-white">
          {serial}
        </div>
        <span className="text-primary text-sm font-medium">{label}</span>
      </div>
    );

  return (
    <div className="flex items-center gap-2">
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-500">
        {serial}
      </div>
      <span className="text-sm font-medium text-slate-500">{label}</span>
    </div>
  );
}
