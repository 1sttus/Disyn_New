import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { Providers } from "@/components/Providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DISYN | Creative SaaS Portfolio & Design Hub",
  description: "A conversion-focused creative SaaS system, digital CV, client acquisition engine, and premium design portfolio.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} scroll-smooth dark`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen bg-primary-bg text-gray-100 font-sans antialiased selection:bg-accent-cyan selection:text-primary-bg">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
