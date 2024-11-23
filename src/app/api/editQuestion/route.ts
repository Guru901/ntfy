import Questions from "@/models/questModel";
import { NextResponse } from "next/server";
import connectToDb from "@/dbconfig/connectToDb";
import {z} from "zod"

const bodySchema = z.object({
  _id: z.string(),
  subject: z.string(),
  questions: z.string(),
});

export async function POST(request: Request) {
  try {
    await connectToDb();
    const req = await request.json();

    if (!bodySchema.safeParse(req).success) {
      return NextResponse.json({ success: false, error: "Invalid request" });
    }

    const { _id, subject, questions } = req;

    const question = await Questions.findById(_id);

    if (!question) {
      return NextResponse.json({
        success: false,
        msg: "No question found",
      });
    }

    const editedQuestion = await Questions.findOneAndUpdate(
      { _id },
      { subject, questions },
      { new: true, runValidators: true }
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}
