"use client";

import React from "react";

import { CommonProperties } from "@/lib/types/CommonProperties";
import { SideBar } from "./navigation/SideBar";

export type LayoutProps = {
  children: React.ReactNode;
};

export const Shell = (props: CommonProperties) => {
  const { children } = props;

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-1">
        <SideBar />
        <div className="flex w-0 flex-1 flex-col">
          <MainContainer>{children}</MainContainer>
        </div>
      </main>
    </div>
  );
};

export default function MainContainer(props: LayoutProps) {
  return (
    <main className="relative z-0 flex-1">
      <div className="max-w-full p-2 px-6 sm:py-5 lg:px-8">{props.children}</div>
    </main>
  );
}
