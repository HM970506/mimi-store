import { connectDB } from "@/configs/dbConfigs";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const userExists = await User.findOne({ email: reqBody.email });
    if (userExists) throw new Error("존재하는 계정입니다");

    //pw 암호화
    const salt = await bcrypt.genSalt(10);
    const hashedPw = await bcrypt.hash(reqBody.password, salt);
    reqBody.password = hashedPw;

    const newUser = new User(reqBody);
    await newUser.save();

    return NextResponse.json({ message: "유저 생성 완료", data: newUser });
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 404 });
  }
}
