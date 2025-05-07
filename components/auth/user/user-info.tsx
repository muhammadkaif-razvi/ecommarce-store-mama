"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { InfoIcon } from "lucide-react";

interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  phonenumber?: string | null;
  role?: string | null;
  isTwoFactorEnabled?: boolean;
  phoneNumberVerified?: Date | null;
  emailVerified?: Date | null;
  isOAuth?: boolean;
}

interface UserInfoProps {
  user: User;
}

export const UserInfo = ({ user }: UserInfoProps) => {
  const router = useRouter();

  return (
    <Card className="w-full max-w-lg lg:max-w-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm rounded-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
          <InfoIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          User Information
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <InfoItem title="Name" value={user?.name ?? "N/A"} />
        <InfoItem title="Email" value={user?.email ?? "N/A"} />
        <InfoItem title="Phone Number" value={user?.phonenumber ?? "N/A"} />
        <InfoItem title="Role" value={user?.role ?? "N/A"} />
        {!user?.isOAuth && (
          <InfoItem
            title="Two-Factor Enabled"
            value={user?.isTwoFactorEnabled ? "Yes" : "No"}
          />
        )}
        <InfoItem
          title="Phone Verified"
          value={formatDate(user?.phoneNumberVerified)}
        />
        <InfoItem
          title="Email Verified"
          value={formatDate(user?.emailVerified)}
        />

        <div className="flex justify-end pt-2">
          <Button
            onClick={() => router.push("/settings")}
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white px-6 py-2 rounded-md transition-colors"
          >
            Edit Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const InfoItem: React.FC<{ title: string; value: string }> = ({
  title,
  value,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-lg p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {title}
      </p>
      <p className="text-sm text-gray-900 dark:text-gray-100 break-all font-medium">
        {value}
      </p>
    </div>
  );
};

const formatDate = (date: Date | null | undefined): string => {
  return date ? new Date(date).toLocaleDateString() : "N/A";
};