import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function POST(req: NextRequest) {
  try {
    // Authenticate user
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      console.error("Unauthorized");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse request body
    const body = await req.json();

    // Forward request to the backend API
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/cart-items/`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access}`,
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    // Return response from the backend API
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
