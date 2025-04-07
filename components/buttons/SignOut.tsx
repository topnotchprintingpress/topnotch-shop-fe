import { signOut } from "next-auth/react";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useRouter } from "next/router";

function SignOut() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });

    router.push("/signin");
  };

  return (
    <button
      className="text-[#350203] flex gap-3 justify-center items-center"
      onClick={handleSignOut}
    >
      <RiLogoutCircleRLine size={20} />
      Sign Out
    </button>
  );
}

export default SignOut;
