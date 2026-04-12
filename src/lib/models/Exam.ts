import mongoose from "mongoose";

const QuestionOptionSchema = new mongoose.Schema({
  option: {
    type: String,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    default: false,
  },
});

const QuestionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["checkbox", "radio", "text"],
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [QuestionOptionSchema],
    default: null,
  },
  answerText: {
    type: String,
    default: null,
  },
  score: {
    type: Number,
    default: 1,
  },
});

const ExamSchema = new mongoose.Schema(
  {
    // Exam basic info
    title: {
      type: String,
      required: [true, "Please provide a title"],
      trim: true,
    },
    candidates: {
      type: Number,
      required: [true, "Please provide total candidates"],
    },
    slots: {
      type: Number,
      required: [true, "Please provide total slots"],
    },
    questionSet: {
      type: Number,
      required: [true, "Please provide question set"],
    },
    questionType: {
      type: String,
      required: [true, "Please provide question type"],
      enum: ["mcq", "essay"],
    },
    startTime: {
      type: Date,
      default: null,
    },
    endTime: {
      type: Date,
      default: null,
    },
    duration: {
      type: Number,
      required: [true, "Please provide duration"],
    },
    // Questions array
    questions: {
      type: [QuestionSchema],
      default: [],
    },
    // Status tracking
    status: {
      type: String,
      enum: ["draft", "published", "active", "completed", "archived"],
      default: "draft",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Exam || mongoose.model("Exam", ExamSchema);
