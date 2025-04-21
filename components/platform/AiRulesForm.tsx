"use client";

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "../ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {  z } from "zod";
import {  AiRulesSchema } from "@/schemas";

import { Button } from "../ui/button";
import { Switch } from "../ui/switch";

const AiRulesForm = ({
  nextStep3,
}: {
  nextStep3: () => void;
}) => {
  const form = useForm<z.infer<typeof AiRulesSchema>>({
    resolver: zodResolver(AiRulesSchema),
    defaultValues: {
      tone:"",
      style:"",
      auto: false,
      userinit: false,
    },
  });

  const onSubmit = (values: z.infer<typeof AiRulesSchema>) => {
    console.log(values);
    nextStep3(); // Call the next step function after form submission
  };
  const tone = [
    "Friendly",
    "Professional",
    "Casual",
    "Formal",
    "Persuasive",
    "Empathetic",
    "Confident",
    "Optimistic",
  ];
  const style = [
    "Conversational",
    "Concise",
    "Descriptive",
    "Technical",
    "Creative",
    "Analytical",
    "Narrative",
    "Persuasive",
  ];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 space-x-2  "  
      >
        <div className="grid grid-cols-1 gap-4">
          <FormField
            control={form.control}
            name="tone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tone of Communication</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full py-5">
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Select an industry"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {tone.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />{" "}
          <FormField
            control={form.control}
            name="style"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Response Style</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full py-5">
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Select an industry"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {style.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="auto"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg  p-3 shadow-none  ">
                <div className="space-y-0.5">
                  <FormLabel>Auto-offer help</FormLabel>
                  <FormDescription>
                    AI pops up suggestions automatically when user lands on a
                    page.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-blue-300  shadow-none "
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="userinit"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg  p-3 shadow-none  ">
                <div className="space-y-0.5">
                  <FormLabel>User-initiated only</FormLabel>
                  <FormDescription>
                    AI only responds when clicked or messaged.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-blue-300  shadow-none "
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-blue-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full lg:w-60 "
        >
          Next
        </Button>
      </form>
    </Form>
  );
};

export default AiRulesForm;
