"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import StatusList from "./status";
import { useEffect, useState } from "react";

interface SetupCheckBoxProps {
  currentStep: "businessProfile" | "customerData" | "aiRules" | "campaign";
}

interface StatusItem {
  title: string;
  status: "completed" | "in_progress" | "not_started";
  step: "businessProfile" | "customerData" | "aiRules" | "campaign";
}

const SetupCheckBox: React.FC<SetupCheckBoxProps> = ({ currentStep }) => {
  const [statusItems, setStatusItems] = useState<StatusItem[]>([
    { title: "Set Up Business Profile", status: "not_started", step: "businessProfile" },
    { title: "Sync Your Customer Data", status: "not_started", step: "customerData" },
    { title: "Set Up AI Agent Rules", status: "not_started", step: "aiRules" },
    { title: "Set Up First Campaign", status: "not_started", step: "campaign" },
  ]);

  useEffect(() => {
    const updatedStatusItems = statusItems.map((item) => {
      if (item.step === currentStep) {
        return { ...item, status: "in_progress" as "in_progress" };
      } else if (
        (currentStep === "customerData" && item.step === "businessProfile") ||
        (currentStep === "aiRules" && (item.step === "businessProfile" || item.step === "customerData")) ||
        (currentStep === "campaign" && item.step !== "campaign")
      ) {
        return { ...item, status: "completed" as "completed" };
      } else {
        return item;
      }
    });
    setStatusItems(updatedStatusItems);
  }, [currentStep]);

  return (
    <Card className="shadow-none border-none rounded-sm w-full lg:w-1/2 bg-[#F7F9FF]">
      <CardHeader className=" ">
        <CardTitle className="text-[#305AFF] font-poppins">
          Get Started with ReferallHub
        </CardTitle>
        <CardDescription>
          To get started with better referrals & rewards, complete your account
          setup in a few easy steps.
        </CardDescription>
        <Separator />
      </CardHeader>
      <CardContent>
        <StatusList items={statusItems} />
      </CardContent>
      <CardContent></CardContent>
    </Card>
  );
};

export default SetupCheckBox;
