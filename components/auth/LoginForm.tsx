"use client";
import React, { useState } from "react";
import CardWrapper from "@/components/auth/CardWrapper";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/schemas";
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
import { loginAction } from "@/actions/login";
import FormSuccess from "@/components/FormSuccess";

function LoginForm() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");
  const [successMessage, setSuccessMessage] = useState<string | undefined>("");

  const onSubmit = async (value: z.infer<typeof LoginSchema>) => {
    setErrorMessage("");
    setSuccessMessage("");
    setIsPending(true);
    try {
      const data = await loginAction(value);
      setErrorMessage(data?.error);
      setSuccessMessage(data?.success);
      setIsPending(false);
    } catch (error) {
      setIsPending(false);
    }
  };

  return (
    <CardWrapper
      backButtonHref="/auth/register"
      backButtonLabel="Don't Have an Account?"
      headerLabel="Wellcome Back"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      placeholder="john.doe@example.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                      placeholder="*****"
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
              Login
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
}

export default LoginForm;
