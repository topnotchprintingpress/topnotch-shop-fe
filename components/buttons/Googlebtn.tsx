"use client";

import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

export default function GoogleSignInButton() {
  return (
    <button
      className="bg-white flex justify-center text-xs md:text-base items-center gap-4 border border-zinc-300 hover:bg-[#3502033b] hover:text-[#350203] px-4 md:px-8 py-2 rounded-2xl w-full text-zinc-700"
      onClick={() => signIn("google", { callbackUrl: "/" })}
    >
      <span className="text-red-700 mr-2">
        <FcGoogle size={30} />
      </span>
      Sign in with Google
    </button>
  );
}
