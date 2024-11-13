import { NextResponse } from "next/server";
import Task from "@/models/taskModel";
import connectToDb from "@/dbconfig/connectToDb";
import { z } from "zod";

const bodySchema = z.object({
  title: z.string(),
  subject: z.string(),
  priority: z.string(),
  id: z.string(),
});

export async function POST(request: Request) {
  try {
    await connectToDb();

    const req = await request.json();

    if (!bodySchema.safeParse(req).success) {
      return NextResponse.json({ success: false, error: "Invalid request" });
    }

    const { title, subject, priority, id } = req;

    const newTask = await Task.create({
      title: title,
      subject: subject,
      priority: priority,
      byUser: id,
    });

    await newTask.save();

    const tasks = await Task.find({ byUser: id });

    return NextResponse.json({ success: true, tasks });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}
