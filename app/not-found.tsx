import Link from "next/link";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-[#111] text-white">
      <Navbar />

      <main className="max-w-180 mx-auto px-4 sm:px-6 pt-32 sm:pt-36 pb-20 sm:pb-24">
        <div className="text-center">
          <div className="editorial-title text-[120px] sm:text-[170px] md:text-[220px] leading-none tracking-tight text-transparent bg-clip-text bg-linear-to-b from-white/90 via-[#d4c5a9]/70 to-white/50">
            404
          </div>
          <div className="w-20 h-0.75 bg-[#d4c5a9] mx-auto mt-4 mb-7" />

          <h1 className="editorial-title text-2xl sm:text-3xl">
            Page Not Found
          </h1>
          <p className="body-text text-white/70! text-sm sm:text-base mt-3 max-w-xl mx-auto">
            The page you are looking for has been moved, deleted, or possibly
            never existed.
          </p>

          <div className="mt-10">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-light tracking-wide bg-white text-[#111] hover:bg-[#f5f5f5] transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
