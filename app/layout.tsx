import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

export const metadata: Metadata = {
  title: "Arcade Studios | Web Development Agency",
  description:
    "Award-winning web development agency building modern applications, digital products, and innovative solutions. Transforming ideas into exceptional digital experiences.",
  keywords: [
    "web development agency",
    "digital products",
    "web applications",
    "next.js development",
    "react development",
    "creative agency",
    "technology studio",
    "award-winning agency",
  ],
  authors: [{ name: "Arcade Studios" }],
  openGraph: {
    title: "Arcade Studios | Web Development Agency",
    description:
      "Award-winning web development agency transforming ideas into exceptional digital experiences.",
    type: "website",
    locale: "en_US",
    siteName: "Arcade Studios",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arcade Studios | Web Development Agency",
    description: "Award-winning web development agency building exceptional digital experiences.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="antialiased bg-black text-gray-900">
        <SmoothScrollProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
