import { connectDB } from "@/configs/dbConfigs";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const user = await User.findOne({ email: reqBody.email });
    if (!user) throw new Error("존재하지 않는 계정입니다");

    //pw 비교
    const pwMatch = await bcrypt.compare(reqBody.password, user.password);
    if (!pwMatch) throw new Error("비밀번호가 틀립니다");

    //로그인 토큰 생성
    //로컬 스토리지에 저장시 api 호출마다 수동 첨부해야 하지만, 쿠키는 브라우저가 자동으로 첨부해서 보낸다!
    const token = jwt.sign({ id: user._id }, process.env.jwt_secret!, {
      algorithm: "none",
    });

    const response = NextResponse.json({ message: "로그인 성공" });
    response.cookies.set("token", token, { httpOnly: true, path: "/" });

    return response;
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 404 });
  }
}
