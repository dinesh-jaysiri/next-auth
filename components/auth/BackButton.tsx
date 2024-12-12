import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function BackButton({ href, label }: { href: string; label: string }) {
  return (
    <Button variant="link" className="w-full font-normal" size="sm" asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
}

export default BackButton;
