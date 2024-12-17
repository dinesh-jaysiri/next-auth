"use client";
import React, { useState } from "react";
import CardWrapper from "@/components/auth/CardWrapper";
import { useForm } from "react-hook-form";
import { NewPasswordSchema } from "@/schemas";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormError from "@/components/FormError";
import FormSuccess from "@/components/FormSuccess";
import { useSearchParams } from "next/navigation";
import { newPasswordAction } from "@/actions/new-password";

function NewPasswordForm() {
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");
  const [successMessage, setSuccessMessage] = useState<string | undefined>("");

  const onSubmit = async (value: z.infer<typeof NewPasswordSchema>) => {
    setErrorMessage("");
    setSuccessMessage("");
    setIsPending(true);
    try {
      const data = await newPasswordAction(value, token);
      setErrorMessage(data?.error);
      setSuccessMessage(data?.success);
      setIsPending(false);
    } catch (error) {
      setIsPending(false);
    }
  };

  return (
    <CardWrapper
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
      headerLabel="Enter a new password"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      placeholder="******"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError message={errorMessage} />
            <FormSuccess message={successMessage} />
            <Button disabled={isPending} className="w-full" type={"submit"}>
              Reset password
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
}

export default NewPasswordForm;
