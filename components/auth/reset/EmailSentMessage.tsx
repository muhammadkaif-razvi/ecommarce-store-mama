"use client";

import Image from "next/image";
import { AuthWrapper } from "@/components/auth/AuthWrapper";
export const EmailSentMessage = () => {
  return (
    <AuthWrapper
      mainhead="WELCOME"
      headerLabel=""
      BesiderHrefLabel="Back to login?"
      BackHref="/login"
      BackHrefLabel="Login"
      src="/authimage.jpg"
      alt="Jungle Image"
    >
      <div className="text-center space-y-4">
        <Image
          src="https://static.vecteezy.com/system/resources/previews/013/322/381/original/send-email-icon-send-message-icon-vector.jpg"
          alt="Email Sent"
          width={200} // Adjust size as needed
          height={200}
          className="mx-auto" // Centers the image
        />
        <p className="text-lg font-semibold text-gray-700">
          A password reset link has been sent to your email.
        </p>
      </div>
    </AuthWrapper>
  );
};
