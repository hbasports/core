import React from "react";

import { CommonProperties } from "@/lib/types/CommonProperties";

const Shell = (props: CommonProperties) => {
  const { children } = props;

  return (
    <html>
      <head>
        <meta
          charSet="utf-8"
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
      </head>
      <body {...props}>{children}</body>
    </html>
  );
};

export default Shell;
