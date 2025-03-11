"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const router = useRouter();
  const reference = searchParams.get("reference");

  const [isVerifying, setIsVerifying] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState<
    "success" | "failed" | null
  >(null);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        if (reference) {
          const paymentResponse = await fetch("/api/payment/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session?.access}`,
            },
            body: JSON.stringify({ reference }),
          });

          const data = await paymentResponse.json();
          if (data.status === "success") {
            setVerificationStatus("success");
          } else {
            setVerificationStatus("failed");
          }
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
        setVerificationStatus("failed");
      } finally {
        setIsVerifying(false);
      }
    };

    verifyPayment();
  }, [reference, router]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 text-center">
        {isVerifying ? (
          <div className="text-gray-600">Verifying payment...</div>
        ) : verificationStatus === "success" ? (
          <>
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <CheckCircle className="w-16 h-16 text-[#2b0909]" />
            </div>

            {/* Success Message */}
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Payment Successful!
            </h1>
            <p className="text-gray-600 mb-6">
              Thank you for your purchase. Your order has been confirmed.
            </p>

            {/* Order Details */}
            <div className="bg-gray-50 rounded-md p-4 mb-6">
              <h2 className="text-lg font-medium text-gray-800 mb-2">
                Order Summary
              </h2>
              <div className="flex justify-between text-gray-600 mb-1">
                <span>Order Reference:</span>
                <span className="font-medium">{reference}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>A confirmation email has been sent to:</span>
              </div>
              <div className="text-gray-800 font-medium mt-1">
                {session?.user?.email || "your email"}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link
                href="/account/orders"
                className="block w-full py-2 px-4 bg-[#2b0909] hover:bg-[#2b0909cc] text-white font-medium rounded-md transition duration-200"
              >
                View Order Details
              </Link>
              <Link
                href="/products"
                className="block w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md transition duration-200"
              >
                Continue Shopping
              </Link>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-red-600 mb-2">
              Payment Verification Failed
            </h1>
            <p className="text-gray-600 mb-6">
              We couldn{"'"}t verify your payment. If you were charged, please
              contact support.
            </p>

            <Link
              href="/support"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Contact our support team
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
