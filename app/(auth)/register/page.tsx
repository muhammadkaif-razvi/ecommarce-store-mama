"use client";
import { EnterEmailForm } from "@/components/auth/register/EnterEmailForm";
import { VerEmailOtpForm } from "@/components/auth/register/VerEmailOtpForm";
import { EnterPhoneNoForm } from "@/components/auth/register/EnterPhoneNoForm";
import { useState } from "react";
import { VerPhoneOtpForm } from "@/components/auth/register/VerPhoneOtpForm";
import { EnterPassComReg } from "@/components/auth/register/EnterPassComReg";


export default function RegisterPage() {
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [phonenumber, setPhonenumber] = useState<string | null>(null);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        {!email ? (
          <EnterEmailForm
            onSuccess={(submittedEmail, phoneNotVerified) => {
              setEmail(submittedEmail);
              if (phoneNotVerified) {
                setIsEmailVerified(true);
              }
            }}
          />
        ) : !isEmailVerified ? (
          <VerEmailOtpForm email={email} onSuccess={() => setIsEmailVerified(true)} />
        ) : !phonenumber ? (
          <EnterPhoneNoForm  email={email} onSuccess={(submittedPhone) => setPhonenumber(submittedPhone)} />
        ) : !isPhoneVerified ? (
          <VerPhoneOtpForm
            phonenumber={phonenumber}
            onSuccess={() => setIsPhoneVerified(true)}
          />
        ) : (
          <EnterPassComReg name={name!} email={email!} phonenumber={phonenumber!}/>
        )}
      </div>
    </div>
  );
};
