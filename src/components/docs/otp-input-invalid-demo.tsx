"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  OtpInput,
  OtpInputDescription,
  OtpInputError,
  OtpInputLabel,
  OtpInputSlots,
} from "@/components/ui/otp-input";

const correctCode = "123456";

export function OtpInputInvalidDemo() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  function check(value: string) {
    const isCorrect = value === correctCode;
    setError(isCorrect ? "" : "That code is not correct.");
    if (!isCorrect) setCode("");
  }

  return (
    <div className="grid w-full max-w-sm gap-4">
      <OtpInput
        value={code}
        isInvalid={Boolean(error)}
        onChange={(value) => {
          setCode(value);
          setError("");
        }}
        onComplete={check}
      >
        <OtpInputLabel>Verification code</OtpInputLabel>
        <OtpInputSlots />
        <OtpInputDescription>
          Enter the 6-digit code from your app.
        </OtpInputDescription>
        <OtpInputError>{error}</OtpInputError>
      </OtpInput>
      <Button
        type="button"
        variant="outline"
        className="w-fit"
        isDisabled={code.length < 6}
        onPress={() => check(code)}
      >
        Verify
      </Button>
    </div>
  );
}
