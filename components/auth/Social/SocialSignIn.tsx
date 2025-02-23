import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export const SocialSignIn = () => {
  const handleSignIn = (provider: "github" | "google") => {
  signIn(provider, { callbackUrl: "/verify-phone" });
};

  return (
    <div className="grid grid-cols-2 gap-4">
      <Button variant="outline" className="w-full" onClick={() => handleSignIn("github")}>
        <FaGithub />
        <span className="sr-only">Continue with GitHub</span>
      </Button>
      <Button variant="outline" className="w-full" onClick={() => handleSignIn("google")}>
        <FcGoogle />
        <span className="sr-only">Continue with Google</span>
      </Button>
    </div>
  );
};
