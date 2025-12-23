import "./globals.css";
import Shell from "@/components/Shell";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Shell>
      {children}
    </Shell>
  );
}
