import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

export const metadata: Metadata = {
  title: "Leylak | Digital Solutions Studio",
  description:
    "Leylak is a full-spectrum digital solutions studio. Every problem your brand faces online — we solve it. Web, branding, motion, 3D, e-commerce, and beyond.",
  keywords: [
    "digital solutions studio",
    "digital agency",
    "web design and development",
    "branding agency",
    "creative studio",
    "e-commerce solutions",
    "motion design",
    "3D design",
  ],
  authors: [{ name: "Leylak" }],
  openGraph: {
    title: "Leylak | Digital Solutions Studio",
    description:
      "Every digital problem your brand faces — we solve it. Web, branding, motion, 3D, and beyond.",
    type: "website",
    locale: "en_US",
    siteName: "Leylak",
  },
  twitter: {
    card: "summary_large_image",
    title: "Leylak | Digital Solutions Studio",
    description: "Every digital problem your brand faces — we solve it. Web, branding, motion, 3D, and beyond.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={GeistSans.className}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      </head>
      <body className="antialiased bg-black text-gray-900">
        <SmoothScrollProvider>
          <Navbar />
          <main className="relative">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
