"use client";
import { EnterEmailForm } from "@/components/auth/register/EnterEmailForm";
import { VerEmailOtpForm } from "@/components/auth/register/VerEmailOtpForm";
import { EnterPhoneNoForm } from "@/components/auth/register/EnterPhoneNoForm";
import { useState, useEffect } from "react";
import { VerPhoneOtpForm } from "@/components/auth/register/VerPhoneOtpForm";
import { EnterPassComReg } from "@/components/auth/register/EnterPassComReg";

export default function RegisterPage() {
  // State for registration
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [phonenumber, setPhonenumber] = useState<string | null>(null);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [otp, setOtp] = useState<string | null>(null);

  // Load state from sessionStorage on mount
  useEffect(() => {
    const savedState = sessionStorage.getItem("registrationState");
    if (savedState) {
      const state = JSON.parse(savedState);
      setName(state.name);
      setEmail(state.email);
      setPhonenumber(state.phonenumber);
      setIsEmailVerified(state.isEmailVerified);
      setIsPhoneVerified(state.isPhoneVerified);
    }
  }, []);

  // Save state to sessionStorage on changes
  useEffect(() => {
    sessionStorage.setItem(
      "registrationState",
      JSON.stringify({
        name,
        email,
        phonenumber,
        isEmailVerified,
        isPhoneVerified,
      })
    );
  }, [name, email, phonenumber, isEmailVerified, isPhoneVerified]);

  // Clear state when the component unmounts (user leaves the page)
  useEffect(() => {
    return () => {
      sessionStorage.removeItem("registrationState");
    };
  }, []);

  // Reset state if the user leaves the process incomplete
  const resetState = () => {
    setName(null);
    setEmail(null);
    setPhonenumber(null);
    setIsEmailVerified(false);
    setIsPhoneVerified(false);
    sessionStorage.removeItem("registrationState");
  };

  return (
 
      <div className="w-full max-w-sm md:max-w-3xl">
        {!email ? (
          <EnterEmailForm
            onSuccess={(submittedEmail) => {
              setEmail(submittedEmail);
            }}
          />
        ) : !isEmailVerified ? (
          <VerEmailOtpForm
            email={email}
            onSuccess={() => setIsEmailVerified(true)}
            onReset={resetState} // Allow resetting the state
          />
        ) : !phonenumber ? (
          <EnterPhoneNoForm
            email={email}
            onSuccess={(submittedPhone, otp) => {
              setPhonenumber(submittedPhone);
              setOtp(otp);
            }}
            onReset={resetState} // Allow resetting the state
          />
        ) : !isPhoneVerified ? (
          <VerPhoneOtpForm
            phonenumber={phonenumber}
            onSuccess={() => setIsPhoneVerified(true)}
            onReset={resetState}
            otp={otp ?? ""}
          />
        ) : (
          <EnterPassComReg
            email={email!}
            phonenumber={phonenumber!}
            onComplete={() => {
              // Clear state on successful registration
              resetState();
            }}
          />
        )}
      </div>
  );
}
