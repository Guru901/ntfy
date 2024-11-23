import { NextResponse } from "next/server";
import connectToDb from "@/dbconfig/connectToDb";
import Task from "@/models/taskModel";
import { z } from "zod";

const bodySchema = z.object({
  _id: z.string(),
});

export async function POST(request: Request) {
  try {
    await connectToDb();

    const req = await request.json();

    if (!bodySchema.safeParse(req).success) {
      return NextResponse.json({ success: false, error: "Invalid request" });
    }

    const { _id } = req;

    await Task.findOneAndDelete({ _id: _id });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: error });
  }
}
