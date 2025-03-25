"use client"; // Mark as a client component

import { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Wait for session to load

    // Check for session errors
    if (session?.error) {
      console.warn("Session error detected:", session.error);
      signOut({ callbackUrl: "/signin" }); // Log the user out
    }

    if (!session) {
      router.push("/signin");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <Loading />;
  }

  return <>{children}</>;
};

export default AuthWrapper;
