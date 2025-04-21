import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useSearchParams } from "next/navigation";

export const SocialSignIn = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const handleSignIn = (provider: "github" | "google") => {
    const redirectUrl = callbackUrl ? callbackUrl : "/verify-phone";
    signIn(provider, { callbackUrl: redirectUrl });
  };

  return (
    <div className="flex justify-center items-center gap-4">
    <button
      className="w-10 h-10 rounded-full flex items-center justify-center bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
      onClick={() => handleSignIn("github")}
      aria-label="Sign in with GitHub"
    >
      <FaGithub className="text-gray-800 text-xl" />
    </button>
    
    <button
      className="w-10 h-10 rounded-full flex items-center justify-center bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
      onClick={() => handleSignIn("google")}
      aria-label="Sign in with Google"
    >
      <FcGoogle className="text-xl" />
    </button>
  </div>
  );
};
