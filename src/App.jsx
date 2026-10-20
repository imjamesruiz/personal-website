import { useEffect, useRef, useState } from "react";
import "./App.css";

const NAME = "James Ruiz";
const EMAIL = "jamesgr@uci.edu";

const navLinks = [
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const heroLinks = [
  { label: "Get in touch", href: `mailto:${EMAIL}`, icon: "mail" },
  { label: "Resume", href: "/resume.pdf", icon: "file", external: true },
  { label: "GitHub", href: "https://github.com/imjamesruiz", icon: "github", external: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/imjamesruiz", icon: "linkedin", external: true },
];

const marquee = [
  "Java", "Python", "TypeScript", "React", "Spring Boot", "Kubernetes", "AWS",
  "Docker", "Terraform", "Snowflake", "dbt", "PostgreSQL", "GitHub Actions", "Jenkins",
];

const experience = [
  {
    company: "Harbinger Motors",
    role: "Incoming MES Software Engineering Intern",
    dates: "1/27 – 3/27",
    logo: null,
    initials: "H",
    link: "https://www.harbingermotors.com/",
    upcoming: true,
    description:
      "Joining the manufacturing execution systems team to build software that runs the production floor for Harbinger's electric commercial vehicles.",
    tech: [],
  },
  {
    company: "One Inc",
    role: "Software Implementation Consultant Intern",
    dates: "6/26 – 8/26",
    logo: "/images/oneinc.png",
    link: "https://www.oneinc.com/",
    description:
      "Translated integration requirements across 4+ enterprise implementations into PremiumPay REST API and webhook configurations for platforms including Guidewire. Managed rollout through 9 test and production environments, ran 50+ UAT and API validation tests, and cut mean error-diagnosis time by 60% by mining Grafana request logs.",
    tech: ["REST APIs", "Webhooks", "Postman", "Grafana", "Guidewire"],
  },
  {
    company: "ProGroup",
    role: "Software Engineering Intern",
    dates: "1/26 – 6/26",
    logo: "https://media.licdn.com/dms/image/v2/D4D0BAQG5oxiaIAkqdw/company-logo_200_200/company-logo_200_200/0/1701893726297/progroupco_logo?e=2147483647&v=beta&t=ntQunC47MEkXNaA2kRcGaS4SWZqaUaS0GJv8sqyUo6E",
    link: "https://www.linkedin.com/company/progroupco/",
    description:
      "Built backend extraction and normalization services for a multi-tenant license analytics platform, processing 70,000+ Revit/Autodesk telemetry records. Improved aggregation accuracy by 40% with SQL and Prisma anomaly detection, and added non-blocking ingestion safeguards so malformed records no longer stalled the pipeline.",
    tech: ["TypeScript", "Next.js", "Prisma", "SQL", "AWS"],
  },
  {
    company: "Cognitive Neuroscience of Sleep Lab",
    role: "Data Engineering Research Assistant",
    dates: "10/25 – 2/26",
    logo: null,
    initials: "UCI",
    link: "https://www.uci.edu/",
    description:
      "Defined data requirements with researchers and built a Python ETL pipeline processing 1,524 files (361 MB) of wearable sensor data over an 80-day study, with automated device sync and run logs for failure triage and backfills.",
    tech: ["Python", "ETL", "Data Pipelines"],
  },
  {
    company: "DTEI — DASH",
    role: "Digital Consultant",
    dates: "3/25 – 4/26",
    logo: null,
    initials: "UCI",
    link: "https://dtei.uci.edu/",
    description:
      "Audited and remediated 400+ instructional documents and sites against ADA, Section 508, and WCAG 2.1 AA. Reworked semantic HTML, ARIA roles, contrast, and keyboard navigation, improving instructional efficiency by 25% for 35,000+ students.",
    tech: ["HTML", "CSS", "JavaScript", "ARIA", "WCAG"],
  },
];

const projects = [
  {
    title: "Cloud-Native Microservices Task Platform",
    href: "https://github.com/imjamesruiz/cloudtask",
    image: null,
    tech: ["Java", "Spring Boot", "React", "Kubernetes", "AWS EKS", "GitHub Actions"],
    description:
      "6-service Spring Boot platform with 20+ REST endpoints, JWT auth, and RBAC. Migrated from ECS to Kubernetes on EKS with Helm-based CI/CD, cutting per-service rebuilds from 2 min to 20 s.",
    terminal: ["$ kubectl get deploy", "task-svc     3/3  Running", "auth-svc     2/2  Running", "gateway      2/2  Running"],
  },
  {
    title: "Retail Inventory Analytics Warehouse",
    href: "https://github.com/imjamesruiz/retail-inventory-analytics-warehouse",
    image: null,
    tech: ["Python", "Snowflake", "dbt", "AWS S3", "Terraform", "Jenkins"],
    description:
      "Unified four data sources into Snowflake through a Python + dbt ELT pipeline. 38 Terraform resources and 77 automated data tests, sustaining a 100% success rate across 360 Jenkins runs.",
    terminal: ["$ dbt test", "77 of 77 PASS", "$ terraform plan", "38 resources · no drift"],
  },
  {
    title: "FabFlix",
    href: "https://github.com/uci-jherold2-2026fall-cs122b/2026-spring-cs-122b-sixseven",
    image: "/images/fabflix.png",
    tech: ["Java", "MySQL", "MongoDB", "Tomcat", "JMeter"],
    description:
      "Movie e-commerce platform over a normalized 9-table MySQL schema, load-tested with JMeter at 200 concurrent threads and 43,000+ requests.",
  },
  {
    title: "AskHer",
    href: "https://devpost.com/software/askher-kfmvob",
    image: "/images/ask-her.png",
    tech: ["React", "FastAPI", "Supabase", "Gemini"],
    description:
      "Anonymous peer-support platform where women can share what's on their minds, free from judgment.",
  },
  {
    title: "Backlogz",
    href: "https://www.youtube.com/watch?v=-nsNqsaW5cQ&t=4s",
    image: "/images/backlogz.png",
    tech: ["React Native", "TypeScript", "Gemini"],
    description:
      "Turns your curiosity list into a personal mini-podcast: Gemini summarizes a random topic and reads it aloud.",
  },
  {
    title: "Fantasy Football Draft Selector",
    href: "https://www.youtube.com/watch?v=I27pwlpSZyA&t=504s",
    image: "/images/fantasyfootballalgos.png",
    tech: ["Python", "AVL Tree", "B-Tree"],
    description:
      "Compares AVL and B-tree query performance for scoring and filtering NFL players during a draft.",
  },
];

const skillGroups = [
  { category: "Languages", items: ["Java", "Python", "SQL", "TypeScript", "JavaScript", "C++", "HTML", "CSS"] },
  { category: "Cloud & DevOps", items: ["AWS (EKS, ECS, EC2, S3, Lambda, RDS, IAM)", "Docker", "Kubernetes", "Terraform", "Jenkins", "GitHub Actions"] },
  { category: "Data", items: ["ETL / ELT", "Snowflake", "dbt", "MySQL", "PostgreSQL", "SQL Server"] },
  { category: "Delivery", items: ["Requirements gathering", "Stakeholder communication", "UAT", "Agile / Scrum", "Technical docs"] },
];

const icons = {
  mail: (
    <path d="M4 6h16v12H4z M4 7l8 6 8-6" />
  ),
  file: (
    <>
      <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z" />
      <path d="M14 3v5h5" />
    </>
  ),
  github: (
    <path d="M9 19c-4 1.5-4-2-6-2.5m12 5v-3.5a3 3 0 00-.9-2.3c3-.3 6.1-1.5 6.1-6.6a5.2 5.2 0 00-1.4-3.6 4.8 4.8 0 00-.1-3.6s-1.1-.3-3.7 1.4a12.6 12.6 0 00-6.6 0C5.8 1.6 4.7 1.9 4.7 1.9a4.8 4.8 0 00-.1 3.6A5.2 5.2 0 003.2 9.1c0 5.1 3.1 6.3 6.1 6.6a3 3 0 00-.9 2.3V21.5" />
  ),
  linkedin: (
    <>
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z" />
      <path d="M2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </>
  ),
  arrow: <path d="M7 17L17 7M9 7h8v8" />,
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  copy: (
    <>
      <rect x="9" y="9" width="12" height="12" rx="2" />
      <path d="M5 15V5a2 2 0 012-2h10" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </>
  ),
};

function Icon({ name, size = 16 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  );
}

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const isMac = () => /Mac|iPhone|iPad/.test(navigator.platform);

const pacificTime = () =>
  new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/Los_Angeles",
  });

