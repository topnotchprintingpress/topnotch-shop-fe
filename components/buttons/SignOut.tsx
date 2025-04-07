import { signOut } from "next-auth/react";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useRouter } from "next/navigation";

function SignOut() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    document.cookie =
      "__Secure-next-auth.session-token=; Max-Age=0; path=/; domain=.topnotchprintingpress.com; secure; SameSite=Lax";
    document.cookie =
      "__Secure-next-auth.csrf-token=; Max-Age=0; path=/; domain=.topnotchprintingpress.com; secure; SameSite=Lax";

    router.push("/signin");
    setTimeout(() => {
      window.location.reload();
    }, 100);
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
