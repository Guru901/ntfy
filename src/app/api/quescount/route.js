import Questions from "@/models/questModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const req = await request.json();
    const { subject, questions } = req;
    const newQuestion = {
      subject: subject,
      questions: questions,
    };
    await Questions.create(newQuestion);

    return NextResponse.json({
      success: true,
      msg: "Question added successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, msg: "Something went wrong" },
      error.message
    );
  }
}
