import connectToDb from "@/dbconfig/connectToDb";
import Task from "@/models/taskModel";
import { NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z.string();

export async function POST(request: Request) {
  try {
    await connectToDb();
    const req = await request.json();

    if (!bodySchema.safeParse(req).success) {
      return NextResponse.json({ success: false, error: "Invalid request" });
    }

    const task = await Task.findById(req);
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json({ msg: "An Error Occured" });
  }
}
