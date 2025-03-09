"use client";
import { UserInfo } from "@/components/auth/user/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useSession } from "next-auth/react";
import { useEffect } from "react"; // Import useEffect

export default function ProfilePage() {
  const user = useCurrentUser();
  const { update } = useSession();

  // Use useEffect to call update() when user is null
  useEffect(() => {
    if (!user) {
      update();
    }
  }, [user, update]); // Add user and update as dependencies

  // If there's no user, show a loading state or nothing
  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      <UserInfo user={user} />
    </div>
  );
}