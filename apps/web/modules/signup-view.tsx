"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SubmitHandler } from "react-hook-form";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cva } from "class-variance-authority";

import { signupSchema } from "@hbasports/prisma/zod-utils";
import AuthContainer from "@/components/ui/AuthContainer";
import { EmailInput, PasswordField, TextInput } from "@/components/form";

import Button from "@/components/Button";

type FormValues = z.infer<typeof signupSchema>;

const FormDefaultValues: FormValues = {
  email: "",
  password: "",
  username: "",
};

export default function Signup() {
  const [displayEmailForm, setDisplayEmailForm] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const router = useRouter();
  const formMethods = useForm<FormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: FormDefaultValues,
  });
  const {
    register,
    watch,
    formState: { isSubmitting, errors, isSubmitSuccessful },
  } = formMethods;

  const signup: SubmitHandler<FormValues> = async (data) => {
    await fetch(`http://localhost:8626/api/users/create`, {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then(async () => {
        console.log(formMethods.formState.errors);
        // Construct redirect urls and generate token credentials
      })
      .catch((err) => {
        // Handle errors
      });
  };

  const LoginFooter = (
    <Link href={"/auth/login"} className="font-medium">
      Already have an account?
    </Link>
  );

  return (
    <div>
      <AuthContainer heading="Create an account" footerText={LoginFooter}>
        <FormProvider {...formMethods}>
          <form
            className="flex flex-col gap-4"
            onSubmit={formMethods.handleSubmit(signup)}
            noValidate
          >
            <EmailInput
              id="email"
              placeholder="john.doe@example.com"
              inputMode="email"
              autoComplete="email"
              autoCapitalize="none"
              autoCorrect="no"
              label="Email"
              {...register("email")}
            />
            <TextInput
              id="username"
              placeholder="John Doe"
              inputMode="text"
              autoComplete="username"
              autoCapitalize="none"
              autoCorrect="no"
              label="Username"
              {...register("username")}
            />
            <PasswordField
              id="password"
              inputMode="none"
              autoComplete="none"
              autoCapitalize="none"
              autoCorrect="no"
              label="Password"
              {...register("password")}
            />
            <Button
              color="primary"
              size="base"
              className="w-full justify-center"
              disabled={formMethods.formState.isSubmitting}
              type="submit"
            >
              Get started
            </Button>
          </form>
        </FormProvider>
      </AuthContainer>
    </div>
  );
}
