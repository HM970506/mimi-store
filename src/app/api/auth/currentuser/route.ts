import { connectDB } from "@/configs/dbConfigs";
import { validateJWT } from "@/helpers/validateJWT";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
connectDB();
export async function GET(request: NextRequest) {
  try {
    const userId = await validateJWT(request);
    //findone하고 findbyid의 차이점이 뭐지?
    const user = await User.findById(userId).select("-password"); //pw는 제외하고 받는다는 옵션

    return NextResponse.json({ data: user });
  } catch (e: any) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}
