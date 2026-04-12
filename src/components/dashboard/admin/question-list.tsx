"use client";

import { useManageExamStore } from "@/stores/manage-exam-store";
import MultiChoiceQuestionDisplay from "./mcq-question";
import { SingleChoiceQuestionDisplay } from "./single-choice-question";
import TextQuestionDisplay from "./text-question";

export default function QuestionList() {
  const { questions, setQuestions } = useManageExamStore();

  const handleRemove = (index: number) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const handleEdit = (index: number) => {
    // TODO: Implement edit functionality
    console.log("Edit question:", index);
  };

  if (questions.length === 0) {
    return null;
  }

  return (
    <div className="w-full space-y-6 p-8">
      {questions.map((question, index) => {
        const questionNumber = index + 1;
        const typeTag =
          question.type === "checkbox"
            ? "Checkbox"
            : question.type === "radio"
              ? "MCQ"
              : "Text";
        const pointTag = "1 pt";

        if (question.type === "text") {
          return (
            <TextQuestionDisplay
              key={index}
              questionNumber={questionNumber}
              typeTag={typeTag}
              pointTag={pointTag}
              questionTitle={question.question}
              description={question.answerText || ""}
              onEdit={() => handleEdit(index)}
              onRemove={() => handleRemove(index)}
            />
          );
        }

        if (question.type === "radio") {
          const formattedOptions = (question.options || []).map((opt, i) => ({
            id: `${index}-${i}`,
            label: String.fromCharCode(65 + i),
            text: opt.option,
            correct: opt.isCorrect,
          }));

          return (
            <SingleChoiceQuestionDisplay
              key={index}
              questionNumber={questionNumber}
              typeTag={typeTag}
              pointTag={pointTag}
              questionText={question.question}
              options={formattedOptions}
              onEdit={() => handleEdit(index)}
              onRemove={() => handleRemove(index)}
            />
          );
        }

        // checkbox type
        const formattedOptions = (question.options || []).map((opt, i) => ({
          id: `${index}-${i}`,
          label: String.fromCharCode(65 + i),
          text: opt.option,
          isCorrect: opt.isCorrect,
        }));

        return (
          <MultiChoiceQuestionDisplay
            key={index}
            questionNumber={questionNumber}
            typeTag={typeTag}
            pointTag={pointTag}
            questionText={question.question}
            options={formattedOptions}
            onEdit={() => handleEdit(index)}
            onRemove={() => handleRemove(index)}
          />
        );
      })}
    </div>
  );
}
