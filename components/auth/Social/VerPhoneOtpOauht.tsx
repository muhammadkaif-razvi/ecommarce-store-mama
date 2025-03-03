"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
import { Step4Schema } from "@/schemas";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormError } from "@/components/auth/form-error";
import FormSuccess from "@/components/auth/form-success";
import { AuthWrapper } from "@/components/auth/AuthWrapper";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { verifyPhoneOTPStep } from "@/actions/verifysms";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export const VerPhoneOtpOauthForm = ({
  phonenumber,
  otp,
  onSuccess,
}: {
  phonenumber: string;
  otp : string;
  onSuccess: () => void;
}) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();
  const { update } = useSession();

  useEffect(() => {
    const loginButton = document.querySelector('a[href="/verify-phone"]'); 
    if (loginButton) {
      loginButton.addEventListener("click", () => {
        signOut();
      });
    }
  }, []);

  const form = useForm<z.infer<typeof Step4Schema>>({
    resolver: zodResolver(Step4Schema),
    defaultValues: {
      phonenumber,
      phonenumberotp: "",
    },
  });

  const onSubmit = (values: z.infer<typeof Step4Schema>) => {
    setError("");
    setSuccess(otp);
    startTransition(() => {
      verifyPhoneOTPStep(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setSuccess(data.success);
            onSuccess();
          }
        })
        .then(() => {
          update();
        });
    });
  };

  return (
    <AuthWrapper
      mainhead="WELCOME"
      headerLabel="Enter Code to continue"
      BesiderHrefLabel="want to use another method or email click? "
      BackHref="/login"
      BackHrefLabel="here"
      src="/authimage.jpg"
      alt="Jungle Image"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4">
          <FormField
            control={form.control}
            name="phonenumberotp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email OTP</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} disabled={isPending} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Verifying...." : "Verify"}
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
};
