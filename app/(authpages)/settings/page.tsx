"use client";

import { SettingsForm } from "@/components/auth/user/settingsForm";

const SettingsPage = () => {

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 ">
      {" "}
      <SettingsForm />
    </div>
  );
};

export default SettingsPage;
