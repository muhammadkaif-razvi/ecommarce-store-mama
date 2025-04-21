"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { Step5Schema } from "@/schemas";
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
import { completeRegistration } from "@/actions/compregister";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export const EnterPassComReg = ({
  email,
  phonenumber,
  onComplete,
}: {
  email: string;
  phonenumber: string;
  onComplete: () => void;
}) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();
  const { update } = useSession();
  const router = useRouter();

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const form = useForm<z.infer<typeof Step5Schema>>({
    resolver: zodResolver(Step5Schema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof Step5Schema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      completeRegistration(values, email, phonenumber, callbackUrl).then(
        (data) => {
          if (data?.error) {
            setError(data.error);
          } else if (data?.success) {
            setSuccess(data.success);
            update();
            router.refresh();
            onComplete();
          }
        }
      );
    });
  };

  return (
    <AuthWrapper
      mainhead="WELCOME"
      headerLabel="Enter your password to complete registration"
      BesiderHrefLabel="Already have an account?"
      BackHref="/login"
      BackHrefLabel="Login"
      src="/authimage.jpg"
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
                    placeholder="Your password"
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
                    placeholder="Confirm your password"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-100 " disabled={isPending}>
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Enter"}
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
};
