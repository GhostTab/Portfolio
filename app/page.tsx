"use client";

import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const menuContainerRef = useRef<HTMLDivElement>(null);

  const roles = [
    "Fullstack Web Developer",
    "Aspiring Software Engineer",
    "Frontend Enthusiast",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Loading screen animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToSection = (href: string) => {
    if (menuContainerRef.current) {
      const element = menuContainerRef.current.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0c10] text-white">
      {/* Loading Screen */}
      <div
        className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#0b0c10] transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
          isLoading ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "linear-gradient(180deg, #0b0c10 0%, #0f1118 100%)" }}
      >
        <div className="flex flex-col items-center gap-8">
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm shadow-lg animate-pulse">
              <h2 className="text-4xl font-bold text-white">
                L
              </h2>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-20 w-20 rounded-full border-2 border-white/20 border-t-white/60 animate-spin"></div>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="h-2 w-2 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="h-2 w-2 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="h-2 w-2 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>

      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="absolute left-4 top-4 sm:left-6 sm:top-6">
          <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-lg">
            <h2 className="text-lg sm:text-xl font-bold whitespace-nowrap text-black">
              L
            </h2>
          </div>
        </div>
        <div className="absolute right-4 top-4 sm:right-6 sm:top-6">
          <button
            onClick={toggleMenu}
            className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all duration-500 ease-in-out hover:bg-white/30 hover:scale-110"
            aria-label="Toggle menu"
          >
              <div className="relative h-5 w-6">
                <span
                  className={`absolute left-0 h-0.5 w-6 rounded-full bg-white transition-all duration-500 ease-in-out ${
                    isMenuOpen ? "top-2 rotate-45" : "top-0 rotate-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-2 h-0.5 w-6 rounded-full bg-white transition-all duration-500 ease-in-out ${
                    isMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 h-0.5 w-6 rounded-full bg-white transition-all duration-500 ease-in-out ${
                    isMenuOpen ? "top-2 -rotate-45" : "top-4 rotate-0"
                  }`}
                />
              </div>
            </button>
        </div>
      </nav>

      {/* Full Screen Menu */}
      <div
        ref={menuContainerRef}
        className={`fixed inset-0 z-40 bg-[#0b0c10] text-white overflow-y-auto transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Menu Top Bar - Sticky */}
        <div className="hidden md:block sticky top-0 z-10 bg-[#0b0c10]/95 backdrop-blur-md border-b border-white/10">
          <div
            className={`mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 py-4 sm:py-6 transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
              isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <div className="text-sm sm:text-base md:text-lg font-semibold text-white/80 truncate">Loren Lloyd Pingal</div>
            <div className="hidden md:flex items-center gap-4 lg:gap-6">
              {[
                { label: "About", href: "#about" },
                { label: "Tech", href: "#tech" },
                { label: "Projects", href: "#projects" },
                { label: "Contact", href: "#contact" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className="group relative text-xs sm:text-sm font-medium text-white/80 transition-colors duration-300 hover:text-white cursor-pointer"
                >
                  <span>{item.label}</span>
                  <span className="absolute left-0 -bottom-1 h-[2px] w-full origin-left scale-x-0 bg-white transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Content */}
        <div
          className={`mx-auto flex max-w-6xl flex-col px-4 sm:px-6 py-6 sm:py-10 transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
            isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >

          {/* About Section */}
          <section id="about" className="mb-16 space-y-8 py-16 min-h-[60vh]">
            <p className="text-base sm:text-lg font-semibold uppercase tracking-[0.25em] text-white/60">
              About
            </p>
            <div className="flex flex-col items-center space-y-8">
              <div className="relative">
                <img
                  src="/profile.jpg"
                  alt="Loren Lloyd Pingal"
                  className="w-48 h-48 sm:w-56 sm:h-56 rounded-full object-cover border-4 border-white/20 shadow-2xl"
                />
              </div>
              <div className="text-center space-y-6 max-w-3xl">
                <h3 className="text-4xl sm:text-5xl font-bold text-white">
                  Hi, I'm Loren Lloyd Pingal
                </h3>
                <p className="text-lg sm:text-xl leading-relaxed text-white/75">
                  I am a web developer with over two years of experience building modern web
                  applications. I primarily work with Laravel and React, focusing on creating clean,
                  functional, and user-friendly systems. I have developed organizer platforms and
                  mobile applications that integrate machine learning and AI features. Currently, I am
                  strengthening my skills in modern website development, with an emphasis on
                  performance, design, and real-world usability.
                </p>
                <a
                  href="/Loren Lloyd pingal.pdf"
                  download="Loren-Lloyd-Pingal-Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 text-white font-medium"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download CV
                </a>
              </div>
            </div>
          </section>

          {/* Tech Stack */}
          <section id="tech" className="mb-16 space-y-6 py-10">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/60">
              Tech Stack
            </p>
            <div className="relative overflow-hidden py-8">
              <div className="tech-slide-track flex items-center gap-12 w-max">
                {[
                  { name: "Next.js", src: "/next_js_logo_icon_145038.png" },
                  { name: "React", src: "/React-icon.svg.png" },
                  { name: "Laravel", src: "/Laravel.svg.png" },
                  { name: "Python", src: "/Python-logo-notext.svg.png" },
                  { name: "PHP", src: "/PHP-logo.svg.png" },
                  { name: "JavaScript", src: "/javascript-logo-javascript-icon-transparent-free-png.webp" },
                ].map((tech, index) => (
                  <div
                    key={`${tech.name}-1`}
                    className="flex items-center justify-center flex-shrink-0"
                  >
                    <img
                      src={tech.src}
                      alt={tech.name}
                      className="h-12 sm:h-16 w-auto opacity-70 transition-all duration-300 hover:opacity-100 hover:scale-110"
                    />
                  </div>
                ))}
                {[
                  { name: "Next.js", src: "/next_js_logo_icon_145038.png" },
                  { name: "React", src: "/React-icon.svg.png" },
                  { name: "Laravel", src: "/Laravel.svg.png" },
                  { name: "Python", src: "/Python-logo-notext.svg.png" },
                  { name: "PHP", src: "/PHP-logo.svg.png" },
                  { name: "JavaScript", src: "/javascript-logo-javascript-icon-transparent-free-png.webp" },
                ].map((tech, index) => (
                  <div
                    key={`${tech.name}-2`}
                    className="flex items-center justify-center flex-shrink-0"
                  >
                    <img
                      src={tech.src}
                      alt={tech.name}
                      className="h-12 sm:h-16 w-auto opacity-70 transition-all duration-300 hover:opacity-100 hover:scale-110"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Projects */}
          <section id="projects" className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/60">
              Projects
            </p>
            <div className="space-y-8">
              {/* Tacloban Event Organizer - Image Left, Text Right */}
              <a 
                href="https://github.com/GhostTab/localeventorganizer.git" 
                target="_blank" 
                rel="noopener noreferrer"
                className="project-card group flex flex-col md:flex-row-reverse gap-6 rounded-2xl bg-transparent backdrop-blur-sm cursor-pointer transition-all duration-300 hover:scale-[1.07]"
              >
                <div className="flex-1 flex flex-col justify-center p-6 md:p-8 space-y-4">
                  <h4 className="text-2xl font-semibold text-white">Tacloban Event Organizer</h4>
                  <p className="text-base text-white/70 leading-relaxed">
                    Events management platform for Tacloban, handling bookings, schedules, and vendor coordination. A comprehensive system for managing local events with seamless user experience.
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs text-white/60">
                    <span className="rounded-full bg-white/10 px-3 py-1">Laravel</span>
                    <span className="rounded-full bg-white/10 px-3 py-1">Bootstrap</span>
                    <span className="rounded-full bg-white/10 px-3 py-1">PHP</span>
                  </div>
                </div>
                <div className="flex-1 flex items-center justify-center p-6 md:p-8">
                  <img
                    src="/Tacloban Event Organizer.jpg"
                    alt="Tacloban Event Organizer"
                    className="w-full h-auto rounded-lg object-cover shadow-lg"
                  />
                </div>
              </a>

              {/* Jepoy's Grill - Text Left, Image Right */}
              <a 
                href="https://act2-artoza-inalisan-lasagas-penalosa.netlify.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="project-card group flex flex-col md:flex-row gap-6 rounded-2xl bg-transparent backdrop-blur-sm cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[1.07]"
              >
                <div className="flex-1 flex flex-col justify-center p-6 md:p-8 space-y-4">
                  <h4 className="text-2xl font-semibold text-white">Jepoy's Grill</h4>
                  <p className="text-base text-white/70 leading-relaxed">
                    A modern restaurant website featuring an elegant design, menu display, and seamless user experience. Showcasing the restaurant's offerings with a clean and appetizing interface.
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs text-white/60">
                    <span className="rounded-full bg-white/10 px-3 py-1">HTML</span>
                    <span className="rounded-full bg-white/10 px-3 py-1">CSS</span>
                    <span className="rounded-full bg-white/10 px-3 py-1">JavaScript</span>
                  </div>
                </div>
                <div className="flex-1 flex items-center justify-center p-6 md:p-8">
                  <img
                    src="/jepoysgrill.png"
                    alt="Jepoy's Grill"
                    className="w-full h-auto rounded-lg object-cover shadow-lg"
                  />
                </div>
              </a>

              {/* Moodify - Text Left, Image Right (Small Image) */}
              <a 
                href="https://github.com/GhostTab/MoodifySentiment.git" 
                target="_blank" 
                rel="noopener noreferrer"
                className="project-card group flex flex-col md:flex-row-reverse gap-6 rounded-2xl bg-transparent backdrop-blur-sm cursor-pointer overflow-hidden transition-all duration-300  hover:scale-[1.07]"
              >
                <div className="flex-1 flex flex-col justify-center p-6 md:p-8 space-y-4">
                  <h4 className="text-2xl font-semibold text-white">Moodify – Playlist Generator</h4>
                  <p className="text-base text-white/70 leading-relaxed">
                    Personalized playlists based on mood with smart recommendations and a focused UI. A mobile application that integrates machine learning to create music playlists tailored to your emotional state.
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs text-white/60">
                    <span className="rounded-full bg-white/10 px-3 py-1">Python</span>
                    <span className="rounded-full bg-white/10 px-3 py-1">Kotlin</span>
                    <span className="rounded-full bg-white/10 px-3 py-1">Machine Learning</span>
                  </div>
                </div>
                <div className="flex items-center justify-center p-6 md:p-8">
                  <img
                    src="/moodify.png"
                    alt="Moodify Playlist Generator"
                    className="w-25 h-auto max-w-xs rounded-lg object-cover shadow-lg"
                  />
                </div>
              </a>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="mb-16 space-y-8 py-16 min-h-[60vh]">
            <p className="text-base sm:text-lg font-semibold uppercase tracking-[0.25em] text-white/60">
              Contact
            </p>
            <h3 className="text-4xl sm:text-5xl font-bold text-white">
              Let's Work Together
            </h3>
            <p className="max-w-3xl text-lg sm:text-xl leading-relaxed text-white/75 mb-12">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Feel free to reach out!
            </p>
            
            <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl">
              {/* Email */}
              <a
                href="mailto:mccoldplay123@gmail.com"
                className="group flex items-center gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-300 flex-shrink-0">
                  <svg className="h-5 w-5 sm:h-6 sm:w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-white/60 uppercase tracking-wide">Email</p>
                  <p className="text-sm sm:text-base md:text-lg font-medium text-white group-hover:text-white transition-colors truncate">mccoldplay123@gmail.com</p>
                </div>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/GhostTab"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-300 flex-shrink-0">
                  <svg className="h-5 w-5 sm:h-6 sm:w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.532 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.197 22 16.425 22 12.017 22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-white/60 uppercase tracking-wide">GitHub</p>
                  <p className="text-sm sm:text-base md:text-lg font-medium text-white group-hover:text-white transition-colors">@GhostTab</p>
                </div>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-300 flex-shrink-0">
                  <svg className="h-5 w-5 sm:h-6 sm:w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-white/60 uppercase tracking-wide">Facebook</p>
                  <p className="text-sm sm:text-base md:text-lg font-medium text-white group-hover:text-white transition-colors truncate">Loren Lloyd Pingal</p>
                </div>
              </a>
            </div>

            <div className="mt-12 pt-12 border-t border-white/10">
              <p className="text-center text-white/60 text-sm">
                © {new Date().getFullYear()} Loren Lloyd Pingal. All rights reserved.
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* Hero Section */}
      <section 
        className={`relative flex min-h-screen items-center justify-center pt-20 transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
          isMenuOpen ? "opacity-0 scale-95 blur-sm" : isLoading ? "opacity-0" : "opacity-100 scale-100 blur-0"
        }`}
        style={{ background: "linear-gradient(180deg, #0b0c10 0%, #0f1118 100%)" }}
      >
        <div className="mx-auto w-full max-w-9xl px-4 sm:px-6 md:px-8 lg:px-12">
          <header className="flex flex-col items-center text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-extrabold leading-[0.9] text-white">
              Loren Lloyd Pingal
            </h1>
            <div className="mt-8 h-12 sm:h-14 md:h-16 overflow-hidden flex items-center justify-center">
              <p
                key={currentRole}
                className="text-2xl font-medium text-white/90 sm:text-3xl md:text-4xl"
                style={{
                  animation: 'fadeIn 0.8s ease-in-out',
                }}
              >
                {roles[currentRole]}
              </p>
            </div>
          </header>
        </div>
      </section>
    </div>
  );
}
