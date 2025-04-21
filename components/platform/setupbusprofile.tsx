"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SetupBusinessProfileForm from "./setupBPForm";


interface SetUpBussinessProfileProps {
  nextStep1: () => void;
}

const SetUpBussinessProfile:React.FC<SetUpBussinessProfileProps> = ({
  nextStep1,
}) => {
  return (
    <Card className="shadow-none border-none rounded-sm   w-full ">
      <CardHeader>
        <CardTitle className=" text-left md:text-center">
          Build Your Business Identity
        </CardTitle>
        <CardDescription className="">
          Help us tailor the referral experience by adding key details about
          your businessHelp us tailor the referral experience by adding key
          details about your business
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SetupBusinessProfileForm nextStep1={nextStep1}/>
      </CardContent>
    </Card>
  );
};

export default SetUpBussinessProfile;
