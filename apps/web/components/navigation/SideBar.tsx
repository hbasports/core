import React from "react";
import { Search } from "lucide-react";

import { COMPANY_NAME } from "@hbasports/lib/constants";
import UserDropdown from "../shell/UserDropdown";
import Icon, { IconName } from "../Icon";
import { useSession } from "next-auth/react";

type NavigationItemType = {
  name: string;
  href: string;
  isLoading?: boolean;
  icon?: IconName;
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
};

const navItems: NavigationItemType[] = [
  {
    name: "Upcoming",
    href: "/upcoming",
    icon: "radio",
  },
  {
    name: "Players",
    href: "/players",
    icon: "user-circle",
  },
  {
    name: "Sports",
    href: "/sports",
    icon: "medal",
  },
  {
    name: "Teams",
    href: "/teams",
    icon: "users",
  },
  {
    name: "Organizations",
    href: "organizations",
    icon: "building",
  },
  {
    name: "Schedule",
    href: "/schedule",
    icon: "calendar",
  },
  {
    name: "Statistics",
    href: "/statistics",
    icon: "chart-scatter",
  },
  {
    name: "News",
    href: "/news",
    icon: "newspaper",
  },
];

export function SideBar() {
  return (
    <div className="relative">
      <aside className="sticky left-0 hidden h-full w-14 lg:w-56 lg:px-3 flex-col overflow-y-auto overflow-x-hidden max-h-screen border-r md:flex bg-[hsl(0,0%,95%)] border-[hsl(0,0%,90%)]">
        <div className="flex h-full flex-col justify-between py-3 lg:pt-4">
          <header className="items-center justify-between lg:flex">
            <div>
              <span className="hidden lg:inline">
                <UserDropdown />
              </span>
              <span className="hidden md:inline lg:hidden">
                <UserDropdown small />
              </span>
            </div>
            <div className="flex w-full">
              <button className="hover:bg-[hsl(0,0%,90%)] rounded-md flex group px-3 py-2 lg:px-2 cursor-pointer">
                <Search className="h-4 w-4 text-[hsl(0,0%,55%)]" />
              </button>
            </div>
          </header>
          <nav className="flex-1 mt-2 md:px-2 lg:mt-4 lg:px-0">
            <div>
              {navItems.map((item, index) => (
                <a
                  href={item.href}
                  className="px-2 py-1.5 flex text-sm w-full items-center hover:bg-[hsl(0,0%,90%)] rounded-md cursor-pointer text-[hsl(0,0%,20%)] mt-.5 justify-center"
                  key={index}
                >
                  {item.icon && (
                    <Icon
                      className="mr-2 h-4 w-4 shrink-0 md:ltr:mx-auto lg:ltr:mr-2"
                      name={item.icon as IconName}
                    />
                  )}
                  <span className="hidden lg:flex w-full font-[550]">
                    {item.name}
                  </span>
                </a>
              ))}
            </div>
          </nav>
        </div>
        <small className="mx-3 mb-2 mt-1 hidden text-[0.5rem] opacity-50 lg:block">
          &copy; {new Date().getFullYear()} {COMPANY_NAME} All rights reserved.
        </small>
      </aside>
    </div>
  );
}
