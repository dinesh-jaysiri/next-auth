"use client";
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

function Page() {
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">🔑 Admin</p>
      </CardHeader>
      <CardContent className="space-y-4"></CardContent>
    </Card>
  );
}

export default Page;
