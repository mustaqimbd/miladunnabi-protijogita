import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { Metadata } from "next/types";
import InitGTM from "@/tracking/init/InitGTM";
import PageTracking from "@/tracking/init/PageTracking";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "রেজিস্ট্রেশন | মিলাদুন্নবী প্রতিযোগিতা",
  description: "বাংলাদেশ ইসলামি ছাত্র কাফেলা আয়োজিত জাতীয় মিলাদুন্নবী অলিম্পিয়াড ২০২৬",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <InitGTM />
        <Suspense fallback={null}>
          <PageTracking />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
