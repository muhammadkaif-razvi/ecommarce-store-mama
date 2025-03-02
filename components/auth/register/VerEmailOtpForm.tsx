"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { Step2Schema } from "@/schemas";
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
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { verifyEmailOTPStep } from "@/actions/verifyemail";

export const VerEmailOtpForm = ({ 
  email, 
  onSuccess,
  onReset, // Add onReset prop
}: { 
  email: string; 
  onSuccess: () => void;
  onReset: () => void; // Reset function
}) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof Step2Schema>>({
    resolver: zodResolver(Step2Schema),
    defaultValues: {
      email,
      otp: "",
    },
  });

  const onSubmit = (values: z.infer<typeof Step2Schema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      verifyEmailOTPStep(values).then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setSuccess(data.success);
          onSuccess();
        }
      });
    });
  };

  return (
    <AuthWrapper
      mainhead="WELCOME"
      headerLabel="Enter Code"
      BesiderHrefLabel="Already have an account?"
      BackHref="/login"
      BackHrefLabel="Login"
      src="/authimage.jpg"
      alt="Jungle Image"
      showContinueSeparator
      continueLabel=" Or Continue With"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4">
          <FormField
            control={form.control}
            name="otp"
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
          {success && <FormSuccess message={success} />}
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Verifying...." : "Verify"}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={onReset} // Reset the state
          >
            Start Over
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
};