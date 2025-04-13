"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { InfoIcon } from "lucide-react"; // Optional: Add an icon for the header

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
    <Card className="shadow-lg border border-gray-200 dark:border-gray-700 rounded-xl w-full max-w-lg lg:max-w-2xl overflow-y-auto bg-white dark:bg-gray-900">
      {/* Card Header */}
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
          <InfoIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />{" "}
          {/* Optional icon */}
          User Information
        </CardTitle>
      </CardHeader>

      {/* Card Content */}
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

        {/* Edit Profile Button */}
        <Button
          onClick={() => router.push("/settings")}
          className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-700 dark:hover:bg-purple-800"
        >
          Edit Profile
        </Button>
      </CardContent>
    </Card>
  );
};

// InfoItem Component
const InfoItem: React.FC<{ title: string; value: string }> = ({
  title,
  value,
}) => {
  return (
    <div className="flex flex-row items-start sm:items-center justify-between rounded-lg border p-3 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border-gray-200 dark:border-gray-700">
      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {title}
      </p>
      <p className="text-sm font-mono text-gray-900 dark:text-gray-100 break-all">
        {value}
      </p>
    </div>
  );
};

// Helper function to format nullable dates
const formatDate = (date: Date | null | undefined): string => {
  return date ? new Date(date).toLocaleDateString() : "N/A";
};
