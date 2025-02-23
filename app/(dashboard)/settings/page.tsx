"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { signOut } from "next-auth/react";

const SettingsPage = () => {
  const user = useCurrentUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(false);
      if (!user.phoneNumberVerified) {
        router.push("/verify-phone");
      }
    }
  }, [user, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">User Settings</h2>

      <div className="space-y-2">
        <p className="text-gray-600">
          <strong>Email:</strong> {user?.email || "N/A"}
        </p>
        <p className="text-gray-600">
          <strong>Phone:</strong> {user?.phonenumber || "N/A"}
        </p>
        <p className="text-gray-600">
          <strong>Role:</strong> {user?.role || "N/A"}
        </p>
        <p className="text-gray-600">
          <strong>User ID:</strong> {user?.id || "N/A"}
        </p>
    
      </div>

      <Button
        onClick={() => signOut()}
        className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white"
      >
        Logout
      </Button>
    </div>
  );
};

export default SettingsPage;
