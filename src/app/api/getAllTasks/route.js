import connect from "@/dbconfig/connect";
import Task from "@/models/taskModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connect();
  const req = await request.json();
  const { id } = req;
  const tasks = await Task.find({ byUser: id });
  console.log(tasks);
  const response = NextResponse.json(tasks);
  return response;
}
