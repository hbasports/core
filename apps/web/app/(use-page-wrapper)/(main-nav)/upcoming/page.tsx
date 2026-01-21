import { Metadata } from "next";
import React from "react";
import { Plus } from "lucide-react";

import ShellMain from "../../ShellMain";
import Button from "@/components/button/Button";

export const metadata: Metadata = {
  title: "Upcoming | HBA SPORTS",
};

function ServerPage() {
  return (
    <ShellMain
      heading="Upcoming Events"
      subtitle="Create sporting events to group all event actions."
      CTA={
        <Button
          color="primary"
          CustomStartIcon={<Plus width={16} height={16} />}
        >
          New
        </Button>
      }
    >
      <h1>test</h1>
    </ShellMain>
  );
}

export default ServerPage;
