import { SmoothScroll } from "@/components/SmoothScroll";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Orbitron } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Alejandro Acosta | Full Stack · NestJS & TypeScript",
  description:
    "Portfolio of Bryan Alejandro Acosta Vergara — Full Stack Developer. NestJS, GraphQL, PostgreSQL, React, and production systems.",
  openGraph: {
    title: "Alejandro Acosta | Full Stack Developer",
    description:
      "Production backends with NestJS & TypeScript. Urbano Sport Center, EduMonitor AI, and more.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#050508] text-zinc-200">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
