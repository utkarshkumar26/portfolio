"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  Command,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Menu,
  Send,
  Sparkles,
  Terminal,
  X,
} from "lucide-react";
import {
  type FormEvent,
  type MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  achievements,
  experience,
  navigation,
  projects,
  profile,
  skillGroups,
  stats,
} from "@/data/portfolio";
import { HeroNetwork } from "@/components/hero-network";

type Project = (typeof projects)[number];

function SectionLabel({ number, children }: { number: string; children: string }) {
  return (
    <p className="section-label">
      <span className="label-mark">{"//"}</span> {number} — {children}
    </p>
  );
}

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Counter({ value, label }: { value: string; label: string }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();
  const numeric = Number(value.replace(/[^\d]/g, ""));
  const prefix = value.startsWith("~") ? "~" : "";
  const suffix = value.replace(/[\d~]/g, "");

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        if (reducedMotion) {
          setCount(numeric);
          return;
        }
        const startedAt = performance.now();
        const duration = 1050;
        const tick = (now: number) => {
          const progress = Math.min((now - startedAt) / duration, 1);
          setCount(Math.round(numeric * (1 - (1 - progress) ** 3)));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [numeric, reducedMotion]);

  return (
    <div className="stat-card hud-card">
      <span ref={elementRef} className="stat-value" aria-label={value}>
        {prefix}{count}{suffix}
      </span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

function useTypewriter(reducedMotion: boolean | null) {
  const [name, setName] = useState(reducedMotion ? profile.name : "");
  const [roleIndex, setRoleIndex] = useState(0);
  useEffect(() => {
    if (reducedMotion) {
      setName(profile.name);
      return;
    }
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setName(profile.name.slice(0, index));
      if (index >= profile.name.length) window.clearInterval(timer);
    }, 78);
    return () => window.clearInterval(timer);
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;
    const timer = window.setInterval(
      () => setRoleIndex((index) => (index + 1) % profile.roles.length),
      2900,
    );
    return () => window.clearInterval(timer);
  }, [reducedMotion]);

  return { name, role: profile.roles[roleIndex] };
}

