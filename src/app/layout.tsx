import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { PerformanceMonitor } from "@/components/ui/performance-monitor";

// Optimize font loading by loading all weights in one instance
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

export const metadata: Metadata = {
  title: "Vision Vertex Solutions",
  description:
    "At Vision Vertex Solutions, we help businesses cut costs and scale faster with expert offshore development teams and tailored technology solutions. From software engineering to AI & data science, we deliver innovation you can trust — at a fraction of the cost.",
  keywords:
    "offshore development, software engineering, cloud DevOps, AI data science, training R&D, full stack development, cloud solutions, AI automation, business intelligence",
  authors: [{ name: "Vision Vertex" }],
  creator: "Vision Vertex",
  publisher: "Vision Vertex",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://visionvertex.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Vision Vertex Solutions",
    description: "Cutting Costs, Elevating Quality: Your Global Tech Partner",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vision Vertex Solutions",
    description: "Cutting Costs, Elevating Quality: Your Global Tech Partner",
  },
  icons: {
    icon: "/logos/logo.svg",
    apple: "/logos/logo.svg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.className}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
      </head>
      <body className="antialiased overflow-x-hidden">
        <PerformanceMonitor />
        <NavBar />
        <main className="overflow-x-hidden">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
