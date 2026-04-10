import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ManageTestHeader() {
  return (
    <Card className="mx-auto flex w-full max-w-6xl flex-row items-center justify-between rounded-xl p-6 shadow-sm">
      {/* Left Section: Title and Stepper */}
      <div className="flex flex-col gap-5">
        <h1 className="text-xl font-semibold text-slate-800">
          Manage Online Test
        </h1>

        {/* Stepper */}
        <div className="flex items-center gap-4">
          {/* Active Step 1 */}
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-600 text-xs font-semibold text-white">
              1
            </div>
            <span className="text-sm font-medium text-violet-600">
              Basic Info
            </span>
          </div>

          {/* Divider Line */}
          <div className="h-px w-20 rounded-full bg-slate-300"></div>

          {/* Inactive Step 2 */}
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-500">
              2
            </div>
            <span className="text-sm font-medium text-slate-500">
              Questions
            </span>
          </div>
        </div>
      </div>

      {/* Right Section: Action Button */}
      <div>
        <Button variant="outline" size={"lg"} asChild>
          <Link href={"/dashboard/admin"}>Back to Dashboard</Link>
        </Button>
      </div>
    </Card>
  );
}
