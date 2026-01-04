import "./globals.css";
import Shell from "@/components/Shell";

import {Montserrat} from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin']
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Shell className={montserrat.className}>
      {children}
    </Shell>
  );
}
