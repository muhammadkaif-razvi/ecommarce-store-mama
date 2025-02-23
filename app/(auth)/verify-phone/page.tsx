"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { EnterPhoneNoOauthForm } from "@/components/auth/Social/EnterPhoneOauth";
import { VerPhoneOtpOauthForm } from "@/components/auth/Social/VerPhoneOtpOauht";

const VerifyPhonePage = () => {
  const user = useCurrentUser();
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);

  useEffect(() => {
    if (user?.phoneNumberVerified) {
      router.push("/settings");
    }
  }, [user?.phoneNumberVerified, router]);



  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        {phoneNumber ? (
          // Show OTP verification form after phone number is entered
          <VerPhoneOtpOauthForm
            phonenumber={phoneNumber}
            onSuccess={() => ""} // Redirect after success
          />
        ) : (
          // Show phone number input form first
          <EnterPhoneNoOauthForm
            email={user?.email ?? ""}
            onSuccess={(phonenumber) => setPhoneNumber(phonenumber)}
          />
        )}
      </div>
    </div>
  );
};

export default VerifyPhonePage;

