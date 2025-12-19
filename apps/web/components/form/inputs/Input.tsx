"use client";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    addOnSuffix?: React.ReactNode;
    label?: string
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

export const InputField = ({ addOnSuffix, type, className, ...props }: InputFieldProps) => {
    return (
        <div className="w-full space-y-3">
            {props.label && <label htmlFor={props.name} className="text-sm font-semibold text-[var(--color-text-emphasis)]">{props.label}</label>}
            <input className={classNames(
                "rounded-[10px] border px-3 py-2 text-sm w-full border-[var(--color-border)] text-[var(--color-text-secondary)] font-medium",
                className
            )} {...props} />
        </div>
    )
}