import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface UserInfoProps {
  user: {
    id: string;
    email: string;
    role?: string;
    phonenumber?: string;
    isTwoFactorEnabled?: boolean;
    phoneNumberVerified?: Date | null;
    emailVerified?: Date | null;
    name?: string;
  };
  label: string;
}

export const UserInfo: React.FC<UserInfoProps> = ({ user, label }) => {
  return (
    <Card className="shadow-lg border border-gray-200 rounded-xl">
      <CardHeader>
        <p className="text-2xl font-semibold text-center text-gray-800">{label}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <InfoItem title="User ID" value={user.id} />
        <InfoItem title="Email" value={user.email} />
        <InfoItem title="Role" value={user.role ?? "N/A"} />
        <InfoItem title="Phone Number" value={user.phonenumber ?? "N/A"} />
        <InfoItem title="Two-Factor Enabled" value={user.isTwoFactorEnabled ? "Yes" : "No"} />
        <InfoItem title="Phone Verified" value={formatDate(user.phoneNumberVerified)} />
        <InfoItem title="Email Verified" value={formatDate(user.emailVerified)} />
        <InfoItem title="Name" value={user.name ?? "N/A"} />
      </CardContent>
    </Card>
  );
};

const InfoItem: React.FC<{ title: string; value: string }> = ({ title, value }) => {
  return (
    <div className="flex items-center justify-between rounded-lg border p-3 bg-gray-100 shadow-sm">
      <p className="text-sm font-medium text-gray-700">{title}</p>
      <p className="truncate text-xs max-w-[180px] font-mono p-2 bg-white rounded-md border">
        {value}
      </p>
    </div>
  );
};

// Helper function to format nullable dates
const formatDate = (date: Date | null | undefined): string => {
  return date ? new Date(date).toLocaleDateString() : "N/A";
};
