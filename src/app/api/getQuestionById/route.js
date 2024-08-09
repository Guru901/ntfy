import Questions from "@/models/questModel";
import { NextResponse } from "next/server";
import connect from "@/dbconfig/connect";

export async function POST(request) {
  try {
    await connect();
    const req = await request.json();
    const question = await Questions.findById(req);
    if (!question) {
      return NextResponse.json({
        success: false,
        msg: "No question found",
      });
    }
    const response = NextResponse.json({
      success: true,
      data: question,
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, msg: "Something went wrong" },
      error.message,
    );
  }
}
