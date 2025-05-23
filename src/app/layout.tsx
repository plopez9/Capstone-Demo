import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SideNav from "./components/SideNav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pedro's Demo Site     ",
  description: "A demo app to illustrate SWE frontend principals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SideNav />
        {children}
      </body>
    </html>
  );
}
