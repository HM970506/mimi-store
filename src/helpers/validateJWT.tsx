//쿠키에 저장된 토큰값 decode하는 함수

import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const validateJWT = async (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) throw new Error("토큰이 없습니다");

    const decryptedToken: any = jwt.verify(token, process.env.jwt_secret!);

    return decryptedToken.id;
  } catch (e: any) {
    throw new Error(e.message);
  }
};
