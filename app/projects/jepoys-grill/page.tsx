"use client";

export default function JepoysGrillProjectPage() {
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
            Jepoy&apos;s Grill
          </h1>
          <p className="max-w-2xl text-sm sm:text-base text-white/65">
            A modern single-page website for a local restaurant, focused on appetizing visuals,
            clear menu presentation, and mobile-friendly browsing.
          </p>
        </header>

        <div className="space-y-8">
          <div className="overflow-hidden rounded-xl shadow-[0_40px_120px_rgba(0,0,0,0.9)]">
            <img
              src="/jepoysgrill.png"
              alt="Jepoy's Grill"
              className="w-full h-auto object-contain"
            />
          </div>

          <div className="grid gap-8 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
            <div className="space-y-4 text-sm sm:text-base text-white/75 leading-relaxed">
              <p>
                The site highlights the restaurant&apos;s identity with bold imagery, simple layout,
                and clear calls to action, making it easy for visitors to browse the menu and get a
                feel for the brand.
              </p>
              <p>
                It uses clean HTML, CSS, and JavaScript with careful attention to spacing, contrast,
                and typography to keep the experience quick and visually consistent across devices.
              </p>
            </div>
            <div className="space-y-4 text-sm">
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                  Stack
                </p>
                <p className="text-white/80">HTML · CSS · JavaScript</p>
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                  Role
                </p>
                <p className="text-white/80">Frontend development · UI design</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

