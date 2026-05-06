import { NextResponse } from "next/server";

const ADMIN_EMAIL = "admin@pnm.ac.id";
const ADMIN_PASSWORD = "admin123";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return NextResponse.json({ message: "Email atau password salah." }, { status: 401 });
  }

  const response = NextResponse.json({ message: "Login berhasil." });
  response.cookies.set("admin_session", "authenticated", {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 8, // 8 jam
  });

  return response;
}