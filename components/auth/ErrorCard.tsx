import React from "react";
import CardWrapper from "@/components/auth/CardWrapper";
import { BsExclamationTriangle } from "react-icons/bs";

function ErrorCard() {
  return (
    <CardWrapper
      headerLabel={"Oops! something went wrong"}
      backButtonLabel={"Back to login"}
      backButtonHref="/aut/login"
    >
      <div className="flex w-full justify-center items-center">
        <BsExclamationTriangle className="text-destructive w-10 h-10" />
      </div>
    </CardWrapper>
  );
}

export default ErrorCard;
