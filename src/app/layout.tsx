import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans, Sora } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { profile } from "@/content/profile";
import { siteUrl } from "@/lib/site";
import "./globals.css";

// Every route is static content; fail the build if request-time rendering creeps in.
export const ensureStatic = "navigation";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const description =
  "Flutter developer and software engineer building reliable, maintainable mobile apps integrated with real backends — REST and WebSocket APIs, Firebase, secure sessions and Arabic-first interfaces.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — ${profile.title}`,
    template: `%s — ${profile.shortName}`,
  },
  description,
  applicationName: `${profile.shortName} Portfolio`,
  authors: [{ name: profile.name, url: profile.github }],
  creator: profile.name,
  keywords: [
    "Flutter developer",
    "Dart",
    "mobile app developer",
    "software engineer",
    "Riverpod",
    "BLoC",
    "Clean Architecture",
    "Firebase",
    "REST API integration",
    profile.name,
    profile.alternateName,
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: profile.name,
    title: `${profile.name} — ${profile.title}`,
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.title}`,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050b18",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${jakarta.variable} ${sora.variable} ${jetbrains.variable} antialiased`}
    >
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-50 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