function Hero() {
  const reducedMotion = useReducedMotion();
  const { name, role } = useTypewriter(reducedMotion);

  return (
    <section id="top" className="hero-section page-section" aria-labelledby="hero-title">
      <div className="hero-ambient hero-ambient-one" aria-hidden="true" />
      <div className="hero-ambient hero-ambient-two" aria-hidden="true" />
      <HeroNetwork />
      <div className="hero-content content-width">
        <Reveal>
          <div className="availability">
            <span className="status-dot" />
            {profile.availability}
          </div>
          <p className="hero-overline">{profile.role.toUpperCase()} <span>·</span> {profile.location.toUpperCase()}</p>
          <h1 id="hero-title" className="hero-title">
            <span className="sr-only">{profile.name}</span>
            <span aria-hidden="true">{name}<span className="type-caret" /></span>
          </h1>
          <p className="hero-role" aria-live="polite">
            <span className="role-bracket">[</span> {role}{" "}
            <span className="role-bracket">]</span>
          </p>
          <p className="hero-pitch">{profile.pitch}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">
              View Projects <ArrowDownRight size={16} aria-hidden="true" />
            </a>
            <a className="button button-ghost" href={profile.resume}>
              Download Resume <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            <a className="button button-quiet" href="#contact">
              Contact Me <ArrowRight size={15} aria-hidden="true" />
            </a>
          </div>
          <div className="hero-socials" aria-label="Social links">
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub profile">
              <Github size={18} aria-hidden="true" /><span>GITHUB</span>
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
              <Linkedin size={18} aria-hidden="true" /><span>LINKEDIN</span>
            </a>
            <a href={`mailto:${profile.email}`} aria-label={`Email ${profile.email}`}>
              <Mail size={18} aria-hidden="true" /><span>EMAIL</span>
            </a>
          </div>
        </Reveal>
      </div>
      <div className="hero-index" aria-hidden="true">01 / 07</div>
      <a href="#about" className="scroll-cue" aria-label="Scroll to About section">
        SCROLL TO EXPLORE <span />
      </a>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="page-section section-pad" aria-labelledby="about-title">
      <div className="content-width">
        <Reveal>
          <SectionLabel number="01">ABOUT</SectionLabel>
          <div className="section-heading-row">
            <h2 id="about-title">Engineering <span>with intent.</span></h2>
            <span className="heading-aside">A LITTLE ABOUT ME <ArrowDownRight size={16} /></span>
          </div>
          <p className="about-copy">{profile.summary}</p>
          <p className="education-line"><span>EDUCATION //</span> {profile.education}</p>
        </Reveal>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.07}>
              <Counter value={stat.value} label={stat.label} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="page-section section-pad" aria-labelledby="experience-title">
      <div className="content-width">
        <Reveal>
          <SectionLabel number="02">EXPERIENCE</SectionLabel>
          <div className="section-heading-row">
            <h2 id="experience-title">Where I <span>make impact.</span></h2>
            <span className="heading-aside">CAREER TIMELINE <span className="tiny-cross">+</span></span>
          </div>
        </Reveal>
        <Reveal>
          <article className="timeline-card hud-card">
            <div className="timeline-spine" aria-hidden="true"><span /></div>
            <div className="experience-head">
              <div>
                <p className="eyebrow">{experience.dates} <span>·</span> {experience.location}</p>
                <h3>{experience.role}</h3>
                <p className="experience-company">{experience.company} <span>/</span> {experience.team}</p>
              </div>
              <span className="experience-mark" aria-label="Current role">NOW</span>
            </div>
            <ul className="highlight-list">
              {experience.highlights.map((highlight) => (
                <li key={highlight}><Check size={15} aria-hidden="true" /><span>{highlight}</span></li>
              ))}
            </ul>
            <div className="chip-list" aria-label="Technologies used">
              {experience.technologies.map((tech) => <span className="tech-chip" key={tech}>{tech}</span>)}
            </div>
            <span className="card-corner card-corner-top" aria-hidden="true" />
            <span className="card-corner card-corner-bottom" aria-hidden="true" />
          </article>
        </Reveal>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (project: Project) => void;
}) {
  const onPointerMove = (event: MouseEvent<HTMLElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.transform =
      `perspective(1000px) rotateX(${-y * 3}deg) rotateY(${x * 3}deg) translateY(-3px)`;
  };

  const onPointerLeave = (event: MouseEvent<HTMLElement>) => {
    event.currentTarget.style.transform = "";
  };

  return (
    <article
      className={`project-card hud-card ${project.featured ? "project-featured" : ""}`}
      onMouseMove={onPointerMove}
      onMouseLeave={onPointerLeave}
    >
      <div className="project-topline">
        <span>{project.eyebrow}</span>
        <span className="project-signal"><span className="status-dot" /> CASE STUDY</span>
      </div>
      <button className="project-open" onClick={() => onOpen(project)} aria-label={`Open ${project.name} case study`}>
        <span className="project-name">{project.name}</span>
        <span className="project-title">{project.title}</span>
        <span className="project-description">{project.description}</span>
        <span className="project-details-link">EXPLORE CASE STUDY <ArrowUpRight size={15} /></span>
      </button>
      <div className="chip-list project-chips">
        {project.stack.map((tech) => <span className="tech-chip" key={tech}>{tech}</span>)}
      </div>
      <div className="project-actions">
        {project.live ? (
          <a className="button button-small button-primary" href={project.live} target="_blank" rel="noreferrer">
            Live <ExternalLink size={12} aria-hidden="true" />
          </a>
        ) : (
          <button className="button button-small button-ghost" disabled aria-label={`${project.name} live demo link not provided`}>
            Live <span className="coming-soon">UNAVAILABLE</span>
          </button>
        )}
        <a className="button button-small button-quiet" href={project.repo} target="_blank" rel="noreferrer">
          <Github size={15} aria-hidden="true" /> GitHub <ExternalLink size={12} aria-hidden="true" />
        </a>
      </div>
      <span className="card-corner card-corner-top" aria-hidden="true" />
      <span className="card-corner card-corner-bottom" aria-hidden="true" />
    </article>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previousFocus?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="project-modal hud-card"
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.22 }}
      >
        <div className="modal-header">
          <div><SectionLabel number={project.eyebrow.slice(0, 2)}>CASE STUDY</SectionLabel></div>
          <button ref={closeButtonRef} className="icon-button" onClick={onClose} aria-label="Close case study">
            <X size={19} />
          </button>
        </div>
        <h2 id="project-modal-title">{project.name}</h2>
        <p className="modal-subtitle">{project.title}</p>
        <div className="case-study-grid">
          <div><span className="case-label">01 / PROBLEM</span><p>{project.problem}</p></div>
          <div><span className="case-label">02 / SOLUTION</span><p>{project.solution}</p></div>
          <div><span className="case-label">03 / TECH</span><div className="chip-list">{project.stack.map((tech) => <span className="tech-chip" key={tech}>{tech}</span>)}</div></div>
          <div><span className="case-label">04 / OUTCOME</span><p>{project.outcome}</p></div>
        </div>
        <ul className="modal-highlights">
          {project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
        </ul>
        <div className="modal-actions">
          <a className="button button-primary" href={project.repo} target="_blank" rel="noreferrer">
            <Github size={16} /> View repository <ExternalLink size={14} />
          </a>
          {project.live ? (
            <a className="button button-ghost" href={project.live} target="_blank" rel="noreferrer">
              Live demo <ExternalLink size={14} />
            </a>
          ) : (
            <button className="button button-ghost" disabled>Live demo not provided</button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function Projects({ onOpen }: { onOpen: (project: Project) => void }) {
  return (
    <section id="projects" className="page-section section-pad" aria-labelledby="projects-title">
      <div className="content-width">
        <Reveal>
          <SectionLabel number="03">SELECTED WORK</SectionLabel>
          <div className="section-heading-row">
            <h2 id="projects-title">Built to <span>ship.</span></h2>
            <span className="heading-aside">04 PROJECTS <span className="tiny-cross">✳</span></span>
          </div>
        </Reveal>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <Reveal className={project.featured ? "featured-wrap" : ""} key={project.id} delay={index * 0.06}>
              <ProjectCard project={project} onOpen={onOpen} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="page-section section-pad" aria-labelledby="skills-title">
      <div className="content-width">
        <Reveal>
          <SectionLabel number="04">SKILLS</SectionLabel>
          <div className="section-heading-row">
            <h2 id="skills-title">Tools in my <span>orbit.</span></h2>
            <span className="heading-aside">A CONSTELLATION, NOT A SCORE</span>
          </div>
        </Reveal>
        <div className="skills-grid">
          {skillGroups.map((group, index) => (
            <Reveal key={group.name} delay={index * 0.05}>
              <article className="skill-group hud-card">
                <h3><span className="skill-index">0{index + 1}</span> {group.name}</h3>
                <div className="chip-list">
                  {group.skills.map((skill) => <span className="skill-chip" key={skill}>{skill}</span>)}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Achievements() {
  return (
    <section id="achievements" className="page-section section-pad" aria-labelledby="achievements-title">
      <div className="content-width">
        <Reveal>
          <SectionLabel number="05">RECOGNITION</SectionLabel>
          <div className="section-heading-row">
            <h2 id="achievements-title">Signals of <span>progress.</span></h2>
            <span className="heading-aside">CREDENTIALS & MILESTONES</span>
          </div>
        </Reveal>
        <div className="awards-grid">
          {achievements.map((achievement, index) => (
            <Reveal key={achievement.title} delay={index * 0.06}>
              <article className="award-card hud-card">
                <span className="award-mark">{achievement.mark}</span>
                <div><p className="award-issuer">{achievement.issuer}</p><h3>{achievement.title}</h3><p className="award-detail">{achievement.detail}</p></div>
                <Sparkles size={15} className="award-sparkle" aria-hidden="true" />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [draftReady, setDraftReady] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const subject = `Portfolio message from ${String(data.get("name"))}`;
    const body = `Name: ${String(data.get("name"))}\nEmail: ${String(data.get("email"))}\n\n${String(data.get("message"))}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setDraftReady(true);
    form.reset();
  };

  return (
    <section id="contact" className="page-section section-pad contact-section" aria-labelledby="contact-title">
      <div className="content-width">
        <Reveal>
          <SectionLabel number="06">CONTACT</SectionLabel>
          <div className="section-heading-row">
            <h2 id="contact-title">Let&apos;s build <span>what&apos;s next.</span></h2>
          </div>
          <p className="contact-intro">Have an interesting problem or opportunity? My inbox is open.</p>
        </Reveal>
        <div className="contact-grid">
          <Reveal>
            <div className="terminal-card hud-card">
              <div className="terminal-bar"><span /><span /><span /><span className="terminal-title">utkarsh@portfolio:~</span></div>
              <div className="terminal-body">
                <p><span className="terminal-prompt">visitor@web:~$</span> <span>whoami</span></p>
                <p className="terminal-output">{profile.name} · {profile.role}</p>
                <p><span className="terminal-prompt">visitor@web:~$</span> <span>ping --channel email</span></p>
                <a className="terminal-email" href={`mailto:${profile.email}`}>{profile.email} <ArrowUpRight size={15} /></a>
                <p className="terminal-ready"><span className="status-dot" /> SYSTEM READY FOR A GOOD CONVERSATION</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <form className="contact-form hud-card" onSubmit={handleSubmit}>
              <div className="form-heading"><Terminal size={16} /><span>COMPOSE MESSAGE</span></div>
              <label htmlFor="contact-name">Name</label>
              <input id="contact-name" name="name" autoComplete="name" required minLength={2} maxLength={100} placeholder="Your name" />
              <label htmlFor="contact-email">Email</label>
              <input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" />
              <label htmlFor="contact-message">Message</label>
              <textarea id="contact-message" name="message" required minLength={10} maxLength={4000} rows={4} placeholder="What would you like to build?" />
              <button className="button button-primary form-submit" type="submit">
                <Send size={15} /> Prepare email <ArrowRight size={15} />
              </button>
              <AnimatePresence>
                {draftReady && (
                  <motion.p className="form-feedback" role="status" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <Check size={15} /> Email draft prepared. If it didn&apos;t open, email{" "}
                    <a href={`mailto:${profile.email}`}>{profile.email}</a>.
                  </motion.p>
                )}
              </AnimatePresence>
              <p className="form-note">This form prepares a message in your email app; it does not send data to a server.</p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Navbar({
  activeSection,
  onCommandOpen,
}: {
  activeSection: string;
  onCommandOpen: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const jumpLink = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Utkarsh Kumar home">
        <span className="brand-mark">U<span>K</span></span><span className="brand-name">UTKARSH<span>.DEV</span></span>
      </a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {navigation.map((item) => (
          <a className={activeSection === item.id ? "nav-link active" : "nav-link"} href={`#${item.id}`} key={item.id}>
            {item.label}
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <button className="command-trigger" onClick={onCommandOpen} aria-label="Open command palette">
          <Command size={14} /><span>Jump to</span><kbd>⌘ / CTRL K</kbd>
        </button>
        <button className="mobile-menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.nav className="mobile-nav" aria-label="Mobile navigation" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
            {navigation.map((item, index) => (
              <a href={`#${item.id}`} key={item.id} onClick={() => jumpLink(item.id)}>
                <span>0{index + 1}</span>{item.label}<ArrowUpRight size={16} />
              </a>
            ))}
            <button className="mobile-command" onClick={() => { setMenuOpen(false); onCommandOpen(); }}>
              <Command size={15} /> Open command palette
            </button>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function CommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const filtered = navigation.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    if (open) {
      setQuery("");
      inputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab") return;
      const dialog = inputRef.current?.closest('[role="dialog"]');
      const focusable = Array.from(
        dialog?.querySelectorAll<HTMLElement>('input, a[href], button:not([disabled])') ?? [],
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      } else if (!first) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="command-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="command-dialog hud-card" role="dialog" aria-modal="true" aria-label="Jump to a section" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
            <label className="sr-only" htmlFor="command-search">Search sections</label>
            <div className="command-search"><Command size={17} /><input ref={inputRef} id="command-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Where would you like to go?" /><kbd>ESC</kbd></div>
            <p className="command-hint">NAVIGATE TO</p>
            <div className="command-options">
              {filtered.length ? filtered.map((item, index) => (
                <a href={`#${item.id}`} key={item.id} onClick={onClose}><span className="command-number">0{index + 1}</span>{item.label}<ArrowUpRight size={15} /></a>
              )) : <p className="command-empty">No matching section.</p>}
            </div>
            <p className="command-footnote">Press <kbd>ESC</kbd> to close</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function BootScreen({ onSkip }: { onSkip: () => void }) {
  return (
    <motion.div className="boot-screen" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} role="status" aria-live="polite">
      <div className="boot-inner">
        <div className="boot-symbol">UK<span>_</span></div>
        <p>BOOTING SYSTEM<span className="boot-ellipsis">...</span></p>
        <div className="boot-progress"><motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.65, ease: "easeInOut" }} /></div>
        <button onClick={onSkip}>SKIP INTRO <ArrowRight size={12} /></button>
      </div>
    </motion.div>
  );
}

export default function PortfolioClient() {
  const [activeSection, setActiveSection] = useState("about");
  const [commandOpen, setCommandOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [booting, setBooting] = useState(true);
  const reducedMotion = useReducedMotion();
  const commandOpener = useRef<HTMLElement | null>(null);
  const projectClose = useCallback(() => setSelectedProject(null), []);
  const openCommand = useCallback(() => {
    commandOpener.current = document.activeElement as HTMLElement | null;
    setCommandOpen(true);
  }, []);
  const commandClose = useCallback(() => {
    setCommandOpen(false);
    requestAnimationFrame(() => commandOpener.current?.focus());
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0, 0.1, 0.35, 0.6] },
    );
    navigation.forEach((item) => {
      const section = document.getElementById(item.id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (commandOpen) commandClose();
        else openCommand();
      }
    };
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
    };
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [commandClose, commandOpen, openCommand]);

  useEffect(() => {
    if (!booting) return;
    const timer = window.setTimeout(() => setBooting(false), reducedMotion ? 120 : 760);
    return () => window.clearTimeout(timer);
  }, [booting, reducedMotion]);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar activeSection={activeSection} onCommandOpen={openCommand} />
      <main id="main-content">
        <Hero />
        <About />
        <Experience />
        <Projects onOpen={setSelectedProject} />
        <Skills />
        <Achievements />
        <Contact />
      </main>
      <footer className="site-footer">
        <div className="content-width footer-inner">
          <p>Designed &amp; built by <span>Utkarsh Kumar</span></p>
          <a href="#top" className="back-top">BACK TO TOP <ArrowUpRight size={14} /></a>
          <p className="footer-coordinate">BANGALORE · IN <span>© {new Date().getFullYear()}</span></p>
        </div>
      </footer>
      <CommandPalette open={commandOpen} onClose={commandClose} />
      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={projectClose} />}
      </AnimatePresence>
      <AnimatePresence>{booting && <BootScreen onSkip={() => setBooting(false)} />}</AnimatePresence>
    </>
  );
}
