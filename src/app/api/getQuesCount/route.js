import Questions from "@/models/questModel";
import { NextResponse } from "next/server";
import connect from "@/dbconfig/connect";

export async function POST(request) {
  try {
    await connect();
    const req = await request.json();
    const { _id } = req.user;
    const questions = await Questions.find({
      byUser: _id,
    });
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
      error.message,
    );
  }
}
