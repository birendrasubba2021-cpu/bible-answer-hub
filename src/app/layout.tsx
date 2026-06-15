import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Source_Serif_4 } from "next/font/google";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import "./globals.css";
import { SITE } from "@/lib/content";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bibleanswerhub.org"),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "Bible Answer Hub provides trustworthy, scholarly, and accessible biblical answers to questions on Scripture, theology, apologetics, church history, Christian living, and contemporary issues.",
  keywords: [
    "Bible answers",
    "biblical questions",
    "theology",
    "apologetics",
    "Christian questions and answers",
    "systematic theology",
  ],
  openGraph: {
    title: `${SITE.name} — ${SITE.tagline}`,
    description:
      "The world's growing library of trustworthy, biblical answers to questions of faith, theology, and life.",
    siteName: SITE.name,
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 916,
        height: 699,
        alt: `${SITE.name} logo`,
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  icons: {
    icon: [{ url: "/logo-icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/logo-icon.png", type: "image/png" }],
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
      className={`${jakarta.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
