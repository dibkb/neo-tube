import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import HomeNavbar from "@/components/navbar/home-navbar";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NeoTube",
  description: "YouTube on steroids 💪",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} antialiased`}>
        <HomeNavbar />
        <div className="container mx-auto">{children}</div>
      </body>
    </html>
  );
}
