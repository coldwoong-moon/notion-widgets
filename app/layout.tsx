import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { GoogleAdsense } from "@/components/GoogleAdsense";

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
      <body style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }} className="antialiased">
        {process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID && (
          <GoogleAdsense pId={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID} />
        )}
        {children}
        <Toaster />
      </body>
    </html>
  );
}
