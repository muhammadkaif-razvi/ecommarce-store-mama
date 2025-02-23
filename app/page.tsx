"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { UserButton } from "@/components/auth/user/user-button";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            href="/"
            className="flex items-center space-x-4 rtl:space-x-reverse"
          >
            <img
              src="https://auth.js.org/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.048131a8.png&w=384&q=75"
              className="h-8"
              alt="authjs logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              authjs
            </span>
          </Link>
          <div className="flex  space-x-7  rtl:space-x-reverse">
            {session?.user.phoneNumberVerified ? (
              <UserButton />
            ) : (
              <>
              <Link href="/login">
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  login
                </button>
              </Link>
              <Link href="/register">
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  register
                </button>
              </Link>
            </>            )}
          </div>
        </div>
      </nav>
      <Card className="my-10 h-full w-auto ">
        <CardHeader>
          <CardTitle>FAQ</CardTitle>
          <CardDescription>
            Here are some frequently asked questions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                Its complete authintication system with authjs ?
              </AccordionTrigger>
              <AccordionContent>
                Yes. Its complete authintication system with authjs along with
                otp verification both email and phone.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
        <CardContent>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                Its compelte with 2FA and Forgot Password ?
              </AccordionTrigger>
              <AccordionContent>
                Yes. Its compelte with 2FA and Forgot Password.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
        <CardContent>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-3">
              <AccordionTrigger>Which Technologies are used?</AccordionTrigger>
              <AccordionContent>
                Nextjs, authjs, prisma, tailwindcss,shadcn-ui, typescript,
                zod,bycrypt ,jwt, Resend ,twilio and more.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
