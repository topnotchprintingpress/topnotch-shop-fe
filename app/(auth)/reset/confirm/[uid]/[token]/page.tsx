"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Loader2, Eye, EyeOff, Check, AlertCircle } from "lucide-react";

export default function ResetPasswordConfirm() {
  const { uid, token } = useParams(); // Get dynamic route params
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setIsSuccess(false);
    setIsError(false);

    if (newPassword1 !== newPassword2) {
      setMessage("Passwords do not match.");
      setIsError(true);
      setIsLoading(false);
      return;
    }

    try {
      console.log("UID", uid);
      console.log("Token", token);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}reset/confirm/${uid}/${token}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            new_password1: newPassword1,
            new_password2: newPassword2,
            uid: uid,
            token: token,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "An error occurred.");
      }

      const data = await response.json();
      setMessage(data.detail || "Password reset successfully.");
      setIsSuccess(true);
    } catch (error) {
      setMessage((error as Error).message || "An error occurred.");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to check password strength
  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, text: "" };

    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);
    const isLongEnough = password.length >= 8;

    const criteria = [
      hasLowercase,
      hasUppercase,
      hasDigit,
      hasSpecial,
      isLongEnough,
    ];
    const metCriteria = criteria.filter(Boolean).length;

    if (metCriteria <= 2) return { strength: 1, text: "Weak" };
    if (metCriteria <= 4) return { strength: 2, text: "Medium" };
    return { strength: 3, text: "Strong" };
  };

  const passwordStrength = getPasswordStrength(newPassword1);

  return (
    <div className="flex items-center justify-center py-12 bg-[#fffcf7]">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-3xl border border-[#350203] shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Create New Password
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Please enter your new password below.
          </p>
        </div>

        {isSuccess ? (
          <div className="text-center space-y-6">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-[#ff8080]/50">
              <Check className="h-6 w-6 text-[#350203]" />
            </div>
            <div className="mt-3 text-center">
              <h3 className="text-lg font-medium text-gray-900">
                Password Reset Successful!
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">{message}</p>
              </div>
              <div className="mt-6">
                <a
                  href="/signin"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-3xl shadow-sm text-white bg-[#350203]  hover:bg-[#ff8080]/50 hover:border-[#350203] hover:text-[#350203] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Go to Login
                </a>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label
                htmlFor="new-password"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="new-password"
                  name="new-password"
                  type={showPassword1 ? "text" : "password"}
                  required
                  value={newPassword1}
                  onChange={(e) => setNewPassword1(e.target.value)}
                  className="appearance-none block w-full pr-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword1(!showPassword1)}
                >
                  {showPassword1 ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>

              {newPassword1 && (
                <div className="mt-2">
                  <div className="flex items-center mt-1">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          passwordStrength.strength === 1
                            ? "bg-red-500"
                            : passwordStrength.strength === 2
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                        style={{
                          width: `${(passwordStrength.strength / 3) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <span className="ml-2 text-xs text-gray-500">
                      {passwordStrength.text}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Password should be at least 8 characters with uppercase,
                    lowercase, numbers, and special characters.
                  </p>
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm New Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type={showPassword2 ? "text" : "password"}
                  required
                  value={newPassword2}
                  onChange={(e) => setNewPassword2(e.target.value)}
                  className={`appearance-none block w-full pr-10 px-3 py-2 border ${
                    newPassword2 && newPassword1 !== newPassword2
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm`}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword2(!showPassword2)}
                >
                  {showPassword2 ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {newPassword2 && newPassword1 !== newPassword2 && (
                <p className="mt-1 text-xs text-red-600">
                  Passwords do not match.
                </p>
              )}
            </div>

            {isError && (
              <div className="p-4 rounded-md bg-red-50 border border-red-200">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-red-400" />
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
                disabled={
                  isLoading ||
                  (newPassword2 !== "" && newPassword1 !== newPassword2)
                }
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-3xl shadow-sm text-sm font-medium text-white bg-[#350203] hover:bg-[#ff8080]/50 hover:text-[#350203] hover:border hover:border-[#350203] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    Resetting Password...
                  </>
                ) : (
                  "Reset Password"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
