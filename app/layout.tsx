import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { GoogleAdsense } from "@/components/GoogleAdsense";
import { SYSTEM_FONT_FAMILY } from "@/lib/constants";

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
      <body style={{ fontFamily: SYSTEM_FONT_FAMILY }} className="antialiased">
        {process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID && (
          <GoogleAdsense pId={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID} />
        )}
        {children}
        <Toaster />
      </body>
    </html>
  );
}
