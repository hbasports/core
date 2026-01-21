import { Shell } from "@/components/Shell";
import { Montserrat } from "next/font/google";

import "@/styles/globals.css";

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
      <body className={montserrat.className}>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
