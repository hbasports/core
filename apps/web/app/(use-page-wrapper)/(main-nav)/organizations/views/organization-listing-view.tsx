"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React from "react";
import z from "zod";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import CreateButton from "@/components/button/CreateButton";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
} from "@/components/Dialog";
import Button from "@/components/button/Button";
import CreateOrganizationForm from "../components/CreateOrganizationForm";
import { organizationSchema } from "@/app/zod-utils";

export function CreateOrganizationDialog() {
  const searchParams = useSearchParams();

  const isOpen = searchParams.get("dialog") === "new";

  const SubmitButton = (isPending: boolean) => {
    return (
      <>
        <DialogFooter showDivider>
          <DialogClose />
          <Button form="create-org-form" type="submit" loading={isPending}>
            Continue
          </Button>
        </DialogFooter>
      </>
    );
  };

  return (
    <Dialog name="organization" open={isOpen}>
      <DialogContent
        type="creation"
        title="Create a new organization"
        description="Use this form to create an organization with admin privileges."
      >
        <CreateOrganizationForm isPending={false} SubmitButton={SubmitButton} />
      </DialogContent>
    </Dialog>
  );
}

export const OrganizationsCTA = () => {
  return <CreateButton createDialog={() => <CreateOrganizationDialog />} />;
};
