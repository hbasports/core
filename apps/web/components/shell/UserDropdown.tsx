"use client";

import React, { useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { User } from "next-auth";
import { useSession } from "next-auth/react";

import { Avatar } from "@/components/avatar/Avatar";
import { da } from "zod/v4/locales";

interface UserDropdownProps {
  user?: User;
  small?: boolean;
}

function UserDropdown({ user, small }: UserDropdownProps) {
  const { status, data } = useSession();

  return (
    <button className="hover:bg-[hsl(0,0%,90%)] group flex w-full cursor-pointer items-center rounded-full lg:rounded text-left outline-none transition px-2 py-1.5">
      <span className="h-5 w-5 rounded-full ltr:mr-2 rtl:ml-2">
        <Avatar
          imageSrc={data?.user.avatarUrl}
          alt={
            data?.user.username
              ? `${data.user.username} Avatar`
              : "Nameless User Avatar"
          }
        />
      </span>
      {!small && (
        <div className="flex w-full">
          <span className="flex grow items-center gap-2">
            <span className="w-24 shrink-0 text-sm leading-none">
              <span className="text-[#070a0d] block truncate py-0.5 font-[550] leading-normal">
                {status === "loading"
                  ? "Loading..."
                  : (data?.user.username ?? "Nameless User")}
              </span>
            </span>
            <ChevronDown className="w-4 h-4 shrink-0 text-[hsl(0,0%,60%)]" />
          </span>
        </div>
      )}
    </button>
  );
}

export default UserDropdown;
