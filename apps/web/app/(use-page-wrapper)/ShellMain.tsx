import React from "react";
import type { ReactNode } from "react";

interface LayoutProps {
  heading?: string;
  subtitle?: string;
  backPath?: string;
  children: ReactNode;
  CTA?: ReactNode;
}

function ShellMain(props: LayoutProps) {
  return (
    <>
      {(props.heading || !!props.backPath) && (
        <div className="flex items-center w-full truncate md:mb-6 lg:mb-8">
          <header className="w-full max-w-full items-center truncate ltr:mr-4 rtl:ml-4">
            {props.heading && (
              <h3 className="max-w-28 sm:max-w-72 md:max-w-80 inline truncate text-lg font-semibold tracking-wide sm:text-xl md:block xl:max-w-full">
                {props.heading}
              </h3>
            )}
            {props.subtitle && (
              <p className="hidden text-sm font-medium md:block text-[hsl(0,0%,30%)]">
                {props.subtitle}
              </p>
            )}
          </header>
          {props.CTA && <div>{props.CTA}</div>}
        </div>
      )}

      <div className="flex flex-1 flex-col">{props.children}</div>
    </>
  );
}

export default ShellMain;
