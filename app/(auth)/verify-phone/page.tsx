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
      router.push("/platform-setup");
    }
  }, [user?.phoneNumberVerified, router]);

  useEffect(() => {
    if (!user?.isOAuth) {
      router.push("/login");
    }
  }, [user?.isOAuth, router]);

  return (
    <div className="flex lg:min-h-[92vh] min-h-[100vh] md:min-h-[96vh] lg:mt-14 mt-11 bg-blue-50  flex-col items-center justify-center dark:bg-gray-900 p-6 md:p-10"  style={{
      backgroundImage: 'url(/Vector.png), url(/Vector-2.png)',
      backgroundSize: 'auto, auto', // Keep original sizes (or set custom, e.g., '200px, 300px')
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'left 10% top -20%, right 10% bottom -10%', // Adjust % for positioning
      width: '100vw',
    }}
  >
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
    </div>
  );
};

export default VerifyPhonePage;
