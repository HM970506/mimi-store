import { connectDB } from "@/configs/dbConfigs";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import Category from "@/models/categoryModel";
import { validateJWT } from "@/helpers/validateJWT";

connectDB();

export async function POST(request: NextRequest) {
  try {
    //운영자 요청인지 확인
    const userId = await validateJWT(request);
    const categories = await Category.find();

    return NextResponse.json({ data: categories });
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 404 });
  }
}
