"use client";

import { useEffect, useState } from "react";
import { check, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SubmitHandler } from "react-hook-form";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { signupSchema } from "../app/zod-utils";
import AuthContainer from "@/components/ui/AuthContainer";
import { EmailInput, PasswordField, TextInput } from "@/components/form";

import Button from "@/components/Button";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { getUserCredentials } from "@/lib/getUserCredentials";
import { Alert } from "@/components/Alert";
import { fetchUsername } from "@/lib/fetchUsername";

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
      console.log(debouncedUsername);
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
  const router = useRouter();
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
    const WEBAPP_URL = "http://localhost:3000"; // TODO: move to constants package
    const GETTING_STARTED_PATH = "getting-started";
    const redirectUrl = `${WEBAPP_URL}/${GETTING_STARTED_PATH}`;

    try {
      const response = await fetch("http://localhost:3001/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const signupResponse = await response.json();

      if (!response.ok) {
        throw new Error(signupResponse.message || "Signup failed.");
      }

      await getUserCredentials(
        formData.email as string,
        formData.password,
        signupResponse.accountId ?? ""
      );

      router.push(redirectUrl);
    } catch (err: any) {
      console.error("Signup error:", err);
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
          color="secondary"
          size="base"
          className="w-full justify-center"
          CustomStartIcon={<GoogleIcon />}
        >
          Sign up with Google
        </Button>
        <div className="my-8">
          <div className="relative flex items-center">
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
            {errors.apiError && (
              <Alert
                severity="error"
                message={errors.apiError.message as string}
              />
            )}
            <Button
              color="primary"
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
