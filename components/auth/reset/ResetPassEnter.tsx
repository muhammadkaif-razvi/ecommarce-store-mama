"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { ResetPasswordEnterSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Loader2 } from "lucide-react";
import { AuthWrapper } from "@/components/auth/AuthWrapper";
import { resetPasswordEnter } from "@/actions/reset-pass-enter";

export const ResetPasswordEnter = ({
  onSuccess,
}: {
  onSuccess: (value: string, otp: string) => void;
}) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ResetPasswordEnterSchema>>({
    resolver: zodResolver(ResetPasswordEnterSchema),
    defaultValues: {
      emailOrPhone: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetPasswordEnterSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      resetPasswordEnter(values)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }
          if (data?.success) {
            form.reset();
            setSuccess(data.success);
            onSuccess(values.emailOrPhone, data.otp ?? "");
          }
        })
        .catch(() => {
          setError("Something went wrong!");
        });
    });
  };

  return (
    <AuthWrapper
      mainhead="WELCOME"
      headerLabel="Enter details to reset password"
      BesiderHrefLabel="Back to login?"
      BackHref="/login"
      BackHrefLabel="Login"
      src="/authimage.jpg"
      alt="Jungle Image"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="emailOrPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email or Phone</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="abc@ex.com or +911234567890"
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-100 " disabled={isPending}>
            {isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Reset Password"
            )}{" "}
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
};
