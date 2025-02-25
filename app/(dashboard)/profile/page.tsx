import { UserInfo } from "@/components/auth/user/user-info";
import { currentUser } from "@/lib/auth";
export default async function ProfilePage() {
  const user = await currentUser();

  if (!user) {
    return <p className="text-center text-red-500">User not found</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
   
      <UserInfo user={user} label="User Information" />
    </div>
  );
}
