"use client";

import React from "react";
import { Controller, Control } from "react-hook-form";
import { Trash2 } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { QuestionType } from "./schemas";

interface HeaderProps {
  questionNumber: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  selectedType: QuestionType;
  onTypeChange: (val: QuestionType) => void;
  onClose: () => void;
}

export function FormHeader({
  questionNumber,
  control,
  selectedType,
  onTypeChange,
  onClose,
}: HeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4 pb-2">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 font-medium text-slate-500">
          {questionNumber}
        </div>
        <h3 className="font-semibold text-slate-800">
          Question {questionNumber}
        </h3>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500">Score:</span>
          <Controller
            name="score"
            control={control}
            render={({ field }) => (
              <Input {...field} className="h-9 w-12 bg-slate-50 text-center" />
            )}
          />
        </div>

        <Select value={selectedType} onValueChange={onTypeChange}>
          <SelectTrigger className="h-9 w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Checkbox">Checkbox</SelectItem>
            <SelectItem value="Radio">Radio</SelectItem>
            <SelectItem value="Text">Text</SelectItem>
          </SelectContent>
        </Select>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-9 w-9 text-slate-400 hover:text-red-500"
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}

interface FooterProps {
  onClose: () => void;
  onSaveAndAdd: () => void;
}

export function FormFooter({ onClose, onSaveAndAdd }: FooterProps) {
  return (
    <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
      <Button
        type="button"
        variant="outline"
        className="w-24 text-slate-700"
        onClick={onClose}
      >
        Close
      </Button>
      <Button
        type="button"
        className="w-36 bg-violet-600 text-white hover:bg-violet-700"
        onClick={onSaveAndAdd}
      >
        Save & Add More
      </Button>
    </div>
  );
}
