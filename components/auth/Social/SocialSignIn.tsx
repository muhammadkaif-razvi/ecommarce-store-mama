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
    <div className="grid grid-cols-2 gap-4">
      <Button
        variant="outline"
        className="w-full"
        onClick={() => handleSignIn("github")}
      >
        <FaGithub />
        <span className="sr-only">Continue with GitHub</span>
      </Button>
      <Button
        variant="outline"
        className="w-full"
        onClick={() => handleSignIn("google")}
      >
        <FcGoogle />
        <span className="sr-only">Continue with Google</span>
      </Button>
    </div>
  );
};
