import { useEffect, useRef, useState, useCallback } from "react";
import "./App.css";

function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const COUNT = 90;
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.3,
      alpha: Math.random() * 0.4 + 0.08,
      speed: Math.random() * 0.28 + 0.08,
      phase: Math.random() * Math.PI * 2,
      freq: Math.random() * 0.018 + 0.008,
      amp: Math.random() * 0.55 + 0.2,
    }));

    let t = 0;
    const draw = () => {
      t++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
        ctx.fill();

        p.x += p.amp * Math.sin(t * p.freq + p.phase);
        p.y += p.speed;

        if (p.x < -8) p.x = canvas.width + 8;
        else if (p.x > canvas.width + 8) p.x = -8;
        if (p.y > canvas.height + 8) {
          p.y = -8;
          p.x = Math.random() * canvas.width;
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" />;
}

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/imjamesruiz" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/james-ruiz-a61157246/" },
  { label: "Medium", href: "https://medium.com/@imjamesruiz" },
  { label: "YouTube", href: "https://www.youtube.com/@jamesruizcodes" },
];

const projects = [
  {
    title: "Backlogz",
    href: "https://www.youtube.com/watch?v=-nsNqsaW5cQ&t=4s",
    image: "/images/backlogz.png",
    tech: ["React Native", "TypeScript", "Gemini"],
    description:
      "Backlogz grabs a random topic, asks Google's Gemini AI to whip up a short conversational summary, and reads it aloud using your phone's text-to-speech. Think of it like a personalized mini podcast feed made from your own curiosity list.",
  },
  {
    title: "AskHer",
    href: "https://devpost.com/software/askher-kfmvob",
    image: "/images/ask-her.png",
    tech: ["React", "FastAPI", "Supabase", "Gemini"],
    description:
      "An anonymous peer support platform where women can safely share what's on their minds, free from fear or judgment, while building a collective community grounded in empathy.",
  },
  {
    title: "FabFlix",
    href: "https://github.com/uci-jherold2-2026fall-cs122b/2026-spring-cs-122b-sixseven",
    image: "/images/fabflix.png",
    tech: ["Java", "JSP/Servlets", "MySQL", "MongoDB", "Maven", "Apache Tomcat", "JMeter"],
    description:
      "Movie e-commerce platform with search, browsing, pagination, checkout, and session-based cart flows over a normalized 9-table MySQL schema. Built with secure PreparedStatement queries, encrypted passwords, and Google reCAPTCHA, then load-tested with JMeter at 100-200 concurrent threads and 43,000+ requests.",
  },
  {
    title: "Fantasy Football Draft Selector",
    href: "https://www.youtube.com/watch?v=I27pwlpSZyA&t=504s",
    image: "/images/fantasyfootballalgos.png",
    tech: ["Python", "AVL Tree", "B-Tree", "Data Structures", "NFL API"],
    description:
      "Comparative study of AVL trees and B-trees for fantasy football draft analysis. Built a system that scores players from NFL statistics, filters by score ranges, and compares query performance across both tree structures.",
  },
  {
    title: "Ping",
    href: "https://github.com/imjamesruiz/ping",
    image: "/images/ping.png",
    tech: ["React", "Express", "MongoDB", "Chakra UI"],
    description:
      "A modern habit tracking app with calendar features and streak tracking to stay aligned with personal goals. Built to solve my own struggles with building consistent habits.",
  },
  {
    title: "Zotify",
    href: "https://github.com/imjamesruiz/ZotHacks-2024",
    image: "/images/zotfy.jpg",
    tech: ["React", "Flask", "HTML", "CSS"],
    description:
      "My first hackathon project - a Spotify-powered CRUD app to search songs, create playlists, and generate recommendations based on listening history.",
  },
];

