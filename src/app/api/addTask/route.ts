import { NextRequest, NextResponse } from "next/server";
import Task from "@/models/taskModel";
import connectToDb from "@/dbconfig/connectToDb";
import { z } from "zod";
import { getDataFromToken } from "@/lib/getDataFromToken";

const bodySchema = z.object({
  title: z.string(),
  subject: z.string(),
  priority: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    await connectToDb();

    const req = await request.json();

    if (!bodySchema.safeParse(req).success) {
      return NextResponse.json({ success: false, error: "Invalid request" });
    }

    const { title, subject, priority } = req;

    const data = getDataFromToken(request) as {
      id: string;
    };

    const newTask = await Task.create({
      title: title,
      subject: subject,
      priority: priority,
      byUser: data.id,
    });

    await newTask.save();

    const tasks = await Task.find({ byUser: data.id });

    return NextResponse.json({ success: true, tasks });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}
