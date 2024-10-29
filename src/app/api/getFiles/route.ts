import connectToDb from "@/dbconfig/connectToDb";
import Folder from "@/models/folderModel";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectToDb();
    const req = await request.json();
    const { pathName } = req;
    const folder = await Folder.findById(pathName);
    if (!folder) {
      return NextResponse.json({
        message: "Folder not found",
        status: 404,
      });
    }
    return NextResponse.json(folder.files);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Something went wrong" });
  }
}
