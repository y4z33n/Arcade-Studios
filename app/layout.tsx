import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import { GeminiVoiceProvider } from "@/components/providers/GeminiVoiceProvider";
import GlobalOrb from "@/components/ui/GlobalOrb";
import FloatingCTA from "@/components/layout/FloatingCTA";

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
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Leylak Tech",
              "url": "https://leylaktech.com",
              "logo": "https://leylaktech.com/icon-192.png",
              "description": "Leylak Tech is a full-spectrum digital solutions studio. From web and app development to custom software, AI integration, and automation."
            })
          }}
        />
      </head>
      <body className="antialiased bg-black text-gray-900">
        <GeminiVoiceProvider>
          <SmoothScrollProvider>
            <Navbar />
            <main className="relative">{children}</main>
            <GlobalOrb />
            <FloatingCTA />
            <Footer />
          </SmoothScrollProvider>
        </GeminiVoiceProvider>
      </body>
    </html>
  );
}
