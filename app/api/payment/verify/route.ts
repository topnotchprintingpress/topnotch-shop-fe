import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      console.error("Unauthorized");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { reference } = await req.json();

    if (!reference) {
      return NextResponse.json(
        { status: "error", message: "Reference missing" },
        { status: 400 }
      );
    }

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    if (!backendUrl) {
      return NextResponse.json(
        { status: "error", message: "Backend URL not set" },
        { status: 500 }
      );
    }

    // Call the backend to verify the payment
    const response = await fetch(
      `${backendUrl}process_payment/?reference=${reference}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access || token.acccessToken}`,
        },
        credentials: "include",
        body: JSON.stringify({ reference }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      return NextResponse.json({ status: "success", data });
    } else {
      return NextResponse.json(
        {
          status: "error",
          message: data.message || "Payment verification failed",
        },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
}
