"use client";
import { Button } from "../ui/button";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { XCircle } from "lucide-react";

const CustomerDataUpload = ({
  nextStep2,
}: {
  nextStep2: () => void;
}) => {
  return (
    <Card className="shadow-none border-none rounded-sm   w-full">
      <CardContent className="space-y-1  md:space-y-1 ">
        <Card className="shadow-none border-none rounded-sm   w-full h-1/2">
          {" "}
          <CardContent className="font-semibold text-center font-inter">
            Import Customer Data:Sync with Zapier or Upload CSV
          </CardContent>
          <CardFooter className="items-center justify-center">
            <Button
              variant={"outline"}
              className="  border-blue-600 hover:bg-blue-50 hover:text-blue-800  text-blue-600  font-bold py-2 px-4 rounded focus:shadow-outline w-60 md:w-80 "
            >
              Connect with Zapier
            </Button>
          </CardFooter>
        </Card>{" "}
        {/* Separator */}
        <div className="flex items-center w-full">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="text-sm text-gray-500 px-2">or</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>{" "}
        <Card className=" border-dashed shadow-none border-2  ">
          {" "}
          <CardContent className="p-0">
            <>
              <CardHeader className="">
                <div className="border-dotted  px-2 border justify-between flex flex-row items-center">
                  <div className="flex flex-row  space-x-3 items-center">
                    <Image
                      alt="upload"
                      src="/catppuccin_csv.png"
                      width={20}
                      height={20}
                      className="h-6 w-6 md:h-20 md:w-20 p-0"
                    />
                    <div className="flex flex-col">
                      <h4 className="text-sm">Leads.csv</h4>
                      <h5 className="text-xs text-gray-400">428KB</h5>
                    </div>
                  </div>
                  <div>
                    <XCircle className="text-red-500 h-4 w-4 md:h-6 md:w-6" />
                  </div>
                </div>
              </CardHeader>
              <CardFooter className=" min-w-max">
                <div className="  border-green-700 hover:bg-green-100 bg-green-100 border-dotted hover:text-green-700 text-green-700  font-light py-2 text-[10px] px-1 focus:shadow-outline rounded-full w-full md:text-sm text-xs text-center">
                  CSV File Upload Sucessfully!
                </div>
              </CardFooter>
              <CardHeader className="items-center justify-center p-0">
                <Image
                  alt="upload"
                  src="/upload-cloud.png"
                  width={100}
                  height={100}
                />
                <CardTitle className="text-center text-xs md:text-sm font-light ">
                  Drag and drop files here
                </CardTitle>
              </CardHeader>
              <CardFooter className="items-center justify-center">
                <Button
                  variant={"outline"}
                  className="  border-blue-600 hover:bg-blue-50 hover:text-blue-800  text-blue-600  font-bold px-4 rounded focus:shadow-outline  md:w-80 md:text-sm text-xs"
                >
                  Click to Upload CSV File
                </Button>
              </CardFooter>
            </>
          </CardContent>
        </Card>
      </CardContent>
      <CardFooter className="items-center justify-center">
        <Button
          onClick={() => {nextStep2()}}
          className=" bg-gradient-to-r from-blue-500 to-blue-200 text-white font-bold  px-4 rounded focus:outline-none focus:shadow-outline w-60 md:w-80"
        >
          Next
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CustomerDataUpload;
