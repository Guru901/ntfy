import { NextResponse } from "next/server";
import Task from "@/models/taskModel";
import connectToDb from "@/dbconfig/connectToDb";

export async function POST(request: Request) {
  try {
    await connectToDb();

    const req = await request.json();

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
