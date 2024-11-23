import Question from "@/models/questModel";
import { NextResponse } from "next/server";
import connectToDb from "@/dbconfig/connectToDb";
import { z } from "zod";

const bodySchema = z.string();

export async function POST(request: Request) {
  try {
    await connectToDb();

    const req = await request.json();

    if (!bodySchema.safeParse(req).success) {
      return NextResponse.json({ success: false, error: "Invalid request" });
    }

    await Question.findByIdAndDelete(req);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, msg: "Something went wrong" });
  }
}
