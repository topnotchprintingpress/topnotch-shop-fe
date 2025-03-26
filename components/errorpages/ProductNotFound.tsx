import React from "react";
import Link from "next/link";
import { BookX, Home, ArrowLeft } from "lucide-react";

export default function ProductNotFound() {
  return (
    <div className="w-full min-h-screen bg-[#fcf4ec] flex flex-col justify-center items-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        {/* Icon */}
        <div className="w-20 h-20 bg-[#350203]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <BookX size={36} className="text-[#350203]" />
        </div>

        {/* Message */}
        <h2 className="text-2xl font-bold text-[#350203] mb-2">
          Product Not Found
        </h2>
        <p className="text-[#350203]/70 mb-8">
          We couldn{"'"}t find the book or product you were looking for. It may
          have been moved, discontinued, or is temporarily unavailable.
        </p>

        {/* Actions */}
        <div className="space-y-3">
          <Link
            href="/"
            className="w-full inline-flex items-center justify-center px-6 py-3 bg-[#350203] text-white rounded-lg hover:bg-[#4a1717] transition-colors gap-2"
          >
            <Home size={18} />
            <span>Return to Homepage</span>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="w-full inline-flex items-center justify-center px-6 py-3 text-[#350203]/70 hover:text-[#350203] transition-colors gap-2"
          >
            <ArrowLeft size={18} />
            <span>Go Back</span>
          </button>
        </div>
      </div>

      {/* Additional help text */}
      <p className="text-[#350203]/60 mt-8 text-sm text-center max-w-md">
        If you believe this is an error, please contact our customer support at
        <a
          href="mailto:admin@topnotchprintingpress.com"
          className="underline ml-1"
        >
          admin@topnotchprintingpress.comm
        </a>
      </p>
    </div>
  );
}
