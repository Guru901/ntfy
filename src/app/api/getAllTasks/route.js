import connect from "@/dbconfig/connect";
import Task from "@/models/taskModel";
import { NextResponse } from "next/server";

export async function POST() {
  await connect();
  const tasks = await Task.find({});
  const response = NextResponse.json(tasks);
  return response;
}
