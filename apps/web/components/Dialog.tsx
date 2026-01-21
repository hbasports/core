import * as DialogPrimitive from "@radix-ui/react-dialog";
import React, { ReactNode } from "react";
import { IconName } from "./Icon";
import classNames from "classnames";
import Button from "./button/Button";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export type DialogProps = React.ComponentProps<
  (typeof DialogPrimitive)["Root"]
> & {
  name?: string;
};

export function Dialog(props: DialogProps) {
  const { children, ...dialogProps } = props;
  return (
    <DialogPrimitive.Root {...dialogProps}>{children}</DialogPrimitive.Root>
  );
}

type DialogContentProps = React.ComponentProps<
  (typeof DialogPrimitive)["Content"]
> & {
  type?: "creation" | "confirmation";
  title?: string;
  description?: string | ReactNode | null;
  closeText?: string;
  actionDisabled?: boolean;
  Icon?: IconName;
  enableOverflow?: boolean;
  preventCloseOnOutsideClick?: boolean;
};

type DialogHeaderProps = {
  title: ReactNode;
  subtitle?: ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

function DialogHeader(props: DialogHeaderProps) {
  if (!props.title) return null;

  return (
    <div className="mb-4">
      <DialogPrimitive.DialogTitle className="text-lg font-semibold sm:text-xl tracking-wide ">
        {props.title}
      </DialogPrimitive.DialogTitle>
      {props.subtitle && (
        <p className="hidden text-sm font-medium md:block text-[hsl(0,0%,30%)]">
          {props.subtitle}
        </p>
      )}
    </div>
  );
}

export function DialogClose(
  props: {
    dialogCloseProps?: React.ComponentProps<(typeof DialogPrimitive)["Close"]>;
    children?: ReactNode;
    onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    disabled?: boolean;
  } & React.ComponentProps<typeof Button>
) {
  const { className, onClick, ...buttonProps } = props;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("dialog");

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);

    onClick?.(e);
  };

  return (
    <DialogPrimitive.Close asChild {...props.dialogCloseProps}>
      <Button
        {...buttonProps}
        className={className}
        color="minimal"
        onClick={handleSubmit}
      >
        {props.children ? props.children : "Close"}
      </Button>
    </DialogPrimitive.Close>
  );
}

type DialogFooterProps = {
  children: ReactNode;
  showDivider?: boolean;
  noSticky?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export function DialogFooter(props: DialogFooterProps) {
  return (
    <div
      className={classNames(
        "bg-[#f6f7f9] border-[hsl(0,0%,85%)] bottom-0 -mx-8 mt-10 rounded-b-2xl border",
        props?.noSticky ? "" : "sticky",
        props.className
      )}
    >
      {props.showDivider && <div className="border-t border-[#e5e7eb]" />}
      <div
        className={classNames(
          "flex justify-end space-x-2 px-8 py-4 rtl:space-x-reverse"
        )}
      >
        {props.children}
      </div>
    </div>
  );
}

export const DialogContent = React.forwardRef<
  HTMLDivElement,
  DialogContentProps
>(
  (
    {
      children,
      title,
      Icon: icons,
      enableOverflow,
      type = "creation",
      preventCloseOnOutsideClick,
      ...props
    },
    forwardedRef
  ) => {
    return (
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-neutral-800/70" />
        <DialogPrimitive.Content
          {...props}
          onPointerDownOutside={(e) => {
            if (preventCloseOnOutsideClick) {
              e.preventDefault();
            }
          }}
          className="bg-white left-1/2 top-1/2 px-8 pt-8 z-50 sm:max-w-140 w-[95vw] m-auto -translate-x-1/2 -translate-y-1/2 rounded-2xl text-left shadow-xl fixed flex flex-col"
          onClick={(e) => e.stopPropagation()}
          ref={forwardedRef}
        >
          <DialogHeader
            title="Create a new organization"
            subtitle="Create a new organization with admin privileges!"
          />
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    );
  }
);
`
`;
