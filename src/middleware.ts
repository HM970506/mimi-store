//모든 api, page request전에 실행됨.
//matcher가 있으면 그 어레이 안의 url에서만 실행됨.
//기존에 알고있던 middleware와 똑같다~

import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const now = request.nextUrl.pathname;
  let isPublicRoute = false;
  if (now === "/auth/login" || now === "/auth/register") isPublicRoute = true;

  const token = request.cookies.get("token")?.value;
  console.log(now, token, isPublicRoute);
  if (!token && !isPublicRoute)
    return NextResponse.redirect(new URL("/auth/login", request.url));

  return NextResponse.next(); //나머지 프로세스가 진행된다는 뜻
}

export const config = {
  matcher: ["/auth/login", "/auth/register", "/"],
};
