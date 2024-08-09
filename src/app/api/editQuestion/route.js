import Questions from "@/models/questModel";
import { NextResponse } from "next/server";
import connect from "@/dbconfig/connect";

export async function POST(request) {
  try {
    await connect();
    const req = await request.json();
    const { _id, subject, questions } = req;
    const question = await Questions.findById(_id);
    console.log(question);
    if (!question) {
      return NextResponse.json({
        success: false,
        msg: "No question found",
      });
    }

    const editedQuestion = await Questions.findOneAndUpdate(
      { _id },
      { subject, questions },
      { new: true, runValidators: true },
    );

    // await editedQuestion.save()dd

    const response = NextResponse.json({
      success: true,
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, msg: "Something went wrong" },
      error.message,
    );
  }
}
