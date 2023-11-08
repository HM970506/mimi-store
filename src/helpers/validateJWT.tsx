//쿠키에 저장된 토큰값 decode하는 함수

import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const validateJWT = async (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token)
      return NextResponse.redirect(new URL("/auth/login", request.url));

    const decryptedToken: any = jwt.verify(
      token,
      process.env.NEXT_PUBLIC_jwt_secret!
    );

    return decryptedToken.id;
  } catch (e: any) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
};
