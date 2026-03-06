import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SuvYatra | Premium Travel Experience",
  description: "Nepal's most advanced bus booking platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased 
        bg-[#020617] text-slate-200 selection:bg-blue-500/30 selection:text-white`}
      >
        {/* GLOBAL BACKGROUND AMBIENCE */}
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
          {/* Top Right Glow */}
          <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px]" />
          {/* Bottom Left Glow */}
          <div className="absolute -bottom-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-600/10 blur-[120px]" />
          {/* Grainy Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>

        {/* NAVIGATION */}
        <Navbar />

        {/* MAIN CONTENT AREA */}
        {/* pt-24 ensures content starts below the fixed floating navbar */}
        <main className="relative min-h-screen pt-24">
          {children}
        </main>

        {/* FOOTER */}
        <Footer />

        {/* OPTIONAL: GLOBAL HOVER GLOW EFFECT (Client Component) */}
        {/* If you want a mouse-following glow, I can provide that too! */}
      </body>
    </html>
  );
}