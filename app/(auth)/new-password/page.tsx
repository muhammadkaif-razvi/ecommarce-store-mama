import { EmailResetPassForm } from "@/components/auth/reset/EmailResetPass";
import React from "react";

const NewPasswordPage = () => {
  return (
    <div className="w-full max-w-sm md:max-w-3xl">
      <EmailResetPassForm />{" "}
    </div>
  );
};

export default NewPasswordPage;
