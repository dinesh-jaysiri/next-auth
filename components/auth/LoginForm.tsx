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
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function LoginForm() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const loginError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Use original provider to login"
      : "";
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");
  const [successMessage, setSuccessMessage] = useState<string | undefined>("");

  const onSubmit = async (value: z.infer<typeof LoginSchema>) => {
    setErrorMessage("");
    setSuccessMessage("");
    setIsPending(true);
    try {
      const data = await loginAction(value, callbackUrl);
      if (data?.error || data?.success) form.reset();
      setErrorMessage(data?.error);
      setSuccessMessage(data?.success);

      // two factor
      if (data?.twoFactor) {
        setShowTwoFactor(true);
      }
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
            {!showTwoFactor && (
              <>
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

                      <Button
                        size="sm"
                        variant="link"
                        asChild
                        className="px-0 font-normal"
                      >
                        <Link href="/auth/reset">Forgot password?</Link>
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {showTwoFactor && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Two Factor Code</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        {...field}
                        placeholder="123456"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormError message={errorMessage || loginError} />
            <FormSuccess message={successMessage} />
            <Button disabled={isPending} className="w-full" type={"submit"}>
              {showTwoFactor ? "Confirm" : "Login"}
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
}

export default LoginForm;
