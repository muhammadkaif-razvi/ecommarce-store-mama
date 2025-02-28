"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { NewPasswordSchema } from "@/schemas";
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
import { useSearchParams } from "next/navigation";
import { newPassword } from "@/actions/new-password";
import { useSession } from "next-auth/react";
export const EmailResetPassForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();
  const { update } = useSession();

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      newPassword(values, token)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
          } else if (data?.success) {
            setSuccess(data.success);
            update();
          }
        })
      
    });
  };

  return (
    <AuthWrapper
      mainhead="WELCOME"
      headerLabel="Enter your new password"
      BesiderHrefLabel="Back to login?"
      BackHref="/login"
      BackHrefLabel="Login"
      src="https://th.bing.com/th/id/R.3c1dd9a48beba7547417fb546fba5b8d?rik=9B0iVSi%2bYi9wRA&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2f0%2f7%2f3%2f820767-full-hd-nature-wallpapers-1920x1080-for-meizu.jpg&ehk=BGgL4g9sk2uysoCXn6sslXVXvfyXDH16ISeI2ZB475o%3d&risl=&pid=ImgRaw&r=0"
      alt="Jungle Image"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="********"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="********"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Enter"}
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
};
