"use client";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import AiRulesForm from "./AiRulesForm";

const SetUpAiRulesForm = ({
  nextStep3,
}: {
  nextStep3: () => void;
}) => {
  return (
    <Card className="w-full shadow-none border-none ">
      <CardHeader>
        <CardTitle className="text-center">Set Up Agent Rules</CardTitle>
      </CardHeader>
      <CardContent>
        <AiRulesForm nextStep3={nextStep3}/>
      </CardContent>
    </Card>
  );
};

export default SetUpAiRulesForm;
