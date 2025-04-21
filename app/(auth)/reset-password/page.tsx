"use client";

import { useState } from "react";
import { ResetPasswordEnter } from "@/components/auth/reset/ResetPassEnter";
import { EnterOtpResetForm } from "@/components/auth/reset/EnterOtpReset";
import { EnterResetPassPhoneForm } from "@/components/auth/reset/EnterResetPassPhone";
import { EmailSentMessage } from "@/components/auth/reset/EmailSentMessage";

const ResetPasswordPage = () => {
  const [step, setStep] = useState(1);
  const [isPhoneNumber, setIsPhoneNumber] = useState(false);
  const [contactValue, setContactValue] = useState("");
  const [otp, setOtp] = useState<string | null>(null);

  return (
    <div className="flex lg:min-h-[92vh] min-h-[100vh] md:min-h-[96vh] lg:mt-14 mt-11 bg-blue-50 dark:bg-gray-900 flex-col items-center justify-center  p-6 md:p-10"  style={{
      backgroundImage: 'url(/Vector.png), url(/Vector-2.png)',
      backgroundSize: 'auto, auto', // Keep original sizes (or set custom, e.g., '200px, 300px')
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'left 10% top -20%, right 10% bottom -10%', // Adjust % for positioning
      width: '100vw',
    }}
  >
      <div className="w-full max-w-sm md:max-w-3xl">
        {/* Step 1: User enters email or phone */}
        {step === 1 && (
          <ResetPasswordEnter
            onSuccess={(value: string, otp: string) => {
              setContactValue(value);
              setIsPhoneNumber(!value.includes("@"));

              if (!value.includes("@")) setOtp(otp);

              setStep(2);
            }}
          />
        )}

        {/* Step 2A: If phone number, enter OTP */}
        {step === 2 && isPhoneNumber && (
          <EnterOtpResetForm
            phonenumber={contactValue}
            otp={otp ?? ""}
            onSuccess={() => setStep(3)}
          />
        )}

        {/* Step 2B: If email, just show confirmation message */}
        {step === 2 && !isPhoneNumber && <EmailSentMessage />}

        {/* Step 3: If phone number verified, reset password */}
        {step === 3 && isPhoneNumber && (
          <EnterResetPassPhoneForm phonenumber={contactValue} />
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
