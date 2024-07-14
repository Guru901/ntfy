import { NextResponse } from "next/server";
import Task from "@/models/taskModel";
import connect from "@/dbconfig/connect";

export async function POST(request) {
  connect();
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

  const response = NextResponse.json({ success: true, tasks });
  return response;
}
