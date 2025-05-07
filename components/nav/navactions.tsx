"use client";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { CiUser } from "react-icons/ci";
import HeadderUser from "../user/headder-user";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useCartStore } from "@/lib/store/cart";

export const NavAction = () => {
  const user = useCurrentUser();
  const router = useRouter();
    const { items } = useCartStore();
  return (
    <div className=" lg:px-36 flex flex-row items-center justify-between lg:space-x-7 md:space-x-5 space-x-3 md:px-8 px-3 ">
      <div className="relative" onClick={() => router.push("/cart")}>
        <ShoppingCart size={20} className="text-blue-500" />
        <span
          className="absolute top-0 right-0 text-sm font-semibold text-white bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center"
          style={{ transform: "translate(50%, -40%) scale(0.7)" }}
        >
          {items.length}
        </span>
      </div>
      {user ? (
        <HeadderUser />
      ) : (
        <div
          className="flex flex-row items-center gap-2 cursor-pointer"
          onClick={() => router.push("/login")}
        >
          <CiUser size={20} className="text-blue-600 h-6 w-6" />
          <span className="font-sans md:block hidden">Login</span>
        </div>
      )}
    </div>
  );
};
