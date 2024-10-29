import Questions from "@/models/questModel";
import { NextResponse } from "next/server";
import connectToDb from "@/dbconfig/connectToDb";

export async function POST(request: Request) {
  try {
    await connectToDb();

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

    return NextResponse.json({
      success: true,
      data: questions,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error,
    });
  }
}
