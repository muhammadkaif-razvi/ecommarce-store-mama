"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { PhoneResetPassSchema } from "@/schemas";
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
import { resetOtpVerPhone } from "@/actions/resetOtpVerPhone";
import { useSession } from "next-auth/react";

export const EnterOtpResetForm = ({
  phonenumber,
  onSuccess,
}: {
  phonenumber: string;
  onSuccess: () => void;
}) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();
  const {update} = useSession();
  const form = useForm<z.infer<typeof PhoneResetPassSchema>>({
    resolver: zodResolver(PhoneResetPassSchema),
    defaultValues: {
      phonenumber,
      phonenumberotp: "",
    },
  });

  const onSubmit = (values: z.infer<typeof PhoneResetPassSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      resetOtpVerPhone(values).then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setSuccess(data.success);
          onSuccess();
          update();
        }
      });
    });
  };

  return (
    <AuthWrapper
      mainhead="WELCOME"
      headerLabel="Enter Code to reset password"
      BesiderHrefLabel="Back to login?"
      BackHref="/login"
      BackHrefLabel="Login"
      src="https://th.bing.com/th/id/R.3c1dd9a48beba7547417fb546fba5b8d?rik=9B0iVSi%2bYi9wRA&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2f0%2f7%2f3%2f820767-full-hd-nature-wallpapers-1920x1080-for-meizu.jpg&ehk=BGgL4g9sk2uysoCXn6sslXVXvfyXDH16ISeI2ZB475o%3d&risl=&pid=ImgRaw&r=0"
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
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
};
