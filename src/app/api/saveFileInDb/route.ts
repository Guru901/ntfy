import connectToDb from "@/dbconfig/connectToDb";
import Folder from "@/models/folderModel";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectToDb();

    const req = await request.json();

    const { url, pathName } = req;

    const folder = await Folder.findById(pathName);

    if (!folder) {
      return NextResponse.json({
        msg: "Folder not found",
        status: 404,
      });
    }

    folder.files.push(url);

    await folder.save();

    return NextResponse.json({
      msg: "File saved successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      msg: "Something went wrong",
      success: false,
    });
  }
}
