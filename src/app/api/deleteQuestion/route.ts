import Question from "@/models/questModel";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const req = await request.json();

    await Question.findByIdAndDelete(req);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, msg: "Something went wrong" });
  }
}
