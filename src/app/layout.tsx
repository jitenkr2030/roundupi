import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RoundUPI – Invest with Every UPI Payment",
  description:
    "RoundUPI automatically rounds up your UPI transactions and invests the difference. Start building wealth with every payment you make.",
  keywords: [
    "RoundUPI",
    "UPI investment",
    "micro-investing",
    "fintech",
    "wealth building",
    "AI investing",
    "UPI automation",
    "financial growth",
  ],
  authors: [{ name: "RoundUPI Team" }],
  openGraph: {
    title: "RoundUPI – Invest with Every UPI Payment",
    description:
      "RoundUPI automatically rounds up your UPI transactions and invests the spare change to help you grow your wealth effortlessly.",
    url: "https://roundupi.in",
    siteName: "RoundUPI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RoundUPI – Invest with Every UPI Payment",
    description:
      "RoundUPI automatically rounds up your UPI transactions and invests the difference. Build wealth seamlessly with every payment.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
