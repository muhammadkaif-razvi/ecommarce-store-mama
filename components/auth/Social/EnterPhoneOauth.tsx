"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { Step3Schema } from "@/schemas";
import { initiatePhoneVerificationStep } from "@/actions/sms";
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
import { useCurrentUser } from "@/hooks/use-current-user";
import { useSession } from "next-auth/react";

export const EnterPhoneNoOauthForm = ({
  onSuccess,
  email,
}: {
  email: string | null | undefined;
  onSuccess: (phonenumber: string) => void;
}) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();
  const user = useCurrentUser();
  const {update} = useSession();

  const form = useForm<z.infer<typeof Step3Schema>>({
    resolver: zodResolver(Step3Schema),
    defaultValues: {
      phonenumber: "",
      email: user?.email || undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof Step3Schema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      initiatePhoneVerificationStep(values, email as string).then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setSuccess(data.success);
          onSuccess(values.phonenumber);
          update();
        }
      });
    });
  };

  return (
    <AuthWrapper
      mainhead="WELCOME"
      headerLabel="Enter Phone Number to continue"
      BesiderHrefLabel="want to use another method or email click? "
      BackHref="/login"
      BackHrefLabel="here"
      src="/authimage.jpg"
      alt="Jungle Image"
      showContinueSeparator
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled
                    placeholder="abc@xyz.com"
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phonenumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="+911234567890"
                    type="tel"
                    onChange={(e) => {
                      let value = e.target.value;
                      if (!value.startsWith("+91")) {
                        value = "+91" + value.replace(/^(\+91)?/, ""); 
                      }
                      field.onChange(value);
                    }}
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