const experience = [
  {
    role: "Incoming Software Implementation Consultant Intern",
    company: "One Inc",
    logo: "/images/oneinc.png",
    initials: null,
    link: "https://www.oneinc.com/",
    dates: "Jun. 2026 - Present",
    bullets: [
      "Incoming role focused on software implementation and client-facing technical delivery.",
    ],
  },
  {
    role: "Software Engineering Intern",
    company: "ProGroup",
    logo: "https://media.licdn.com/dms/image/v2/D4D0BAQG5oxiaIAkqdw/company-logo_200_200/company-logo_200_200/0/1701893726297/progroupco_logo?e=2147483647&v=beta&t=ntQunC47MEkXNaA2kRcGaS4SWZqaUaS0GJv8sqyUo6E",
    initials: null,
    link: "https://www.linkedin.com/company/progroupco/",
    dates: "Jan. 2026 – June 2026",
    bullets: [
      "Analyzed production usage data from a multi-tenant license analytics platform to validate automated license evaluation logic.",
      "Developed data extraction and normalization pipelines for Revit and Autodesk logs, enabling scalable ingestion of high-volume telemetry data using AWS (EC2, S3) with Cognito-based multi-tenant authentication.",
      "Identified duplicate records and ingestion anomalies using SQL and Prisma, improving downstream aggregation reliability.",
      "Engineered backend validation and non-blocking ingestion safeguards in Next.js/TypeScript APIs, improving reliability and fault tolerance of production services.",
    ],
  },
  {
    role: "Systems Engineer",
    company: "Division of Teaching Excellence & Innovation, UC Irvine",
    logo: null,
    initials: "UCI",
    link: "https://dtei.uci.edu/",
    dates: "Oct. 2025 – Feb. 2026",
    bullets: [
      "Built automated compliance pipelines processing 200+ digital assets weekly, reducing manual review time by 60%.",
      "Developed assistive-technology-driven automation using DOM inspection and accessibility APIs, improving WCAG 2.1 AA compliance scores by 45%.",
      "Designed internal tooling enabling 30+ faculty to independently audit and remediate content with 75% fewer revision cycles.",
    ],
  },
  {
    role: "Software Developer",
    company: "Boundary Remote Subsurface Solutions",
    logo: "/images/logo_white.png",
    initials: null,
    link: "https://www.boundaryrss.org/",
    dates: "March 2025 – Dec. 2025",
    bullets: [
      "Designed and implemented a full-stack geospatial intelligence platform integrating ASF SAR and USGS M2M APIs for dynamic AOI-based satellite data retrieval.",
      "Built scalable FastAPI backend services supporting user-linked AOI filtering and efficient storage of remote sensing assets and metadata.",
      "Developed automated spatial/temporal deduplication pipelines exporting standardized datasets (GeoJSON, GPKG).",
      "Architected cloud deployment on AWS EC2 and S3 with Dockerized FastAPI services for scalable geospatial dataset ingestion.",
    ],
  },
];

const skillGroups = [
  {
    category: "Languages",
    items: ["Python", "Java", "C/C++", "TypeScript", "JavaScript", "SQL"],
  },
  {
    category: "Backend",
    items: ["FastAPI", "Node.js", "Express", "Spring Boot", "REST APIs", "JWT Auth", "API Design"],
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Prisma", "pgvector", "NoSQL"],
  },
  {
    category: "Cloud & DevOps",
    items: ["AWS (EC2, S3, Lambda)", "Docker", "GitHub Actions", "Cognito", "CloudWatch", "Serverless"],
  },
  {
    category: "Frontend & Tools",
    items: ["React", "Tailwind CSS", "HTML/CSS", "Git", "Agile"],
  },
];

