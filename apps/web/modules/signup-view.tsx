"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SubmitHandler } from "react-hook-form";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import Link from "next/link";
import { signIn as NextAuthSignIn } from "next-auth/react";
import { signIn } from "@hbasports/auth/src/react";

import AuthContainer from "@/components/ui/AuthContainer";
import { EmailInput, PasswordField, TextInput } from "@/components/form";
import Button from "@/components/button/Button";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { Alert } from "@/components/Alert";
import { fetchUsername } from "@/lib/fetchUsername";
import { WEBSITE_URL } from "@hbasports/lib/constants";

import { signupSchema } from "../app/zod-utils";

const apiSignupSchema = signupSchema.extend({
  apiError: z.string().optional(),
});

type FormValues = z.infer<typeof apiSignupSchema>;

function UsernameField({
  username,
  usernameTaken,
  setUsernameTaken,
  disabled,
  ...props
}: React.ComponentProps<typeof TextInput> & {
  username: string;
  usernameTaken: boolean;
  setUsernameTaken: (value: boolean) => void;
}) {
  const { register, formState } = useFormContext<FormValues>();
  const debouncedUsername = useDebounce(username, 600);

  useEffect(() => {
    if (formState.isSubmitting || formState.isSubmitSuccessful) return;

    async function checkUsername() {
      if (disabled) return;
      if (!debouncedUsername) {
        setUsernameTaken(false);
        return;
      }
      await fetchUsername(debouncedUsername).then(({ data }) => {
        setUsernameTaken(!data.available);
      });
    }
    checkUsername();
  }, [
    debouncedUsername,
    disabled,
    formState.isSubmitting,
    formState.isSubmitSuccessful,
  ]);

  return (
    <div>
      <TextInput disabled={disabled} {...register("username")} {...props} />
    </div>
  );
}

export default function Signup() {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [usernameTaken, setUsernameTaken] = useState(false);
  const formMethods = useForm<FormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const {
    register,
    watch,
    formState: { isSubmitting, errors },
  } = formMethods;

  const signup: SubmitHandler<FormValues> = async (formData) => {
    try {
      // const response = await fetch("http://localhost:3001/auth/signup", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData),
      // });

      // const userData = await response.json();

      // if (!response.ok) {
      //   throw new Error(userData.message || "Signup failed.");
      // }

      const data = {
        email: "12345abcde@gmail.com",
      };

      const callbackUrl = `${WEBSITE_URL}/organizations`;

      await signIn("credentials", {
        email: data.email ?? "12345abcde@gmail.com",
        password: formData.password,
        redirect: true,
        callbackUrl: callbackUrl,
      });

      await NextAuthSignIn("credentials", {
        email: data.email ?? "12345abcde@gmail.com",
        password: formData.password,
        redirect: false,
      });
    } catch (err: any) {
      formMethods.setError("apiError", { message: err.message });
    }
  };

  const LoginFooter = (
    <Link href={"/auth/login"} className="font-medium">
      Already have an account?
    </Link>
  );

  const GoogleIcon = () => (
    <img
      className="mr-2 h-4 w-4"
      src="/google-icon-colored.svg"
      alt="Continue with Google Icon"
    />
  );

  return (
    <div>
      <AuthContainer heading="Create an account" footerText={LoginFooter}>
        <Button
          color="primary"
          size="base"
          className="w-full justify-center"
          CustomStartIcon={<GoogleIcon />}
        >
          Sign up with Google
        </Button>
        <div className="my-8">
          <div className=" flex items-center">
            <div className="border-[hsl(0,0%,90%)] grow border-t"></div>
            <span className="text-[hsl(0,0%,65%)] mx-2 shrink text-sm font-medium leading-none">
              or
            </span>
            <div className="border-[hsl(0,0%,90%)] grow border-t"></div>
          </div>
        </div>
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
            <UsernameField
              label="Username"
              username={watch("username") || ""}
              placeholder="John Doe"
              usernameTaken={usernameTaken}
              setUsernameTaken={(value) => setUsernameTaken(value)}
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
            {errors.apiError && (
              <Alert
                severity="error"
                message={errors.apiError.message as string}
              />
            )}
            <Button
              color="secondary"
              size="base"
              className="w-full justify-center"
              disabled={isSubmitting}
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
