"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [logoEasterEgg, setLogoEasterEgg] = useState(false);
  const [activeProject, setActiveProject] = useState("tacloban");
  const menuContainerRef = useRef<HTMLDivElement>(null);
  const restoringMenuRef = useRef(false);

  const triggerLogoEasterEgg = () => {
    setLogoEasterEgg(true);
    setTimeout(() => setLogoEasterEgg(false), 800);
  };

  const roles = [
    "Full Stack Developer",
    "System Architecture & Solutions",
    "Creative Developer",
    "Frontend Enthusiast",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Restore menu open + scroll to projects when returning from a project page (back button)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("portfolio_return_to_menu") === "projects") {
      restoringMenuRef.current = true;
      sessionStorage.removeItem("portfolio_return_to_menu");
      setIsMenuOpen(true);
    }
  }, []);

  // Scroll to top only when not restoring menu (e.g. fresh load or direct nav to home)
  useEffect(() => {
    if (typeof window !== "undefined" && !restoringMenuRef.current) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, []);

  // When menu opens from back-navigation, scroll menu to projects section
  useEffect(() => {
    if (!isMenuOpen || !restoringMenuRef.current) return;
    const root = menuContainerRef.current;
    if (!root) return;
    const el = root.querySelector("#projects");
    if (el) {
      const raf = requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        restoringMenuRef.current = false;
      });
      return () => cancelAnimationFrame(raf);
    }
    restoringMenuRef.current = false;
  }, [isMenuOpen]);

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

  function useScrollReveal(
    rootRef: React.RefObject<HTMLElement | null>,
    isActive: boolean
  ) {
    const ref = useRef<HTMLElement | null>(null);
  
    useEffect(() => {
      if (!isActive) return;
      
      if (!isMenuOpen) {
        // Reset when menu closes
        if (ref.current) {
          ref.current.classList.remove("menu-reveal-active");
        }
        return;
      }
  
      const element = ref.current;
      const root = rootRef.current;
      if (!element || !root) return;
  
      // Only work with menu-reveal elements
      if (!element.classList.contains("menu-reveal")) return;
  
      let observer: IntersectionObserver | null = null;
      let timeoutId: NodeJS.Timeout;
      let rafId: number;
  
      // Reset state first
      element.classList.remove("menu-reveal-active");
  
      // Use double RAF to ensure DOM is fully updated
      rafId = requestAnimationFrame(() => {
        rafId = requestAnimationFrame(() => {
          // Check if element is initially visible
          const rect = element.getBoundingClientRect();
          const rootRect = root.getBoundingClientRect();
          
          const isInitiallyVisible = (
            rect.top < rootRect.bottom &&
            rect.bottom > rootRect.top &&
            rect.left < rootRect.right &&
            rect.right > rootRect.left &&
            rect.height > 0 &&
            rect.width > 0
          );

          if (isInitiallyVisible) {
            // Immediately reveal if visible (delay handled by CSS)
            element.classList.add("menu-reveal-active");
          }

          // Set up observer for scroll-based reveals (for elements not initially visible)
          observer = new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) {
                element.classList.add("menu-reveal-active");
                if (observer) observer.unobserve(element);
              }
            },
            {
              root,
              threshold: 0.1,
              rootMargin: "0px 0px -10% 0px",
            }
          );
    
          observer.observe(element);
        });
      });
  
      return () => {
        cancelAnimationFrame(rafId);
        if (observer) observer.disconnect();
      };
    }, [rootRef, isActive, isMenuOpen]);
  
    return ref;
  }
  
  const aboutRef = useScrollReveal(menuContainerRef, true);
  const journeyRef = useScrollReveal(menuContainerRef, true);
  const techRef = useScrollReveal(menuContainerRef, true);
  const projectsRef = useScrollReveal(menuContainerRef, true);
  const contactRef = useScrollReveal(menuContainerRef, true);
  
  
  const journeyRefs = useRef<HTMLDivElement[]>([]); // array of refs

