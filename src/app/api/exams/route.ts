import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Exam from "@/lib/models/Exam";

export async function POST(req: Request) {
  await dbConnect();

  try {
    const body = await req.json();
    const exam = await Exam.create(body);
    return NextResponse.json({ success: true, data: exam }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { success: false, error: "Unknown error" },
      { status: 500 },
    );
  }
}

export async function GET() {
  await dbConnect();

  try {
    const exams = await Exam.find({});
    return NextResponse.json({ success: true, data: exams });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { success: false, error: "Unknown error" },
      { status: 500 },
    );
  }
}
