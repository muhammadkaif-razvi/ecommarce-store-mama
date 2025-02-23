"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewPasswordSchema } from "@/schemas";
import Image from "next/image"
import { AuthWrapper } from "@/components/auth/AuthWrapper";
export const EmailSentMessage = () => {





  return (
    <AuthWrapper
      mainhead="WELCOME"
      headerLabel=""
      BesiderHrefLabel="Back to login?"
      BackHref="/login"
      BackHrefLabel="Login"
      src="https://th.bing.com/th/id/R.3c1dd9a48beba7547417fb546fba5b8d?rik=9B0iVSi%2bYi9wRA&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2f0%2f7%2f3%2f820767-full-hd-nature-wallpapers-1920x1080-for-meizu.jpg&ehk=BGgL4g9sk2uysoCXn6sslXVXvfyXDH16ISeI2ZB475o%3d&risl=&pid=ImgRaw&r=0"
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
