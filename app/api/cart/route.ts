import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/`, {
      method: "GET",
      headers: {
        Authorization: token?.access ? `Bearer ${token.access}` : "",
      },
      credentials: "include",
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch cart" },
        { status: response.status }
      );
    }

    const data = await response.json(); // Ensure response is valid JSON
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
