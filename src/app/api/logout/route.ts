import { NextResponse } from "next/server";
import { setCookie } from "cookies-next";

export async function POST() {
  try {
    setCookie("token", "", {
      httpOnly: true,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: "Error logging out" });
  }
}
