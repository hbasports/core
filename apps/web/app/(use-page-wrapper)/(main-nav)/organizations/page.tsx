import { Metadata } from "next";
import React from "react";

import ShellMain from "@/app/(use-page-wrapper)/ShellMain";
import OrganizationListingView from "@/modules/organizations/OrganizationListingView";
import { OrganizationsCTA } from "./views/organization-listing-view";
import { auth } from "@/auth";
import { NextRequest } from "next/server";

export const metadata: Metadata = {
  title: "Organizations | HBA SPORTS",
};

const ServerPage = async (req: NextRequest) => {
  const session = await auth();

  console.log(session);

  return (
    <ShellMain
      heading="Organizations"
      subtitle="Create and edit/view organizations you're involved in."
      CTA={<OrganizationsCTA />}
    >
      <OrganizationListingView />
    </ShellMain>
  );
};

export default ServerPage;
