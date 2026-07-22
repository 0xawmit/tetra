import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tetra — Join the Waitlist",
  description:
    "Tetra is coming soon. Join the waitlist for early access to the next generation of crypto.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className={`${geist.className} min-h-full`}>{children}</body>
    </html>
  );
}
