import { NextResponse } from "next/server";
import Folder from "@/models/folderModel";

export async function POST(request) {
  const req = await request.json();
  const { name, id, location } = req;

  const existingFolder = await Folder.find({ name });

  for (const folder of existingFolder) {
    if (folder.location === location) {
      return NextResponse.json({ success: false, error: "Change the name" });
    }
  }

  const newFolder = await Folder.create({
    createdBy: id,
    location,
    name,
  });

  return NextResponse.json(newFolder);
}
