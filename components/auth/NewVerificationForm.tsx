"use client";
import React, { useCallback, useEffect, useState } from "react";
import CardWrapper from "@/components/auth/CardWrapper";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { newVerificationAction } from "@/actions/new-verification-action";
import FormError from "@/components/FormError";
import FormSuccess from "@/components/FormSuccess";

function NewVerificationForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const onSubmit = useCallback(() => {
    if (!token) {
      setErrorMessage("Missing token!");
      return;
    }
    newVerificationAction(token)
      .then((data) => {
        setSuccessMessage(data?.success || "");
        setErrorMessage(data?.error || "");
      })
      .catch(() => setErrorMessage("Something wet wrong!"));
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <CardWrapper
      headerLabel="Confirming your verificatioin"
      backButtonLabel="Back to login"
      backButtonHref={"/auth/login"}
    >
      <div className="flex items-center w-full justify-center">
        {!successMessage && !errorMessage && <BeatLoader />}
        <FormError message={errorMessage} />
        <FormSuccess message={successMessage} />
      </div>
    </CardWrapper>
  );
}

export default NewVerificationForm;
