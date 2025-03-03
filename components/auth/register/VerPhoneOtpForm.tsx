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

export const VerPhoneOtpForm = ({
  phonenumber,
  otp,
  onSuccess,
  onReset,
}: {
  phonenumber: string;
  otp: string;
  onSuccess: () => void;
  onReset: () => void;
}) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setSuccess(`Your OTP: ${otp}`);
  }, [otp]);


  const form = useForm<z.infer<typeof Step4Schema>>({
    resolver: zodResolver(Step4Schema),
    defaultValues: {
      phonenumber,
      phonenumberotp: "",
    },
  });

  const onSubmit = (values: z.infer<typeof Step4Schema>) => {
    setError("");
    setSuccess(`Your OTP: ${otp}`);
    startTransition(() => {
      verifyPhoneOTPStep(values).then((data) => {
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
      headerLabel="Enter Code to continue"
      BesiderHrefLabel="Already have an account?"
      BackHref="/login"
      BackHrefLabel="Login"
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
                <FormLabel>Phone OTP</FormLabel>
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
          </Button>{" "}
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
