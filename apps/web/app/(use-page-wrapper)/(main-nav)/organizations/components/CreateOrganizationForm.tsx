"use client";

import React, { ReactNode, useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { organizationSchema } from "@/app/zod-utils";
import {
  DEFAULT_SELECT_OPTION,
  SelectInput,
  TextInput,
} from "@/components/form";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import { Alert } from "@/components/Alert";
import { WEBSITE_URL } from "@hbasports/lib/constants";

const organizationCreationSchema = organizationSchema.extend({
  apiError: z.string().optional(),
});

type OrganizationFormValues = z.infer<typeof organizationCreationSchema>;

type OrganizationFormProps = {
  isPending: boolean;
  SubmitButton: (isPending: boolean) => ReactNode;
};

export const sportOptions: Record<string, string> = {
  RUGBY_LEAGUE: "Rugby League",
  GRIDIRON: "Gridiron",
  RUGBY: "Rugby",
  CRICKET: "Cricket",
  AFL: "Aussie Rules",
  SOCCER: "Soccer",
  GOLF: "Golf",
  HOCKEY: "Hockey",
  BASEBALL: "Baseball",
};

function CreateOrganizationForm({
  isPending,
  SubmitButton,
}: OrganizationFormProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const formMethods = useForm<OrganizationFormValues>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      name: "",
      shortName: "",
      sport: DEFAULT_SELECT_OPTION,
      allowPublicMembership: false,
      description: "",
      founded: new Date(),
    },
  });

  const {
    register,
    watch,
    formState: { isSubmitting, errors },
  } = formMethods;

  const closeDialog = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("dialog");

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  const onSubmit: SubmitHandler<OrganizationFormValues> = async (values) => {
    try {
      const response = await fetch(
        `http://localhost:3001/organizations/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
          credentials: "include",
        },
      );

      if (response.ok) {
        closeDialog();
      }
    } catch (err: any) {
      formMethods.setError("apiError", { message: err.message || "Something went wrong! Please try again later." });
      console.error(err);
    }
  };

  return (
    <FormProvider {...formMethods}>
      <form
        id="create-org-form"
        onSubmit={formMethods.handleSubmit(onSubmit)}
        noValidate
      >
        <div className="mt-3 flex flex-col gap-4">
          <TextInput
            id="name"
            inputMode="text"
            autoCapitalize="none"
            autoCorrect="no"
            label="Organization name"
            placeholder="The John Doe Organization"
            {...register("name")}
          />
          <TextInput
            id="shortName"
            inputMode="text"
            autoCapitalize="none"
            autoCorrect="no"
            label="Organization short name"
            placeholder="JDO"
            {...register("shortName")}
          />
          <SelectInput
            options={sportOptions}
            label="Sport"
            inputMode="text"
            autoCapitalize="none"
            autoCorrect="no"
            {...register("sport")}
          />
                    {errors.apiError && (
            <Alert
              severity="error"
              message={errors.apiError.message as string}
            />
          )}
        </div>
        {SubmitButton(isPending)}
      </form>
    </FormProvider>
  );
}

export default CreateOrganizationForm;
