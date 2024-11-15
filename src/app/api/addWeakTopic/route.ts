import { NextResponse } from "next/server";
import WeakTopic from "@/models/weakTopicModel";
import connectToDb from "@/dbconfig/connectToDb";

export async function POST(request: Request) {
  try {

    await connectToDb();

    const req = await request.json();

    const { weakTopic, subject } = req.form;
    const { _id } = req.user;

    console.log(weakTopic, subject, _id);

    const weakTopicDoc = await WeakTopic.create({
      name: weakTopic,
      subject: subject,
      createdBy: _id,
    });

    await weakTopicDoc.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}
