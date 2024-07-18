import connect from "@/dbconfig/connect";
import Folder from "@/models/folderModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connect();
  const req = await request.json();
  const { url, pathName } = req;
  const folder = await Folder.findById(pathName);
  if (!folder) {
    const response = NextResponse.json({
      message: "Folder not found",
      status: 404,
    });
    return response;
  }
  folder.files.push(url);
  await folder.save();
  const response = NextResponse.json({
    message: "File saved successfully",
    success: true,
  });
  return response;
}
