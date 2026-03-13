"use client";

export default function MoodifyProjectPage() {
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
            Moodify – Playlist Generator
          </h1>
          <p className="max-w-2xl text-sm sm:text-base text-white/65">
            A mobile application that uses sentiment analysis to build playlists that match how the
            listener feels in the moment.
          </p>
        </header>

        <div className="space-y-8">
          <div className="flex items-center justify-center overflow-hidden rounded-3xl shadow-[0_40px_120px_rgba(0,0,0,0.9)]">
            <img
              src="/moodify.png"
              alt="Moodify Playlist Generator"
              className="w-auto max-h-[520px] object-contain"
            />
          </div>

          <div className="grid gap-8 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
            <div className="space-y-4 text-sm sm:text-base text-white/75 leading-relaxed">
              <p>
                Moodify combines a clean mobile UI with a simple ML pipeline to classify mood and
                map it to curated tracks. The goal is to keep the interface calm and focused while
                the recommendation logic does the heavy lifting in the background.
              </p>
              <p>
                The project explores integrating Python-based models with a Kotlin Android client,
                including data preprocessing, model inference, and presenting results in a way that
                feels fast and intentional.
              </p>
            </div>
            <div className="space-y-4 text-sm">
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                  Stack
                </p>
                <p className="text-white/80">Python · Kotlin · Machine Learning</p>
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                  Role
                </p>
                <p className="text-white/80">Mobile development · ML integration</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

