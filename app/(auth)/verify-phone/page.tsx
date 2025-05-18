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
  const [otp, setOtp] = useState<string | null>(null);

  useEffect(() => {
    if (user?.phoneNumberVerified) {
      router.push("/cart");
    }
  }, [user?.phoneNumberVerified, router]);

  useEffect(() => {
    if (!user?.isOAuth) {
      router.push("/login");
    }
  }, [user?.isOAuth, router]);

  return (
  
      <div className="w-full max-w-sm md:max-w-3xl">
        {phoneNumber ? (
          <VerPhoneOtpOauthForm
            phonenumber={phoneNumber}
            onSuccess={() => {}}
            otp={otp ?? ""}
          />
        ) : (
          <EnterPhoneNoOauthForm
            email={user?.email ?? ""}
            onSuccess={(phonenumber, otp) => {
              setPhoneNumber(phonenumber);
              setOtp(otp);
            }}
          />
        )}
      </div>
   
  );
};

export default VerifyPhonePage;
