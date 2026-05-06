import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const response = NextResponse.redirect(new URL("/admin", req.url));
  response.cookies.delete("admin_session");
  return response;
}