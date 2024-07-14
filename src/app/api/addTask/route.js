import { NextResponse } from "next/server";
import Task from "@/models/taskModel";
import connect from "@/dbconfig/connect";

export async function POST(request) {
  connect();
  const req = await request.json();
  const { title, subject, priority } = req;

  const newTask = await Task.create({
    title: title,
    subject: subject,
    priority: priority,
  });

  await newTask.save();

  const tasks = await Task.find({});

  const response = NextResponse.json({ success: true, tasks });
  return response;
}
