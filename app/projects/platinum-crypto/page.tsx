"use client";

export default function PlatinumCryptoProjectPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <section
        className="mx-auto flex min-h-screen max-w-5xl flex-col gap-10 px-4 py-24 sm:px-6 md:px-10"
        style={{ background: "linear-gradient(180deg, #080809 0%, #0c0c0c 100%)" }}
      >
        <header className="space-y-4">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-white/50">
            Project
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Platinum Crypto
          </h1>
          <p className="max-w-2xl text-sm sm:text-base text-white/65">
            A cryptocurrency tracking platform with real-time data, watchlists, and price alerts—focused on the coins you care about without the clutter.
          </p>
        </header>

        <div className="space-y-8">
          <div className="overflow-hidden rounded-xl shadow-[0_40px_120px_rgba(0,0,0,0.9)]">
            <img
              src="/Platinum_crypto.png"
              alt="Platinum Crypto"
              className="w-full h-auto object-contain"
            />
          </div>

          <div className="grid gap-8 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
            <div className="space-y-4 text-sm sm:text-base text-white/75 leading-relaxed">
              <p>
                Platinum offers a clean, modern interface for tracking crypto prices, saving favorites, and setting alerts. Real-time market data is presented in a simple table with coins, prices, 24h change, and market cap, with support for currency selection (e.g. PHP).
              </p>
              <p>
                The app emphasizes usability: search, watchlists, and alerts in one place so users can stay on top of the market without distraction. The design uses a soft gradient background and clear typography for a focused, professional experience.
              </p>
            </div>
            <div className="space-y-4 text-sm">
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                  Stack
                </p>
                <p className="text-white/80">React · Next.js · Real-time data · Modern UI</p>
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                  Role
                </p>
                <p className="text-white/80">Fullstack development · UI/UX</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
