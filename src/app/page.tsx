import dynamic from "next/dynamic";
import { Suspense } from "react";
import Hero from "@/components/home/hero";

const Partners = dynamic(() => import("@/components/home/partners"), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />,
  ssr: true,
});

const Stat = dynamic(() => import("@/components/home/stat"), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse" />,
  ssr: true,
});

const Services = dynamic(() => import("@/components/home/services"), {
  loading: () => <div className="h-screen bg-gray-100 animate-pulse" />,
  ssr: true,
});

const Testmonial = dynamic(() => import("@/components/home/testmonial"), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />,
  ssr: true,
});

const AdBanner = dynamic(() => import("@/components/home/ad"), {
  loading: () => <div className="h-32 bg-gray-100 animate-pulse" />,
  ssr: true,
});

export default function Home() {
  return (
    <div>
      <Hero />
      <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse" />}>
        <Partners />
      </Suspense>
      <Suspense
        fallback={<div className="h-screen bg-gray-100 animate-pulse" />}
      >
        <Services />
      </Suspense>
      <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse" />}>
        <Stat />
      </Suspense>
      <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse" />}>
        <Testmonial />
      </Suspense>
      <div className="px-6 md:px-14">
        <Suspense fallback={<div className="h-32 bg-gray-100 animate-pulse" />}>
          <AdBanner />
        </Suspense>
      </div>
    </div>
  );
}
