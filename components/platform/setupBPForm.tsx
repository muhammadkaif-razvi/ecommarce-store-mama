"use client";

import React, { useEffect, useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { setupbusinessSchema } from "@/schemas";
import { Input } from "../ui/input";
import { ImageUpload } from "../ui/image-upload";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "../ui/select";
import { indianAddressData } from "@/info-data";
import businessIndustries from "@/info-data";
import { Button } from "../ui/button";

interface SetupBusinessProfileFormProps {
  nextStep1: () => void; // Add the nextStep1 prop type
}
const SetupBusinessProfileForm: React.FC<SetupBusinessProfileFormProps> = ({
  nextStep1, // Destructure the nextStep1 prop
}) => {
  const form = useForm<z.infer<typeof setupbusinessSchema>>({
    resolver: zodResolver(setupbusinessSchema),
    defaultValues: {
      imageUrl: "",
      bDiscription: "",
      bName: "",
      bEmail: "",
      bPhone: "",
      industry: "",
      services: "",
      products: "",
      companysize: "",
      city: "",
      state: "",
      pincode: "",
    },
  });

  const onSubmit = (values: z.infer<typeof setupbusinessSchema>) => {
    console.log(values);
    nextStep1(); // Call the nextStep1 function when the form is submitted
  };

  const { setValue, watch } = form;
  const watchCity = watch("city");
  const watchPincode = watch("pincode");

  const [availableStates, setAvailableStates] = useState<string[]>([]);
  const [, setAvailablePinCodes] = useState<string[]>([]);

  // Update available states when the city changes
  useEffect(() => {
    if (watchCity) {
      const filteredStates = [
        ...new Set(
          indianAddressData
            .filter((item) =>
              item.city.toLowerCase().includes(watchCity.toLowerCase())
            )
            .map((item) => item.state)
        ),
      ].sort();
      setAvailableStates(filteredStates);
      setValue("state", ""); // Reset state when city changes
      setValue("pincode", ""); // Reset pincode when city changes
    } else {
      setAvailableStates(
        [...new Set(indianAddressData.map((item) => item.state))].sort()
      );
      setValue("state", "");
      setValue("pincode", "");
    }
  }, [watchCity, setValue]);

  // Update available pin codes when the city changes
  useEffect(() => {
    if (watchCity) {
      const filteredPinCodes = indianAddressData
        .filter((item) =>
          item.city.toLowerCase().includes(watchCity.toLowerCase())
        )
        .map((item) => item.pinCode)
        .sort();
      setAvailablePinCodes(filteredPinCodes);
      setValue("pincode", ""); // Reset pincode when city changes
    } else {
      setAvailablePinCodes([]);
      setValue("pincode", "");
    }
  }, [watchCity, setValue]);

  // Update city and state when the pin code changes
  useEffect(() => {
    if (watchPincode?.length >= 6) {
      const match = indianAddressData.find(
        (item) => item.pinCode === watchPincode
      );
      if (match) {
        setValue("city", match.city);
        setValue("state", match.state);
        // Update available states and pin codes based on the new city
        const filteredStatesForPin = [
          ...new Set(
            indianAddressData
              .filter((item) => item.city === match.city)
              .map((item) => item.state)
          ),
        ].sort();
        setAvailableStates(filteredStatesForPin);
        const filteredPinCodesForPin = indianAddressData
          .filter((item) => item.city === match.city)
          .map((item) => item.pinCode)
          .sort();
        setAvailablePinCodes(filteredPinCodesForPin);
      } else {
        // setValue("city", "");
        // setValue("state", "");
        // setAvailableStates([...new Set(indianAddressData.map((item) => item.state))].sort());
        // setAvailablePinCodes([]);
      }
    } else {
      // setValue("city", "");
      // setValue("state", "");
      // setAvailableStates([...new Set(indianAddressData.map((item) => item.state))].sort());
      // setAvailablePinCodes([]);
    }
  }, [watchPincode, setValue]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 space-x-2"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Logo</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                    maxFiles={1}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bDiscription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about your business"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    className="py-5"
                    {...field}
                    placeholder="Enter business name"
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Industry</FormLabel>
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
                      {businessIndustries.map((industry) => (
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
            name="bEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="py-5"
                    {...field}
                    placeholder="Enter business email"
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    className="py-5"
                    {...field}
                    placeholder="Enter business phone number"
                    type="tel"
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, "");
                      if (value.startsWith("91")) value = "+" + value;
                      if (!value.startsWith("+91")) value = "+91" + value;
                      value = value.slice(0, 13);
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="companysize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Size</FormLabel>
                <FormControl>
                  <Input
                    className="py-5"
                    {...field}
                    placeholder="Enter company size (e.g., 1-50)"
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="services"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Services Offered</FormLabel>
                <FormControl>
                  <Input
                    className="py-5"
                    {...field}
                    placeholder="Enter Services"
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="products"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Products Offered</FormLabel>
                <FormControl>
                  <Input
                    className="py-5"
                    {...field}
                    placeholder="Enter Products"
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input
                    className="py-5"
                    {...field}
                    placeholder="Enter city"
                    type="text"
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pincode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pincode</FormLabel>
                <FormControl>
                  <Input
                    className="py-5"
                    {...field}
                    placeholder="Enter pincode"
                    type="text"
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full py-5">
                    <SelectValue
                      defaultValue={field.value}
                      placeholder="Select a state"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {availableStates.map((stateOption) => (
                      <SelectItem key={stateOption} value={stateOption}>
                        {stateOption}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          onClick={() => form.handleSubmit(onSubmit)()}
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-blue-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Save Business Profile
        </Button>
      </form>
    </Form>
  );
};

export default SetupBusinessProfileForm;
