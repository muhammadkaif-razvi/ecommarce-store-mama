"use client";
import CustomerDataUpload from "@/components/platform/customer-data-upload";
import SetUpAiRulesForm from "@/components/platform/setupaiagentrules";
import SetUpBussinessProfile from "@/components/platform/setupbusprofile";
import SetupCheckBox from "@/components/platform/SetUpchekbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

const PlatformSetupPage = () => {
  const [currentStep, setCurrentStep] = useState<
    "businessProfile" | "customerData" | "aiRules" | "campaign"
  >("businessProfile"); // Initialize with the first step

  const nextStep = () => {
    if (currentStep === "businessProfile") {
      setCurrentStep("customerData");
    } else if (currentStep === "customerData") {
      setCurrentStep("aiRules");
    } else if (currentStep === "aiRules") {
      setCurrentStep("campaign");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Platform Setup</CardTitle>
        <CardDescription>make your platform ready</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col lg:flex-row space-x-3 space-y-3 pt-3 w-full">
        {/* check box flow of set up right top side*/}
        <SetupCheckBox currentStep={currentStep} />

        {/* Conditional rendering of setup steps */}
        {currentStep === "businessProfile" && (
          <SetUpBussinessProfile nextStep1={nextStep} />
        )}

        {currentStep === "customerData" && (
          <CustomerDataUpload nextStep2={nextStep}/>
        )}

        {currentStep === "aiRules" && (
          <SetUpAiRulesForm nextStep3={nextStep} />
        )}

        {/* You would add the Campaign setup component here similarly */}
        {currentStep === "campaign" && (
          <div>{/* Your Campaign Setup Component */}Campaign Setup</div>
        )}
      </CardContent>
    </Card>
  );
};

export default PlatformSetupPage;