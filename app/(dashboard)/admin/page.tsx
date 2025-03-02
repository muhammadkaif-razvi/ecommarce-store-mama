"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2 } from "lucide-react";

export default function AdminPage() {
  const user = useCurrentUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<{ id: string; email: string; role: string; createdAt: string }[]>([]);

  useEffect(() => {
    if (!user) return;
    if (user.role !== "ADMIN") router.push("/");
    else fetchUsers();
  }, [user, router]);

  async function fetchUsers() {
    try {
      const res = await fetch("/api/admin");

      if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status}`);
      }

      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }

  if (!user || loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-10 h-10 animate-spin text-gray-600" />
      </div>
    );
  }

  return (
    <div className="h-full p-4  sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
        <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl sm:text-3xl font-semibold">{users.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden border">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100 text-gray-800">
              <TableHead className="px-2 sm:px-4">ID</TableHead>
              <TableHead className="px-2 sm:px-4">Email</TableHead>
              <TableHead className="px-2 sm:px-4">Role</TableHead>
              <TableHead className="px-2 sm:px-4">Joined</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.id} className="hover:bg-gray-50 transition">
                <TableCell className="px-2 sm:px-4">{u.id}</TableCell>
                <TableCell className="px-2 sm:px-4">{u.email}</TableCell>
                <TableCell className="px-2 sm:px-4">
                  <span
                    className={`px-2 py-1 rounded-md text-sm font-semibold ${
                      u.role === "ADMIN" ? "bg-red-500 text-white" : "bg-blue-500 text-white"
                    }`}
                  >
                    {u.role}
                  </span>
                </TableCell>
                <TableCell className="px-2 sm:px-4">
                  {new Date(u.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Logout Button */}
      <Button
        onClick={() => signOut()}
        className="mt-6 bg-red-500 hover:bg-red-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-md w-full sm:w-auto"
      >
        Logout
      </Button>
    </div>
  );
}