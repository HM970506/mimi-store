import { connectDB } from "@/configs/dbConfigs";

import { NextRequest, NextResponse } from "next/server";

import { validateJWT } from "@/helpers/validateJWT";
import Product from "@/models/productModel";

connectDB();

export async function POST(request: NextRequest) {
  try {
    //운영자 요청인지 확인
    const userId = await validateJWT(request);
    const products = await Product.find();

    return NextResponse.json({ data: products });
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 404 });
  }
}
