import { signOut } from "next-auth/react";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useRouter } from "next/navigation";

function SignOut() {
  const router = useRouter();

  const handleSignOut = async () => {
    const clearCookies = () => {
      document.cookie.split(";").forEach((cookie) => {
        const [name] = cookie.split("=");
        document.cookie = `${name.trim()}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 UTC; Secure; SameSite=None; Domain=.topnotchprintingpress.com`;
      });
    };

    await signOut({ redirect: false });
    clearCookies();

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
