import { Shell } from "@/components/Shell";
import { Montserrat } from "next/font/google";

import "@/styles/globals.css";
import Providers from "./providers";

const montserrat = Montserrat({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={montserrat.className}>{children}</body>
      </Providers>
    </html>
  );
}
