import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

export const metadata: Metadata = {
  title: "Leylak Tech | Custom Software & AI Studio",
  description:
    "Leylak Tech is a full-spectrum digital solutions studio. From web and app development to custom software, AI integration, and automation.",
  keywords: [
    "digital solutions studio",
    "web development",
    "app development",
    "custom software",
    "ai integration",
    "automation",
  ],
  authors: [{ name: "Leylak Tech" }],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48', type: 'image/x-icon' },
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'icon', url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
  },
  openGraph: {
    title: "Leylak Tech | Custom Software & AI Studio",
    description:
      "From web and app development to custom software, AI integration, and automation.",
    type: "website",
    locale: "en_US",
    siteName: "Leylak Tech",
  },
  twitter: {
    card: "summary_large_image",
    title: "Leylak Tech | Custom Software & AI Studio",
    description: "From web and app development to custom software, AI integration, and automation.",
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
