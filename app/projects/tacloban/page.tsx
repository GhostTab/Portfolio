"use client";

export default function TaclobanProjectPage() {
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
            Tacloban Event Organizer
          </h1>
          <p className="max-w-2xl text-sm sm:text-base text-white/65">
            A city-wide events management platform for bookings, schedules, and vendor coordination
            designed for local organizers in Tacloban City.
          </p>
        </header>

        <div className="space-y-8">
          <div className="overflow-hidden rounded-3xl shadow-[0_40px_120px_rgba(0,0,0,0.9)]">
            <img
              src="/Tacloban Event Organizer.jpg"
              alt="Tacloban Event Organizer"
              className="w-full h-full max-h-[520px] object-cover"
            />
          </div>

          <div className="grid gap-8 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
            <div className="space-y-4 text-sm sm:text-base text-white/75 leading-relaxed">
              <p>
                This platform centralizes event creation, scheduling, and management for local
                organizers. It supports venue coordination, vendor management, and attendee
                information with a focus on clarity and reliability instead of visual clutter.
              </p>
              <p>
                Built with Laravel and Bootstrap, the system emphasizes straightforward flows and
                a responsive layout so both admins and guests can navigate quickly from desktop or
                mobile.
              </p>
            </div>
            <div className="space-y-4 text-sm">
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                  Stack
                </p>
                <p className="text-white/80">Laravel · Bootstrap · PHP · MySQL</p>
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                  Role
                </p>
                <p className="text-white/80">Fullstack development · UI implementation</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

