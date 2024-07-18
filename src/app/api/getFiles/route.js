import connect from "@/dbconfig/connect";
import Folder from "@/models/folderModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  connect();
  const req = await request.json();
  const { pathName } = req;
  const folder = await Folder.findById(pathName);
  if (!folder) {
    const response = NextResponse.json({
      message: "Folder not found",
      status: 404,
    });
    return response;
  }
  const response = NextResponse.json(folder.files);
  return response;
}
