"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md shadow-xl border border-gray-200 rounded-lg bg-white">
        <CardHeader>
          <h2 className="text-2xl font-semibold text-gray-800 text-center">User Settings</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between border-b pb-2">
              <p className="text-gray-600">Email:</p>
              <p className="font-medium text-gray-900">{user?.email || "N/A"}</p>
            </div>
            <div className="flex justify-between border-b pb-2">
              <p className="text-gray-600">Phone:</p>
              <p className="font-medium text-gray-900">{user?.phonenumber || "N/A"}</p>
            </div>
            <div className="flex justify-between border-b pb-2">
              <p className="text-gray-600">Role:</p>
              <p className="font-medium text-gray-900">{user?.role || "N/A"}</p>
            </div>
            <div className="flex justify-between border-b pb-2">
              <p className="text-gray-600">User ID:</p>
              <p className="font-mono text-sm text-gray-900">{user?.id || "N/A"}</p>
            </div>
          </div>

          <Button
            onClick={() => signOut()}
            className="w-full mt-6 bg-red-500 hover:bg-red-600 text-white"
          >
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
