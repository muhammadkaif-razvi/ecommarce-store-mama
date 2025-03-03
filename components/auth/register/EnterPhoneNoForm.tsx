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

export const EnterPhoneNoForm = ({
  onSuccess,
  email,
  onReset,
}: {
  email: string;
  onSuccess: (phonenumber: string) => void;
  onReset: () => void;

}) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof Step3Schema>>({
    resolver: zodResolver(Step3Schema),
    defaultValues: {
      email,
      phonenumber: "",
    },
  });

  const onSubmit = (values: z.infer<typeof Step3Schema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      initiatePhoneVerificationStep(values, email)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setSuccess(data.success);
            onSuccess(values.phonenumber);
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
      headerLabel="Register to continue"
      BesiderHrefLabel="Already have an account?"
      BackHref="/login"
      BackHrefLabel="Login"
      src="/authimage.jpg"
      alt="Jungle Image"
      showContinueSeparator
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                      let value = e.target.value.replace(/\D/g, "");
                      if (value.startsWith("91")) value = "+" + value;
                      if (!value.startsWith("+91")) value = "+91" + value;
                      value = value.slice(0, 13);
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
          <Button
            type="submit"
            className="w-full"
            disabled={isPending || !form.formState.isValid}
          >
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Enter"}
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
