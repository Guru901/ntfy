import Questions from "@/models/questModel";
import { NextResponse } from "next/server";
import connectToDb from "@/dbconfig/connectToDb";

export async function POST(request: Request) {
  try {
    await connectToDb();
    const req = await request.json();
    const question = await Questions.findById(req);
    if (!question) {
      return NextResponse.json({
        success: false,
        msg: "No question found",
      });
    }
    return NextResponse.json({
      success: true,
      data: question,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error,
    });
  }
}
