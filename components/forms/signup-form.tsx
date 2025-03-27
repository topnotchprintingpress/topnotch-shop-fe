"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterInput } from "@/lib/schemas";
import PendingSubmitButton from "../buttons/PendingSubmitButton";
import GoogleSignInButton from "../buttons/Googlebtn";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: RegisterInput) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/registration/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
          credentials: "include",
        }
      );

      const result = await response.json();

      if (response.ok) {
        router.push("/signin");
      } else {
        alert(result?.detail || "Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during registration");
    }
  };

  return (
    <div className="w-full max-w-md bg-white shadow dark:border sm:max-w-md p-8 md:p-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700 border border-[#2b0909] rounded-2xl">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Create an account
        </h1>
        <form
          className="space-y-4 md:space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-3">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Username *
            </label>
            <input
              {...register("username")}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {errors.username && (
              <p className="text-red-500">{errors.username.message}</p>
            )}
          </div>
          <div>
            <label>Email *</label>
            <input
              {...register("email")}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label>Password</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                id="password1"
                type={showPassword1 ? "text" : "password"}
                {...register("password1")}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            {errors.password1 && (
              <p className="text-red-500">{errors.password1.message}</p>
            )}
          </div>
          <div>
            <label>Confirm Password</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type={showPassword2 ? "text" : "password"}
                {...register("password2")}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            {errors.password2 && (
              <p className="text-red-500">{errors.password2.message}</p>
            )}
          </div>
          <PendingSubmitButton />
          {/* {serverError && <p className="text-red-700">{serverError}</p>} */}
        </form>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-2 text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <div className="space-y-4">
          <GoogleSignInButton />
        </div>

        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Already have an account?&nbsp;
          <a
            href="/signin"
            className="font-medium text-[#261b72] hover:underline"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
