import Questions from "@/models/questModel";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const req = await request.json();
    const { subject, questions } = req.form;
    const { _id } = req.loggedInUser;
    const newQuestion = {
      subject: subject,
      questions: questions,
      byUser: _id,
    };
    await Questions.create(newQuestion);

    return NextResponse.json({
      success: true,
      msg: "Question added successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error,
    });
  }
}
