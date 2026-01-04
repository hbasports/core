import React, { useCallback, useId, useState } from "react";
import classNames from "classnames";

interface LabelProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const HintsOrErrors = () => {

}

const Input = (props: LabelProps) => {
  const id = useId();
  const { label, className, ...inputProps } = props;

  return (
    <div>
      <div>
        {label && (
          <label
            className="text-sm font-semibold mb-2 block leading-none"
            htmlFor={id}
          >
            {label}
          </label>
        )}
      </div>
      <div>
        <input
          id={id}
          className={classNames(
            "w-full border border-[hsl(0,0%,90%)] rounded-lg px-3 py-2 text-default bg-transparent min-w-0 text-sm font-medium h-8",
            className
          )}
          {...inputProps}
        />
      </div>
    </div>
  );
};

export const TextInput = (props: LabelProps) => {
  return (
    <Input
      type="text"
      autoCapitalize="none"
      autoCorrect="off"
      inputMode="text"
      {...props}
    />
  );
};

export const PasswordField = (props: LabelProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const toggleIsPasswordVisible = useCallback(
    () => setIsPasswordVisible(!isPasswordVisible),
    [isPasswordVisible, setIsPasswordVisible]
  );
  const textLabel = isPasswordVisible ? "Hide password" : "Show password";

  return (
    <Input
      {...props}
      type={isPasswordVisible ? "text" : "password"}
      placeholder={props.placeholder || "•••••••••••••"}
    />
  );
};

export const EmailInput = (props: LabelProps) => {
  return (
    <Input
      type="email"
      autoCapitalize="none"
      autoComplete="email"
      autoCorrect="no"
      inputMode="email"
      {...props}
    />
  );
};
