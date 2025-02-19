"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import RegisterForm from "../forms/signup-form";

export default function Register() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if JWT token exists in localStorage or cookies
    const token = localStorage.getItem("jwtToken");

    if (token) {
      // Optionally, you can add logic to validate the token (check expiration or decode)
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <section className="flex mx-auto justify-center items-center">
      <div className="flex flex-col items-center justify-center mx-auto lg:py-6">
        <div className="mx-auto my-2 p-8 md:p-0 max-w-lg rounded-sm">
          <h2 className="text-center text-2xl text-[#350203] mb-8 font-bold">
            Sign Up
          </h2>
          {isAuthenticated ? (
            <p className="text-center">You are already signed in.</p>
          ) : (
            <div>
              <p className="mb-4 text-center md:text-base">
                Sign up for a new account or{" "}
                <Link href="/signin" className="underline">
                  sign in
                </Link>{" "}
                when you already have an account.
              </p>
              <div>
                <RegisterForm />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
