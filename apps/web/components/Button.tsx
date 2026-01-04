import { cva } from "class-variance-authority";
import classNames from "classnames";

const buttonStyles = cva(
  "rounded-[10px] whitespace-nowrap inline-flex items-center text-sm font-semibold transition cursor-pointer relative",
  {
    variants: {
      color: {
        primary: [
          "border-[hsl(0,0%,90%)]",
          "border",
          "text-semibold",
          "disabled:opacity-30",
        ],
        secondary: [
          "bg-[#1d2735]",
          "text-white",
          "disabled:opacity-30",
          "border",
          "border-[#111827]",
          "disabled:opacity-30",
        ],
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
  color: "primary" | "secondary";
  size?: "base" | "sm";
  CustomStartIcon?: React.ReactNode
}

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps;

export default function Button(props: Props) {
  const { color = "primary", size, CustomStartIcon } = props;

  const buttonClassName = classNames(
    buttonStyles({ color, size }),
    props.className
  );

  return (
    <button
      className={buttonClassName}
      disabled={props.disabled}
      type={props.type as "button" | "submit" | "reset"}
    >
      {CustomStartIcon || null}
      {props.children}
    </button>
  );
}
