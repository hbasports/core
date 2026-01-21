"use client";

import { cva } from "class-variance-authority";
import classNames from "classnames";
import { ReactNode } from "react";
import Icon, { IconName } from "../Icon";

const buttonStyles = cva(
  "rounded-[10px] whitespace-nowrap inline-flex items-center text-sm font-semibold transition cursor-pointer relative",
  {
    variants: {
      color: {
        secondary: [
          "border-[hsl(0,0%,90%)]",
          "border",
          "text-semibold",
          "disabled:opacity-30",
        ],
        primary: [
          "bg-[#1d2735]",
          "text-white",
          "disabled:opacity-30",
          "border",
          "border-[#111827]",
          "disabled:opacity-30",
        ],
        minimal: [
          "text-[hsl(0,0%,35%)]",
          "border border-transparent",

          "not-disabled:hover:text-[#070a0d]",
          "not-disabled:hover:bg-[#eeeff2]",
          "not-disabled:hover:border-[#e5e7eb] hover:border"
        ]
      },
      size: {
        base: "px-2.5 py-2 text-sm leading-none",
        sm: "",
      },
    },
    defaultVariants: {
      color: "primary",
      size: "base",
    },
  }
);

interface ButtonProps {
  color?: "primary" | "secondary" | "minimal";
  size?: "base" | "sm";
  CustomStartIcon?: ReactNode;
  StartIcon?: IconName;

  loading?: boolean;
}

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps;

export default function Button(props: Props) {
  const {
    color = "primary",
    size,
    CustomStartIcon,
    StartIcon,
    onClick,
    loading = false,
    type = "button"
  } = props;

  const buttonClassName = classNames(
    buttonStyles({ color, size }),
    props.className
  );

  return (
    <button
      className={classNames("gap-1", buttonClassName)}
      disabled={props.disabled}
      type={props.type as "button" | "submit" | "reset"}
      onClick={onClick}
    >
      {CustomStartIcon ||
        (StartIcon && (
          <>
            <Icon name={StartIcon} />
          </>
        ))}
      {props.children}
    </button>
  );
}