// Scroll reveal for timeline items
useEffect(() => {
  if (!isMenuOpen) {
    // Reset timeline items when menu closes
    journeyRefs.current.forEach((el) => {
      if (el) el.classList.remove("timeline-reveal-active");
    });
    return;
  }

  const root = menuContainerRef.current;
  if (!root) return;

  const observers: IntersectionObserver[] = [];
  let rafId: number;

  // Use double RAF to ensure DOM is fully updated
  rafId = requestAnimationFrame(() => {
    rafId = requestAnimationFrame(() => {
      journeyRefs.current.forEach((el, index) => {
        if (!el) return;

        // Reset state
        el.classList.remove("timeline-reveal-active");

        // Check if initially visible
        const rect = el.getBoundingClientRect();
        const rootRect = root.getBoundingClientRect();

        const isInitiallyVisible = (
          rect.top < rootRect.bottom &&
          rect.bottom > rootRect.top &&
          rect.left < rootRect.right &&
          rect.right > rootRect.left &&
          rect.height > 0 &&
          rect.width > 0
        );

        if (isInitiallyVisible) {
          // Reveal immediately (delay handled by CSS class)
          el.classList.add("timeline-reveal-active");
        }

        // Set up observer for scroll-based reveals
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              el.classList.add("timeline-reveal-active");
              observer.unobserve(el);
            }
          },
          { 
            root,
            threshold: 0.1, 
            rootMargin: "0px 0px -10% 0px" 
          }
        );

        observer.observe(el);
        observers.push(observer);
      });
    });
  });

  return () => {
    cancelAnimationFrame(rafId);
    observers.forEach(observer => observer.disconnect());
  };
}, [isMenuOpen]);

  
  

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Loading Screen */}
      <div
        className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a] transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
          isLoading ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "linear-gradient(180deg, #080809 0%, #0c0c0c 100%)" }}
      >
        <div className="flex flex-col items-center gap-8">
          <div className="relative logo-loading group cursor-default">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm shadow-lg animate-pulse group-hover:animate-none group-hover:scale-110 group-hover:bg-white/20 transition-transform duration-300">
              <h2 className="text-4xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
                L
              </h2>
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
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
          <button
            onClick={triggerLogoEasterEgg}
            aria-label="Logo"
            className={`logo-nav group flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer ${logoEasterEgg ? "logo-easter-egg" : ""}`}
          >
            <h2 className="text-lg sm:text-xl font-bold whitespace-nowrap text-black transition-transform duration-300 group-hover:scale-110">
              L
            </h2>
          </button>
        </div>
        <div className="absolute right-4 top-4 sm:right-6 sm:top-6">
          <button
            onClick={toggleMenu}
            className={`flex items-center justify-center rounded-full h-9 sm:h-10 bg-white/20 backdrop-blur-sm transition-all duration-300 ease-out hover:bg-white/30 hover:scale-105 cursor-pointer ${
              isMenuOpen ? "w-9 sm:w-10 px-2 sm:px-2.5 gap-0" : "w-auto pl-4 pr-2.5 sm:pl-5 sm:pr-3 gap-2"
            }`}
            aria-label="Toggle menu"
          >
            <span
              className={`text-xs font-medium text-white/70 whitespace-nowrap overflow-hidden transition-all duration-300 ease-out ${
                isMenuOpen ? "max-w-0 opacity-0" : "max-w-[4.5rem] sm:max-w-[5rem] opacity-100"
              }`}
            >
              Click here
            </span>
            <div className="relative w-6 h-5 flex-shrink-0 flex items-center justify-center">
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
        className={`fixed inset-0 z-40 bg-[#0a0a0a] text-white overflow-y-auto transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Waves background (fixed so it doesn't scroll) */}
        <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
          <div className="hero-waves" />
        </div>

        {/* Menu Top Bar - Sticky (z-20 so it stays above scrolling content and links stay clickable) */}
        <div className="relative z-20 hidden md:block sticky top-0 bg-[#0a0a0a]/95 backdrop-blur-md">
          <div
            className={`mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 py-4 sm:py-6 transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
              isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <button
              onClick={triggerLogoEasterEgg}
              aria-label="Logo"
              className={`logo-menu group text-sm sm:text-base md:text-lg font-semibold text-white/80 truncate transition-transform duration-300 hover:text-white hover:scale-105 ${logoEasterEgg ? "logo-easter-egg" : ""}`}
            >
              Loren Lloyd Pingal
            </button>
            <div className="hidden md:flex items-center gap-4 lg:gap-6">
              {[
                { label: "About", href: "#about" },
                { label: "Journey", href: "#journey" }, 
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
          className={`relative z-10 mx-auto flex max-w-6xl flex-col px-4 sm:px-6 py-6 sm:py-10 transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
            isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >

          {/* About Section */}
          <section 
          ref={aboutRef}
          id="about" className="menu-reveal mb-16 space-y-8 py-0 min-h-[60vh] delay-[100ms]">
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
                <p className="text-base sm:text-lg font-medium text-white/50 uppercase tracking-wider">
                  Based in Tacloban City, Philippines
                </p>
                <p className="text-lg sm:text-xl leading-relaxed text-white/75">
                  I design and build solutions that scale—as a <strong className="text-white/90">Full Stack Developer</strong> with a focus on <strong className="text-white/90">system architecture</strong>. I turn complex requirements into clear, maintainable systems using Laravel and React, from event platforms and mobile apps with ML features to modern web products. I care about performance, clean structure, and outcomes that work for users and the business.
                </p>
                <p className="text-base sm:text-lg text-white/60 italic">
                  I&apos;m good at turning messy problems into clear, scalable solutions—from architecture to UI.
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

          {/* Developer Journey */}
          <section ref={journeyRef} id="journey" className="mb-16 space-y-10 py-16 delay-[200ms]">
            <p className="text-base sm:text-lg font-semibold uppercase tracking-[0.25em] text-white/60">
              My Journey
            </p>

            <div className="relative max-w-4xl mx-auto">
              {/* Vertical Line */}
              <div className="absolute left-4 top-0 h-full w-[2px] bg-white/10"></div>

              {/* Timeline Items */}
              {[
  {
    year: "2022 – 2023",
    title: "System Development Foundations",
    desc: "Built academic systems for school activities, focusing on logic, database structure, and problem-solving rather than UI-heavy applications.",
  },
  {
    year: "2024",
    title: "Web Development Focus",
    desc: "Started building modern websites using Laravel and React, improving UI/UX, responsiveness, and real-world usability.",
  },
  {
    year: "2025",
    title: "Mobile & Intelligent Apps",
    desc: "Developed mobile applications with machine learning and sentiment analysis, combining software engineering with data-driven features.",
  },
  {
    year: "Now",
    title: "Full Stack & System Architecture",
    desc: "Focusing on end-to-end solutions, system design, and production-ready applications—performance, scalability, and maintainability first.",
  },
].map((item, index) => {
  const delayClass = index === 0 ? "timeline-delay-200" : 
                     index === 1 ? "timeline-delay-300" : 
                     index === 2 ? "timeline-delay-400" : 
                     "timeline-delay-500";
  return (
    <div
      key={index}
      ref={(el) => {
        if (el) journeyRefs.current[index] = el;
      }}
      className={`relative flex gap-6 pl-12 pb-10 timeline-reveal ${delayClass}`}
    >
      <div className="absolute left-3 top-2 h-3 w-3 rounded-full bg-white"></div>

      <div className="space-y-2">
        <p className="text-sm text-white/50 font-medium">{item.year}</p>
        <h4 className="text-xl font-semibold text-white">{item.title}</h4>
        <p className="text-white/70 leading-relaxed max-w-2xl">{item.desc}</p>
      </div>
    </div>
  );
})}


            </div>
          </section>

          {/* Tech Stack — minimal, liquid, futuristic */}
          <section ref={techRef} id="tech" className="menu-reveal mb-16 py-10 delay-[300ms]">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/50 mb-8">
              Tech Stack
            </p>
            <div className="tech-liquid-wrap relative">
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                {[
                  { name: "Next.js", src: "/next_js_logo_icon_145038.png" },
                  { name: "React", src: "/React-icon.svg.png" },
                  { name: "JavaScript", src: "/javascript-logo-javascript-icon-transparent-free-png.webp" },
                  { name: "Laravel", src: "/Laravel.svg.png" },
                  { name: "PHP", src: "/PHP-logo.svg.png" },
                  { name: "Python", src: "/Python-logo-notext.svg.png" },
                ].map((tech, index) => (
                  <div
                    key={tech.name}
                    className="tech-liquid-pill group"
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    <div className="tech-liquid-glow" aria-hidden="true" />
                    <div className="flex items-center gap-2.5 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-sm">
                      <img
                        src={tech.src}
                        alt={tech.name}
                        className="h-6 sm:h-7 w-auto opacity-70 group-hover:opacity-100 transition-all duration-500"
                      />
                      <span className="text-xs sm:text-sm font-medium text-white/70 group-hover:text-white/90 transition-colors duration-500">
                        {tech.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Projects */}
          <section
            ref={projectsRef}
            id="projects"
            className="menu-reveal delay-[400ms] min-h-screen flex flex-col w-screen relative left-1/2 right-1/2 -ml-[50vw] px-4 sm:px-8 lg:px-16"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/60">
              Projects
            </p>

            <div className="mt-10 flex-1 grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] items-center">
              {/* Project names (left) */}
              <div className="flex flex-col gap-6 sm:gap-7 md:gap-8 items-start">
                {[
                  {
                    id: "tacloban",
                    name: "Tacloban Event Organizer",
                    route: "/projects/tacloban",
                  },
                  {
                    id: "platinum-crypto",
                    name: "Platinum Crypto",
                    route: "/projects/platinum-crypto",
                  },
                  {
                    id: "moodify",
                    name: "Moodify",
                    route: "/projects/moodify",
                  },
                  {
                    id: "jepoys",
                    name: "Jepoy's Grill",
                    route: "/projects/jepoys-grill",
                  },
                ].map((project) => {
                  const isActive = activeProject === project.id;
                  return (
                    <button
                      key={project.id}
                      type="button"
                      onMouseEnter={() => setActiveProject(project.id)}
                      onFocus={() => setActiveProject(project.id)}
                      onClick={() => {
                        sessionStorage.setItem("portfolio_return_to_menu", "projects");
                        router.push(project.route);
                      }}
                      className="group flex flex-col items-start text-left outline-none cursor-pointer"
                    >
                      <span
                        className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight transition-colors duration-300 uppercase ${
                          isActive
                            ? "text-red-500"
                            : "text-white/70 group-hover:text-red-400 group-focus:text-red-400"
                        }`}
                      >
                        {project.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Images (right) */}
              <div className="relative min-h-[260px] sm:min-h-[360px] md:min-h-[420px]">
                {/* Tacloban */}
                <div
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    activeProject === "tacloban"
                      ? "opacity-100 translate-x-0"
                      : "pointer-events-none opacity-0 translate-x-4"
                  }`}
                >
                  <img
                    src="/Tacloban Event Organizer.jpg"
                    alt="Tacloban Event Organizer"
                    className="w-full max-h-[480px] object-contain rounded-xl shadow-[0_40px_120px_rgba(0,0,0,0.9)]"
                  />
                </div>

                {/* Jepoy's Grill */}
                <div
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    activeProject === "jepoys"
                      ? "opacity-100 translate-x-0"
                      : "pointer-events-none opacity-0 translate-x-4"
                  }`}
                >
                  <img
                    src="/jepoysgrill.png"
                    alt="Jepoy's Grill"
                    className="w-full max-h-[480px] object-contain rounded-xl shadow-[0_40px_120px_rgba(0,0,0,0.9)]"
                  />
                </div>

                {/* Moodify */}
                <div
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    activeProject === "moodify"
                      ? "opacity-100 translate-x-0"
                      : "pointer-events-none opacity-0 translate-x-4"
                  }`}
                >
                  <img
                    src="/moodify.png"
                    alt="Moodify Playlist Generator"
                    className="w-auto max-w-[260px] sm:max-w-[320px] object-contain rounded-[1.75rem] shadow-[0_40px_120px_rgba(0,0,0,0.9)]"
                  />
                </div>

                {/* Platinum Crypto */}
                <div
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    activeProject === "platinum-crypto"
                      ? "opacity-100 translate-x-0"
                      : "pointer-events-none opacity-0 translate-x-4"
                  }`}
                >
                  <img
                    src="/Platinum_crypto.png"
                    alt="Platinum Crypto"
                    className="w-full max-h-[480px] object-contain rounded-xl shadow-[0_40px_120px_rgba(0,0,0,0.9)]"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section — centered, platforms aligned to contact info */}
          <section ref={contactRef} id="contact" className="menu-reveal contact-section relative flex flex-col items-center justify-center text-center mb-16 py-16 min-h-[70vh] delay-[500ms]">
            <p className="text-base sm:text-lg font-semibold uppercase tracking-[0.25em] text-white/60 mb-6">
              Contact
            </p>

            <h3 className="contact-headline text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-red-500 uppercase mb-6">
              CONTACT ME
            </h3>

            <p className="max-w-2xl text-lg sm:text-xl leading-relaxed text-white/75 mb-2">
              I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Feel free to reach out!
            </p>
            <p className="text-base text-white/50 mb-10">
              Based in Tacloban City, Philippines
            </p>

            {/* Platforms and contact info aligned, centered */}
            <div className="contact-links-row flex flex-wrap items-stretch justify-center gap-10 sm:gap-16">
              <a
                href="mailto:mccoldplay123@gmail.com"
                className="contact-link-pill flex flex-col items-center gap-1.5 min-w-[140px] sm:min-w-[180px] cursor-pointer group"
              >
                <span className="text-sm font-normal uppercase tracking-widest text-white/80 group-hover:text-white transition-colors duration-300">
                  Mail
                </span>
                <span className="text-sm font-normal text-white/50 group-hover:text-white/70 transition-colors duration-300">
                  mccoldplay123@gmail.com
                </span>
              </a>
              <a
                href="https://github.com/GhostTab"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link-pill flex flex-col items-center gap-1.5 min-w-[140px] sm:min-w-[180px] cursor-pointer group"
              >
                <span className="text-sm font-normal uppercase tracking-widest text-white/80 group-hover:text-white transition-colors duration-300">
                  GitHub
                </span>
                <span className="text-sm font-normal text-white/50 group-hover:text-white/70 transition-colors duration-300">
                  @GhostTab
                </span>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link-pill flex flex-col items-center gap-1.5 min-w-[140px] sm:min-w-[180px] cursor-pointer group"
              >
                <span className="text-sm font-normal uppercase tracking-widest text-white/80 group-hover:text-white transition-colors duration-300">
                  Facebook
                </span>
                <span className="text-sm font-normal text-white/50 group-hover:text-white/70 transition-colors duration-300">
                  Loren Lloyd Pingal
                </span>
              </a>
            </div>

            {/* Cute animated icon (bottom-right, peace sign position) */}
            <div className="contact-cute-icon absolute bottom-4 right-4 sm:bottom-8 sm:right-8 w-14 h-14 sm:w-16 sm:h-16 pointer-events-none" aria-hidden="true">
              <svg viewBox="0 0 24 24" className="w-full h-full contact-cute-icon-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6L12 2z" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1" strokeLinejoin="round"/>
              </svg>
            </div>

            <div className="mt-12 pt-12 border-t border-white/10 w-full max-w-xl">
              <p className="text-white/60 text-sm">
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
        style={{ background: "linear-gradient(180deg, #080809 0%, #0c0c0c 100%)" }}
      >
        <div className="hero-waves" aria-hidden="true" />
        <div className="relative z-10 mx-auto w-full max-w-9xl px-4 sm:px-6 md:px-8 lg:px-12">
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
