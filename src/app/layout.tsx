import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://veriattend.com"
  ),
  title: "VeriAttend — Attendance. Verified. Smarter. Simpler.",
  description:
    "VeriAttend is an AI-powered attendance management platform for universities and higher education institutions. Automate attendance, reduce fraud, and gain real-time academic insights.",
  keywords: [
    "attendance management",
    "university attendance",
    "QR attendance",
    "attendance verification",
    "higher education",
    "VeriAttend",
  ],
  authors: [{ name: "Patricia Shiloh Kanneh" }],
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "VeriAttend — Attendance. Verified. Smarter. Simpler.",
    description:
      "Intelligent attendance management platform for universities. Eliminate fraud, automate tracking, and gain real-time insights.",
    type: "website",
    locale: "en_US",
    siteName: "VeriAttend",
    images: [
      {
        url: "/images/veriAttend-main-logo.png",
        width: 1200,
        height: 630,
        alt: "VeriAttend",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VeriAttend — Attendance. Verified. Smarter. Simpler.",
    description:
      "Intelligent attendance management platform for universities.",
    images: ["/images/veriAttend-main-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
