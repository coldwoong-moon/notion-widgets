import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { GoogleAdsense } from "@/components/GoogleAdsense";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Notion Widgets Gallery",
  description: "Beautiful embeddable widgets for your Notion pages",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID && (
          <GoogleAdsense pId={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID} />
        )}
        {children}
        <Toaster />
      </body>
    </html>
  );
}
