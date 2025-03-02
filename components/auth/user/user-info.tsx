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
    <Card className="shadow-lg border border-gray-200 rounded-xl w-full max-w-lg lg:max-w-2xl min-h-fit max-h-[80vh] overflow-y-auto">
      {/* Card Header */}
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <InfoIcon className="h-5 w-5 text-purple-600" /> {/* Optional icon */}
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
          className="w-full sm:w-auto"
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
    <div className="flex flex-row items-start sm:items-center justify-between rounded-lg border p-3 bg-gray-50 hover:bg-gray-100 transition-colors">
      <p className="text-sm font-medium text-gray-700">{title}</p>
      <p className="text-sm font-mono text-gray-900 break-all">{value}</p>
    </div>
  );
};

// Helper function to format nullable dates
const formatDate = (date: Date | null | undefined): string => {
  return date ? new Date(date).toLocaleDateString() : "N/A";
};