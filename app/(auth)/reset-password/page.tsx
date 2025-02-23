"use client";

import { useState } from "react";
import { ResetPasswordEnter } from "@/components/auth/reset/ResetPassEnter";
import { EnterOtpResetForm } from "@/components/auth/reset/EnterOtpReset";
import { EnterResetPassPhoneForm } from "@/components/auth/reset/EnterResetPassPhone";
import { EmailSentMessage } from "@/components/auth/reset/EmailSentMessage"; 

const ResetPasswordPage = () => {
  const [step, setStep] = useState(1);
  const [isPhoneNumber, setIsPhoneNumber] = useState(false);
  const [contactValue, setContactValue] = useState(""); // Stores email or phone

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        {/* Step 1: User enters email or phone */}
        {step === 1 && (
          <ResetPasswordEnter
            onSuccess={(value: string) => {
              setContactValue(value);
              setIsPhoneNumber(!value.includes("@")); // If no '@', it's a phone
              setStep(2);
            }}
          />
        )}

        {/* Step 2A: If phone number, enter OTP */}
        {step === 2 && isPhoneNumber && (
          <EnterOtpResetForm
            phonenumber={contactValue}
            onSuccess={() => setStep(3)}
          />
        )}

        {/* Step 2B: If email, just show confirmation message */}
        {step === 2 && !isPhoneNumber && <EmailSentMessage />}

        {/* Step 3: If phone number verified, reset password */}
        {step === 3 && isPhoneNumber && <EnterResetPassPhoneForm phonenumber={contactValue}/>}
      </div>
    </div>
  );
};

export default ResetPasswordPage;

