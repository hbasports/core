"use client";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    addOnSuffix?: React.ReactNode;
}

import classNames from "classnames";

interface LabelProps {
    content: string
}

export function Label(props: React.PropsWithChildren<LabelProps>) {
    <label>
        {props.content}
    </label>
}

export const InputField = ({addOnSuffix, type = "text", className, ...props}: InputFieldProps) => {
    return (
        <input className={classNames(
            "border border-[var(--color-secondary)] rounded-lg focus:border-[var(--color-emphasis)] shadow-xs py-1 px-4 w-full font-medium",
            className
        )} {...props} />
    )
}