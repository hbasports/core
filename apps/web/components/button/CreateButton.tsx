"use client";

import React, { ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import classNames from "classnames";

import Button from "./Button";

export type CreateBtnProps = {
  createDialog?: () => ReactNode;
  createFunction?: () => void;
  isPending?: boolean;
  buttonText?: string;
  color?: string;
  className?: string;
};

function CreateButton(props: CreateBtnProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const {
    createDialog,
    isPending,
    createFunction,
    buttonText,
    color,
    className,
    ...restProps
  } = props;

  const CreateDialog = createDialog ? createDialog() : null;

  const openModal = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("dialog", "new");

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleClick = () => {
    if (CreateDialog) {
      openModal();
      return;
    }

    createFunction?.();
  };

  return (
    <>
      <Button
        size="base"
        onClick={handleClick}
        loading={isPending}
        StartIcon="plus"
        className={classNames(className)}
        {...restProps}
      >
        {buttonText ? buttonText : "New"}
      </Button>

      {searchParams?.get("dialog") === "new" && CreateDialog}
    </>
  );
}

export default CreateButton;