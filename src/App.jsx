import { useEffect, useRef, useState } from "react";
import "./App.css";

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
      "Backlogz grabs a random topic, asks Google's Gemini AI to whip up a short, conversational summary, and reads it out loud using your phone's text to speech. Think of it like a personalized mini podcast feed made from your own curiosity list.",
  },
  {
    title: "AskHer",
    href: "https://devpost.com/software/askher-kfmvob",
    image: "/images/ask-her.png",
    tech: ["React", "FastAPI", "SupaBase", "Gemini"],
    description:
      "Everyone has experienced feelings of isolation and being overwhelmed. AskHer is an anonymous peer support platform where women can safely share what's on their minds, free from fear or judgment while building a collective community grounded in empathy.",
  },
  {
    title: "Ping",
    href: "https://github.com/imjamesruiz/ping",
    image: "/images/ping.png",
    tech: ["React", "Express", "MongoDB", "Chakra-UI"],
    description:
      "As someone who struggles to build consistent habits, I built a modern habit tracking application to stay motivated. Implemented is a calendar feature and streak tracking to stay aligned with personal goals.",
  },
  {
    title: "Zotify",
    href: "https://github.com/imjamesruiz/ZotHacks-2024",
    image: "/images/zotfy.jpg",
    tech: ["React", "Flask", "HTML", "CSS"],
    description:
      "This was my first hackathon project where my team and I designed an CRUD application using the SpotifyAPI to help users for songs, create playlists, and generate reccomended songs based on user playlists.",
  },
  {
    title: "MedAI",
    href: "https://github.com/imjamesruiz/med-ai",
    image: "/images/medai.png",
    tech: ["React", "TypeScript", "Tailwind", "PostgreSQL", "Gemini 2.5"],
    description: 
    "The complex bureaucratic terminology often complicates the already tedious process of navigating through medical documents. I wanted to make an impact into this dilemma by leveraging agentic workflows and Retrieval-Augmented Generation (RAG) to create a platform that streamlines the entire process start to finish.",
  },
];

const experience = [
  {
    role: "Software Engineering Intern",
    company: "ProGroup",
    logo: "https://media.licdn.com/dms/image/v2/D4D0BAQG5oxiaIAkqdw/company-logo_200_200/company-logo_200_200/0/1701893726297/progroupco_logo?e=2147483647&v=beta&t=ntQunC47MEkXNaA2kRcGaS4SWZqaUaS0GJv8sqyUo6E",
    link: "https://www.boundaryrss.org/",
    dates: "Jan. 2026 - Present",
    bullets: [
      "free lunch"
    ],
  },
  {
    role: "Software Developer",
    company: "Boundary Remote Subsurface Solutions",
    logo: "/images/logo_white.png",
    link: "https://www.boundaryrss.org/",
    dates: "May 2025 - Present",
    bullets: [
      "Assisting end-to-end web development for a full-stack geospatial intelligence platform integrating ASF SAR and USGS M2M APIs to enable dynamic AOI selection and satellite data retrieval",
      "Implemented automated pipelines for spatial/temporal deduplication, metadata filtering (acquisition mode), and AOI clipping, exporting cleaned datasets as GeoJSON and GPKG",
      "Integrated Supabase authentication and Row-Level Security (RLS) for user-specific data access and role-based permissions",
      "Developed scalable FastAPI backend with user-linked AOI filtering and efficient storage of remote sensing assets and metadata",
    ],
  }
];

const skills = [
  "Python",
  "Java",
  "C++",
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "AWS",
  "React",
  "Tailwind",
  "Node.js",
];

export default function App() {
  const hoveringRef = useRef(false);
  const [displayedName, setDisplayedName] = useState("");
  const fullName = "James Ruiz";

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullName.length) {
        setDisplayedName(fullName.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 150);

    return () => clearInterval(typingInterval);
  }, []);

  useEffect(() => {
    const trailContainer = document.createElement("div");
    trailContainer.className = "cursor-trail";
    document.body.appendChild(trailContainer);

    const handleMove = (event) => {
      const dot = document.createElement("span");
      dot.className = `trail-dot${hoveringRef.current ? " hover" : ""}`;
      dot.style.left = `${event.clientX}px`;
      dot.style.top = `${event.clientY}px`;
      trailContainer.appendChild(dot);

      window.requestAnimationFrame(() => {
        dot.classList.add("fade");
      });

      window.setTimeout(() => {
        dot.remove();
      }, 700);
    };

    const setHovering = (value) => () => {
      hoveringRef.current = value;
    };

    const hoverTargets = document.querySelectorAll(
      "a, button, .button, input, textarea, [data-interactive]"
    );
    hoverTargets.forEach((el) => {
      el.addEventListener("pointerenter", setHovering(true));
      el.addEventListener("pointerleave", setHovering(false));
    });

    window.addEventListener("pointermove", handleMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handleMove);
      hoverTargets.forEach((el) => {
        el.removeEventListener("pointerenter", setHovering(true));
        el.removeEventListener("pointerleave", setHovering(false));
      });
      trailContainer.remove();
    };
  }, []);

  return (
    <div className="page">
      <header className="header">
        <nav className="nav">
          <a className="logo" href="#about">
            <span className="typing-text">{displayedName}</span>
            <span className="cursor-blink">|</span>
          </a>
          <div className="nav-links">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} data-interactive>
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
                Hello! I&apos;m James Ruiz, an undergraduate student at UC Irvine who has a passion for
                problem-solving and building full-stack applications.
              </p>
              <p>
                larp larp larp larp
              </p>
            </div>
            <div className="actions">
              <a
                className="button primary"
                href="https://drive.google.com/file/d/1L9kvSOUOAYozJECltSa5EVeunRDUFI5N/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
                data-interactive
              >
                Resume
              </a>
              <a className="button ghost" href="mailto:jamesgr@uci.edu" data-interactive>
                Email
              </a>
            </div>
            <div className="socials">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  data-interactive
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
          <div className="hero-photo">
            <img src="/icons/headshot.png" alt="James Ruiz headshot" />
          </div>
        </section>

        <section id="projects" className="section">
          <div className="section-title">
            <h2>Projects</h2>
            <p>Selected work focused on full-stack engineering and AI experiences.</p>
          </div>
          <div className="project-list">
            {projects.map((project) => (
              <article key={project.title} className="project-row">
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
          <div className="section-title">
            <h2>Experience</h2>
            <p>Industry and research work with a focus on impactful software delivery.</p>
          </div>
          <div className="stack">
            {experience.map((item) => (
              <article key={item.company} className="card experience-card">
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
                      <img src={item.logo} alt={`${item.company} logo`} />
                      {item.company}
                    </a>
                  </div>
                  <span className="muted">{item.dates}</span>
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
          <div className="section-title">
            <h2>Skills</h2>
            <p>Languages, tools, and frameworks used across projects.</p>
          </div>
          <div className="tags skills">
            {skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </section>

        <section id="contact" className="section">
          <div className="section-title">
            <h2>Contact</h2>
            <p>Let&apos;s build something together.</p>
          </div>
          <form className="contact" action="mailto:jamesgr@uci.edu" method="get">
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
        <span>© 2025 James Ruiz</span>
      </footer>
    </div>
  );
}
