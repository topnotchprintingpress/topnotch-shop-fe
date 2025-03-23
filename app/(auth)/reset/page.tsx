"use client";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { FaCircleCheck } from "react-icons/fa6";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setIsSuccess(false);
    setIsError(false);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/password/reset/`,
        {
          method: "POST",
          body: JSON.stringify({
            email,
          }),
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "An error occurred");
      }

      const data = await response.json();
      setMessage(data.detail || "Password reset email sent");
      setIsSuccess(true);
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message || "An error occurred");
      } else {
        setMessage("An error occurred");
      }
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-12 bg-[#fffcf7]">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-3xl shadow-md border border-[#350203]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Reset Password</h1>
          <p className="mt-2 text-sm text-gray-600">
            Enter your email address below and we{"'"}ll send you a link to
            reset your password.
          </p>
        </div>

        {isSuccess ? (
          <div className="p-4 rounded-md bg-[#350203]/50 border border-green-200">
            <div className="flex justify-center items-center">
              <div className="flex-shrink-0">
                <FaCircleCheck className="text-white" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">{message}</p>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#350203] focus:border-[#350203] sm:text-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {isError && (
              <div className="p-4 rounded-md bg-red-50 border border-red-200">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-red-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-red-800">
                      {message}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-3xl shadow-sm text-sm font-medium text-white bg-[#350203] hover:bg-[#ff8080]/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#350203] disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    Sending...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </div>
          </form>
        )}

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Remember your password?
              </span>
            </div>
          </div>
          <div className="mt-6 text-center">
            <a
              href="/login"
              className="font-medium text-[#350203] hover:text-blue-500"
            >
              Back to login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
