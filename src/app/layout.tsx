import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} h-full overflow-hidden antialiased`}>
      <body className={`${geist.className} h-full overflow-hidden`}>{children}</body>
    </html>
  );
}
