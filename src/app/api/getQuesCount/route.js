import Questions from "@/models/questModel";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const questions = await Questions.find({});
    if (!questions) {
      return NextResponse.json({
        success: false,
        msg: "No questions found",
      });
    }
    const response = NextResponse.json({
      success: true,
      data: questions,
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, msg: "Something went wrong" },
      error.message
    );
  }
}
