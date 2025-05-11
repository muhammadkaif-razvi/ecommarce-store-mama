"use client";

import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { LoginForm } from "./LoginForm";
import { Button } from "../ui/button";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const LoginButton: React.FC<LoginButtonProps> = ({
  children,
  asChild,
  mode,
}) => {
  const router = useRouter();

  const onclick = () => {
    router.push("/auth/login");
  }
  if (mode === "modal") {
    return (
      <Dialog>
        <DialogTrigger asChild={asChild} className="w-full bg-blue-400 rounded-sm py-2 font-sans" >
        {children}
        </DialogTrigger>
        <DialogHeader><DialogTitle></DialogTitle></DialogHeader>
        <DialogContent className="p-0 w-auto bg-transparent border-none">
          <LoginForm />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <span onClick={onclick} className="cursor-pointer">{children}</span>
  )
}
