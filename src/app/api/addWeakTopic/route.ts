import { NextResponse } from "next/server";
import WeakTopic from "@/models/weakTopicModel";

export async function POST(request: Request) {
  try {
    const req = await request.json();
    const { weakTopic, subject } = req.form;
    const { _id } = req.loggedInUser;

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
