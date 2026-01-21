import React, { lazy, Suspense } from "react";

import type { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";

export type IconName = keyof typeof dynamicIconImports;

type IconProps = {
  name: IconName;
} & LucideProps;

const Icon = ({ name, ...props }: IconProps) => {
  const LucideIcon = lazy(dynamicIconImports[name]);

  return (
    <Suspense fallback={null}>
      <LucideIcon {...props} />
    </Suspense>
  );
};

export default Icon;