// Types the name out one letter at a time, then leaves a blinking caret
function TypedName({ text }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setCount(text.length);
      return;
    }
    let i = 0;
    let interval;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length) clearInterval(interval);
      }, 110);
    }, 400);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [text]);

  return (
    <h1 className="name" aria-label={text}>
      <span aria-hidden="true">{text.slice(0, count)}</span>
      <span className={`caret${count >= text.length ? " done" : ""}`} aria-hidden="true" />
    </h1>
  );
}

// Ctrl/⌘ + K menu for jumping around the site
function CommandPalette({ open, onClose, actions }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActive(0);
    requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  useEffect(() => setActive(0), [query]);

  if (!open) return null;

  const q = query.trim().toLowerCase();
  const results = actions.filter((a) => `${a.label} ${a.group}`.toLowerCase().includes(q));

  const run = (action) => {
    onClose();
    action.run();
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      run(results[active]);
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div className="palette-backdrop" onClick={onClose}>
      <div
        className="palette"
        role="dialog"
        aria-modal="true"
        aria-label="Command menu"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="palette-input">
          <Icon name="search" size={18} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search or jump to…"
            aria-label="Search commands"
          />
          <kbd>esc</kbd>
        </div>
        <ul className="palette-list" role="listbox">
          {results.length === 0 && <li className="palette-empty">No results</li>}
          {results.map((action, i) => (
            <li
              key={action.label}
              role="option"
              aria-selected={i === active}
              className={i === active ? "active" : ""}
              ref={i === active ? (el) => el?.scrollIntoView({ block: "nearest" }) : undefined}
              onMouseEnter={() => setActive(i)}
              onClick={() => run(action)}
            >
              <Icon name={action.icon} />
              <span>{action.label}</span>
              <span className="palette-group">{action.group}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ProjectCard({ project }) {
  const ref = useRef(null);

  // 3D tilt + glare that follows the pointer
  const handleMove = (e) => {
    if (prefersReducedMotion()) return;
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    el.style.setProperty("--rx", `${(0.5 - y) * 6}deg`);
    el.style.setProperty("--ry", `${(x - 0.5) * 8}deg`);
    el.style.setProperty("--gx", `${x * 100}%`);
    el.style.setProperty("--gy", `${y * 100}%`);
  };

  const handleLeave = () => {
    const el = ref.current;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <a
      ref={ref}
      href={project.href}
      target="_blank"
      rel="noreferrer"
      className="project-card reveal"
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      <div className="project-media">
        {project.image ? (
          <img src={project.image} alt={`${project.title} preview`} loading="lazy" />
        ) : (
          <div className="terminal" aria-hidden="true">
            <div className="terminal-bar">
              <span /><span /><span />
            </div>
            {project.terminal.map((line, i) => (
              <code key={line} style={{ animationDelay: `${0.4 + i * 0.35}s` }}>
                {line}
              </code>
            ))}
          </div>
        )}
      </div>
      <div className="project-body">
        <h3>
          {project.title}
          <span className="arrow"><Icon name="arrow" size={18} /></span>
        </h3>
        <p>{project.description}</p>
        <p className="tech-line">{project.tech.join(" · ")}</p>
      </div>
      <span className="glare" aria-hidden="true" />
    </a>
  );
}

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [navVisible, setNavVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [toast, setToast] = useState({ message: "", show: false });
  const [time, setTime] = useState(pacificTime);
  const toastTimer = useRef(null);
  const timelineRef = useRef(null);
  const modKey = isMac() ? "⌘" : "Ctrl";

  // Scroll progress bar, nav reveal, and experience timeline fill
  useEffect(() => {
    let frame;
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
      setNavVisible(window.scrollY > 320);

      const timeline = timelineRef.current;
      if (!timeline) return;
      const line = window.innerHeight * 0.6;
      const rect = timeline.getBoundingClientRect();
      const fill = Math.min(Math.max((line - rect.top) / rect.height, 0), 1);
      timeline.style.setProperty("--fill", fill);
      timeline.querySelectorAll(".exp-row").forEach((row) => {
        row.classList.toggle("passed", row.getBoundingClientRect().top + 52 < line);
      });
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Ctrl/⌘ + K or "/" opens the command menu
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      } else if (e.key === "/" && !/INPUT|TEXTAREA/.test(document.activeElement?.tagName)) {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Live Pacific time in the footer
  useEffect(() => {
    const id = setInterval(() => setTime(pacificTime()), 30000);
    return () => clearInterval(id);
  }, []);

  // Buttons that lean toward the cursor
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const els = document.querySelectorAll("[data-magnetic]");
    const move = (e) => {
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      el.style.transform = `translate(${dx * 0.2}px, ${dy * 0.3}px)`;
    };
    const reset = (e) => {
      e.currentTarget.style.transform = "";
    };
    els.forEach((el) => {
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", reset);
    });
    return () =>
      els.forEach((el) => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", reset);
      });
  }, []);

  // A hello for anyone who opens dev tools
  useEffect(() => {
    console.log(
      "%cHey, thanks for looking under the hood 👋",
      "font-size:14px;font-weight:600;",
      `\nIf you're hiring, I'd love to chat: ${EMAIL}`
    );
  }, []);

  // Highlight current section in nav
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    document.querySelectorAll("section[id]").forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Fade/slide elements in as they enter the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Soft spotlight that follows the cursor across the page
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let frame;
    const onMove = (e) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--mx", `${e.clientX}px`);
        document.documentElement.style.setProperty("--my", `${e.clientY}px`);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  const scrollToSection = (href) => {
    const target = document.querySelector(href);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    scrollToSection(href);
  };

  const showToast = (message) => {
    clearTimeout(toastTimer.current);
    setToast({ message, show: true });
    toastTimer.current = setTimeout(() => setToast((t) => ({ ...t, show: false })), 2200);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      showToast("Email copied to clipboard");
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const openUrl = (url) => window.open(url, "_blank", "noopener");

  const actions = [
    ...navLinks.map((l) => ({
      label: `Go to ${l.label}`,
      group: "Navigate",
      icon: "arrowRight",
      run: () => scrollToSection(l.href),
    })),
    { label: "Copy email", group: "Contact", icon: "copy", run: copyEmail },
    { label: "Send an email", group: "Contact", icon: "mail", run: () => (window.location.href = `mailto:${EMAIL}`) },
    ...heroLinks
      .filter((l) => l.external)
      .map((l) => ({ label: `Open ${l.label}`, group: "Links", icon: l.icon, run: () => openUrl(l.href) })),
    ...projects.map((p) => ({ label: p.title, group: "Projects", icon: "arrow", run: () => openUrl(p.href) })),
  ];

  return (
    <div className="page">
      <div className="spotlight" aria-hidden="true" />
      <div className="grid-bg" aria-hidden="true" />
      <div className="progress-bar" style={{ transform: `scaleX(${scrollProgress / 100})` }} />

      <header className={`nav${navVisible ? " show" : ""}`}>
        <a href="#top" className="nav-name" onClick={(e) => handleNavClick(e, "#top")}>
          {NAME}
        </a>
        <nav className="nav-links">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={activeSection === link.href.slice(1) ? "active" : ""}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <button className="nav-search" onClick={() => setPaletteOpen(true)} aria-label="Open command menu">
          <Icon name="search" size={14} />
          <kbd>{modKey} K</kbd>
        </button>
      </header>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} actions={actions} />

      <div className={`toast${toast.show ? " show" : ""}`} role="status" aria-live="polite">
        <Icon name="copy" size={14} />
        {toast.message}
      </div>

      <main className="container">
        <section id="top" className="hero">
          <div className="avatar">
            <img src="/icons/newHeadshot.jpeg" alt="James Ruiz headshot" />
          </div>

          <TypedName text={NAME} />

          <a className="status" href="#experience" onClick={(e) => handleNavClick(e, "#experience")}>
            <span className="pulse" />
            Incoming SWE Intern at Harbinger Motors · Jan 2027
          </a>

          <div className="hero-links">
            {heroLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
                data-magnetic
              >
                <Icon name={link.icon} />
                <span>{link.label}</span>
              </a>
            ))}
          </div>

          <button className="kbd-hint" onClick={() => setPaletteOpen(true)}>
            Press <kbd>{modKey}</kbd> <kbd>K</kbd> to jump anywhere
          </button>
        </section>

        <div className="marquee reveal" aria-hidden="true">
          <div className="marquee-track">
            {[...marquee, ...marquee].map((item, i) => (
              <span key={i}>{item}</span>
            ))}
          </div>
        </div>

        <section id="experience" className="section">
          <h2 className="section-heading reveal">Experience</h2>
          <div className="timeline" ref={timelineRef}>
            <div className="timeline-rail" aria-hidden="true">
              <div className="timeline-fill" />
            </div>
            {experience.map((item) => (
              <article key={item.company + item.role} className="exp-row reveal">
                <span className="exp-dot" aria-hidden="true" />
                <span className="exp-dates">
                  {item.dates}
                  {item.upcoming && <span className="badge">Upcoming</span>}
                </span>
                <div className="exp-body">
                  <a className="exp-company" href={item.link} target="_blank" rel="noreferrer">
                    <span>{item.company}</span>
                    {item.logo ? (
                      <img src={item.logo} alt="" />
                    ) : (
                      <span className="logo-initials">{item.initials}</span>
                    )}
                  </a>
                  <p className="exp-role">{item.role}</p>
                  <p className="exp-desc">{item.description}</p>
                  {item.tech.length > 0 && <p className="tech-line">{item.tech.join(" · ")}</p>}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="section">
          <h2 className="section-heading reveal">Projects</h2>
          <div className="project-grid">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </section>

        <section id="skills" className="section">
          <h2 className="section-heading reveal">Skills</h2>
          <div className="skills">
            {skillGroups.map((group) => (
              <div key={group.category} className="skill-row reveal">
                <span className="skill-category">{group.category}</span>
                <div className="chips">
                  {group.items.map((item) => (
                    <span key={item} className="chip">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="section contact reveal">
          <h2>Let&apos;s build something.</h2>
          <p>Open to software engineering internships and new-grad roles. My inbox is always open.</p>
          <div className="contact-actions">
            <a className="cta" href={`mailto:${EMAIL}`} data-magnetic>
              <Icon name="mail" />
              {EMAIL}
            </a>
            <button className="ghost-btn" onClick={copyEmail} data-magnetic>
              <Icon name="copy" />
              Copy
            </button>
          </div>
        </section>
      </main>

      <footer className="footer container">
        <span>© {new Date().getFullYear()} James Ruiz</span>
        <span className="local-time">
          <span className="live-dot" />
          Irvine, CA · {time} PT
        </span>
      </footer>
    </div>
  );
}