export default function App() {
  const hoveringRef = useRef(false);
  const [displayedName, setDisplayedName] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("about");
  const fullName = "James Ruiz";

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      if (i <= fullName.length) {
        setDisplayedName(fullName.slice(0, i++));
      } else {
        clearInterval(id);
      }
    }, 150);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;
    const headerHeight = document.querySelector(".header")?.offsetHeight ?? 72;
    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 8;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const trail = document.createElement("div");
    trail.className = "cursor-trail";
    document.body.appendChild(trail);

    const handleMove = (e) => {
      const dot = document.createElement("span");
      dot.className = `trail-dot${hoveringRef.current ? " hover" : ""}`;
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
      trail.appendChild(dot);
      requestAnimationFrame(() => dot.classList.add("fade"));
      setTimeout(() => dot.remove(), 700);
    };

    const setHover = (v) => () => { hoveringRef.current = v; };
    const targets = document.querySelectorAll("a, button, .button, input, textarea, [data-interactive]");
    targets.forEach((el) => {
      el.addEventListener("pointerenter", setHover(true));
      el.addEventListener("pointerleave", setHover(false));
    });

    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handleMove);
      targets.forEach((el) => {
        el.removeEventListener("pointerenter", setHover(true));
        el.removeEventListener("pointerleave", setHover(false));
      });
      trail.remove();
    };
  }, []);

  return (
    <div className="page">
      <ParticleBackground />
      <div className="progress-bar" style={{ width: `${scrollProgress}%` }} />

      <header className="header">
        <nav className="nav">
          <a className="logo" href="#about" onClick={(e) => handleNavClick(e, "#about")}>
            <span className="typing-text">{displayedName}</span>
            <span className="cursor-blink">|</span>
          </a>
          <div className="nav-links">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={activeSection === link.href.slice(1) ? "active" : ""}
                onClick={(e) => handleNavClick(e, link.href)}
                data-interactive
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <main>
        <section id="about" className="section hero">
          <div className="hero-content">
            <p className="eyebrow">CS @ UC Irvine</p>
            <h1>James Ruiz</h1>
            <div className="hero-copy">
              <p>
                I build scalable backend systems and full-stack products. I work on cloud-deployed microservices and AI-powered tools. I care about engineering things that actually work at scale.
              </p>
              <p>
                Most recently, I was a Software Engineering Intern at ProGroup, working on production data pipelines and multi-tenant backend services. Expected to graduate June 2027.
              </p>
            </div>
            <div className="icon-actions">
              <a
                className="icon-btn"
                href="https://github.com/imjamesruiz"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                data-interactive
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a
                className="icon-btn"
                href="https://www.linkedin.com/in/james-ruiz-a61157246/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                data-interactive
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                className="icon-btn icon-btn-resume"
                href="mailto:jamesgr@uci.edu?subject=Resume%20Request&body=Hi%20James%2C%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20love%20to%20request%20your%20resume.%0A%0AThanks!"
                aria-label="Request resume via email"
                data-interactive
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="12" y1="12" x2="12" y2="18" />
                  <polyline points="9 15 12 18 15 15" />
                </svg>
                request resume
              </a>
            </div>
          </div>
          <div className="hero-photo">
            <div className="photo-ring">
              <img src="/icons/newHeadshot.jpeg" alt="James Ruiz headshot" />
            </div>
          </div>
        </section>

        <section id="projects" className="section">
          <div className="section-title reveal">
            <h2>Projects</h2>
            <p>Selected work focused on full-stack engineering and AI experiences.</p>
          </div>
          <div className="project-list">
            {projects.map((project, i) => (
              <article
                key={project.title}
                className="project-row reveal"
                style={{ transitionDelay: `${i * 0.07}s` }}
              >
                <a
                  className="project-media"
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  data-interactive
                >
                  <img src={project.image} alt={`${project.title} preview`} />
                </a>
                <div className="project-content">
                  <div>
                    <h3>{project.title}</h3>
                    <p className="muted">{project.description}</p>
                  </div>
                  <div className="tags">
                    {project.tech.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="section">
          <div className="section-title reveal">
            <h2>Experience</h2>
            <p>Industry and research work with a focus on impactful software delivery.</p>
          </div>
          <div className="stack">
            {experience.map((item, i) => (
              <article
                key={item.company}
                className="card experience-card reveal"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="experience-header">
                  <div>
                    <h3>{item.role}</h3>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="company"
                      data-interactive
                    >
                      {item.logo ? (
                        <img src={item.logo} alt={`${item.company} logo`} />
                      ) : (
                        <span className="logo-initials">{item.initials}</span>
                      )}
                      {item.company}
                    </a>
                  </div>
                  <span className="muted dates">{item.dates}</span>
                </div>
                <ul>
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="section">
          <div className="section-title reveal">
            <h2>Skills</h2>
            <p>Languages, tools, and frameworks used across projects.</p>
          </div>
          <div className="skill-groups">
            {skillGroups.map((group, i) => (
              <div
                key={group.category}
                className="skill-group reveal"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <span className="skill-category">{group.category}</span>
                <div className="tags">
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="section">
          <div className="section-title reveal">
            <h2>Contact</h2>
            <p>Let&apos;s build something together.</p>
          </div>
          <form className="contact reveal" action="mailto:jamesgr@uci.edu" method="get">
            <label>
              Subject
              <input type="text" name="subject" placeholder="My Subject" data-interactive />
            </label>
            <label>
              Email
              <input type="email" name="email" placeholder="jamesgr@uci.edu" data-interactive />
            </label>
            <label>
              Message
              <textarea name="body" rows="6" placeholder="Your message" data-interactive />
            </label>
            <button type="submit" className="button primary" data-interactive>
              Send
            </button>
          </form>
        </section>
      </main>

      <footer className="footer">
        <span>© 2026 James Ruiz</span>
      </footer>
    </div>
  );
}
