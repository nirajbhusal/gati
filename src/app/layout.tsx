import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_Devanagari } from "next/font/google";
import { AppShell } from "@/components/layout/AppShell";
import { ServiceWorkerRegister } from "@/components/layout/ServiceWorkerRegister";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const notoDevanagari = Noto_Sans_Devanagari({
  variable: "--font-noto-devanagari",
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Gati (गति) — Nepali Patro",
    template: "%s · Gati",
  },
  description:
    "Move with time. Understand the universe. Premium Nepali Patro with Bikram Sambat calendar, tithi, festivals, and tools.",
  applicationName: "Gati",
  keywords: [
    "Nepali calendar",
    "Bikram Sambat",
    "Patro",
    "Tithi",
    "Gati",
    "Nepal",
    "Panchang",
  ],
  authors: [{ name: "Gati" }],
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "192x192" }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Gati",
  },
  openGraph: {
    title: "Gati (गति) — Nepali Patro",
    description:
      "Move with time. Understand the universe. Nepali calendar, tithi & festivals.",
    type: "website",
    locale: "en_NP",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f4f0" },
    { media: "(prefers-color-scheme: dark)", color: "#07070c" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${notoDevanagari.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var p=localStorage.getItem('gati-preferences');if(!p)return;var j=JSON.parse(p);var s=j.state||j;var t=(s.theme)||'system';var dark=t==='dark'||(t==='system'&&matchMedia('(prefers-color-scheme:dark)').matches);document.documentElement.classList.toggle('dark',dark);document.documentElement.dataset.theme=dark?'dark':'light';var ts=s.textSize||'md';var map={sm:'0.9',md:'1',lg:'1.125',xl:'1.25'};document.documentElement.style.setProperty('--text-scale',map[ts]||'1');}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <AppShell>{children}</AppShell>
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
