import WeakTopic from "@/models/weakTopicModel";
import {NextRequest, NextResponse} from "next/server";
import {getDataFromToken} from "@/lib/getDataFromToken";

export async function GET(request: NextRequest) {
  try {

    const data = getDataFromToken(request) as {
      id: string;
    }

    if (!data) {
      return NextResponse.json({ success: false, message: "User not found" });
    }

    const weakTopics = await WeakTopic.find({ createdBy: data.id });
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
