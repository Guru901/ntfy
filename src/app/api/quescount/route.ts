import connectToDb from "@/dbconfig/connectToDb";
import Questions from "@/models/questModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/lib/getDataFromToken";
import { z } from "zod";

const bodySchema = z.object({
  subject: z.string(),
  questions: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    await connectToDb();

    const req = await request.json();

    if (!bodySchema.safeParse(req).success) {
      return NextResponse.json({ success: false, error: "Invalid request" });
    }

    const { subject, questions } = req.value;

    const data = getDataFromToken(request) as {
      id: string;
    };

    const newQuestion = {
      subject: subject,
      questions: questions,
      byUser: data.id,
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
