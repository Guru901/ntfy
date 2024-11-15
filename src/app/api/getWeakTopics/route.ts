import WeakTopic from "@/models/weakTopicModel";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const req = await request.json();
    const { user } = req;
    console.log("user", user);

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" });
    }

    const weakTopics = await WeakTopic.find({ createdBy: user._id });
    if (!weakTopics) {
      return NextResponse.json({
        success: false,
        message: "No weak topics found",
      });
    }
    return NextResponse.json({ success: true, weakTopics });
  } catch (error) {
    return NextResponse.json({ success: false, message: error });
  }
}
