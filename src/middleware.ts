import axios, { AxiosResponse } from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

interface sessionData {
  isLogged: boolean;
}

export default async function middleware(req: NextRequest) {
  const token = cookies().get("refreshToken")?.value ?? "";
  let session: boolean | undefined;

  try {
    const { data }: AxiosResponse<sessionData> = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logged`,
      {
        refreshToken: token,
      }
    );

    session = data.isLogged;
  } catch (error) {
    console.error("User isn't authorized", error);
  }

  const isLoginPage = req.nextUrl.pathname === "/login";

  if (!session && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (session && isLoginPage) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/"],
};
