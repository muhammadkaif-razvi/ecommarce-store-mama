"use client";
import { UserInfo } from "@/components/auth/user/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";

export default  function ProfilePage() {
  const user = useCurrentUser();

  if (!user) {
    return <p className="text-center text-red-500">User not found</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
 
      <UserInfo user={user} label="User Information" />
      
    </div>
  );
}
