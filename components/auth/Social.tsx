import React from "react";
import { Button } from "@/components/ui/button";
import { FaGithub, FaGoogle } from "react-icons/fa";

function Social() {
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button className="w-full">
        <FaGoogle className="h-5 w-5" />
      </Button>
      <Button className="w-full">
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  );
}

export default Social;
