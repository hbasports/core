import { AVATAR_FALLBACK } from "@hbasports/lib/constants";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { ReactNode } from "react";

type Maybe<T> = T | null | undefined;

export type AvatarProps = {
  alt: string;
  href?: string | null;
  imageSrc?: Maybe<string>;
  asChild?: boolean;
  fallback?: ReactNode;
};

export const Avatar = (props: AvatarProps) => {
  const { imageSrc, alt } = props;
  return (
    <AvatarPrimitive.Root>
      <>
        <AvatarPrimitive.Image
          className="border border-[hsl(0,0%,70%)] rounded-full"
          src={imageSrc ?? undefined}
          alt={alt}
        />
        <AvatarPrimitive.Fallback delayMs={600} asChild={props.asChild}>
          <>
            {props.fallback ? (
              props.fallback
            ) : (
              <img src={AVATAR_FALLBACK} alt={alt} />
            )}
          </>
        </AvatarPrimitive.Fallback>
      </>
    </AvatarPrimitive.Root>
  );
};

export default Avatar;
