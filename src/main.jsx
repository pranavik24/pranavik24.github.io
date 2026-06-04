import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const asset = (file) => `${import.meta.env.BASE_URL}${file}`;

const projects = [
  {
    title: 'Octomind - Calendar and Task Manager',
    file: 'github.com/pranavik24/task-manager',
    href: 'https://github.com/pranavik24/task-manager',
    description:
      'A calendar and task scheduling application that can automatically schedule your tasks throughout the week.',
    image: asset('project1.png'),
    imageFit: 'contain',
    imagePosition: 'top left',
    tags: ['React', 'Llama2', 'Python', 'TypeScript', 'ShadCN UI', 'Scheduling'],
  },
  {
    title: 'SteelCityBot',
    file: 'github.com/pranavik24/steel-city-bot',
    href: 'https://github.com/pranavik24/steel-city-bot',
    description:
      'A retrieval-augmented generation system that answers questions about Pittsburgh and CMU by combining document retrieval with LLM-based response generation.',
    image: asset('github_profile.png'),
    tags: ['RAG Chatbot', 'Mistral-7B', 'Hybrid Retrieval'],
  },
  {
    title: 'Systems Projects',
    file: 'C / memory management / cache optimization',
    description:
      'Built a cache simulator with LRU eviction and configurable cache parameters, plus a dynamic memory allocator using explicit free lists and boundary-tag coalescing.',
    image: asset('github_profile.png'),
    tags: ['C', 'Systems Programming', 'Memory Management', 'Cache Optimization'],
  },
];

const publications = [
  {
    title: 'Vision and Tracking in a Smart AI Kitchen for Older Adults',
    venue: 'Meeting of the Minds, CMU Research Symposium, 2025',
    summary:
      'A multi-camera RGB-D perception system for detecting, localizing, and tracking objects as they move through a kitchen environment.',
  },
  {
    title: 'The Implications of Using AI and Dance',
    venue: 'May 2024',
    summary:
      'A literature review on whether generative AI can create choreography that feels creative, expressive, and emotionally powerful.',
  },
];

const experiences = [
  {
    role: 'Machine Learning Researcher',
    team: 'Machine Learning for Speech Processing Lab, CMU',
    period: 'May 2026 - Present',
    year: '2026',
    side: 'left',
    summary:
      'Developing a class augmentation framework for speaker datasets using synthetic classes and adversarial mixup in embedding space, with adversarial training to improve robustness and generalization.',
  },
  {
    role: 'Software Engineer Intern - Human-Centered AI',
    team: 'AI-CARING Institute',
    period: 'March 2026 - Present',
    year: '2026',
    side: 'right',
    summary:
      'Building a socially aware conversational AI system using value-based RAG, hierarchical retrieval, knowledge graph construction, and LLM benchmarking across 2,000+ narratives.',
  },
  {
    role: 'AI Researcher - Computer Vision and Robotics',
    team: 'Reliable Autonomous System Lab, CMU',
    period: 'May 2024 - March 2026',
    year: '2024',
    side: 'left',
    summary:
      'Built real-time 3D computer vision pipelines with RGB-D sensors, Python, and OpenCV for multi-object detection, tracking, 3D localization, and real-world transfer evaluation.',
  },
  {
    role: 'Software Developer',
    team: 'ScottyLabs, CMU',
    period: 'October 2023 - October 2024',
    year: '2023',
    side: 'right',
    summary:
      'Built backend systems for a campus-wide platform used by 1000+ students, implementing search and matching algorithms to streamline lost and found workflows.',
  },
];

function CursorSparkles() {
  const [sparks, setSparks] = useState([]);
  const lastSpark = useRef(0);
  const sparkId = useRef(0);

  useEffect(() => {
    const handlePointerMove = (event) => {
      if (!event.target.closest('#home')) {
        return;
      }

      const now = performance.now();
      if (now - lastSpark.current < 20) {
        return;
      }

      lastSpark.current = now;

      const nextSparks = Array.from({ length: 5 }, () => {
        const id = sparkId.current;
        sparkId.current += 1;

        return {
          id,
          x: event.clientX + (Math.random() - 0.5) * 18,
          y: event.clientY + (Math.random() - 0.5) * 18,
          driftX: (Math.random() - 0.5) * 72,
          driftY: -28 - Math.random() * 54,
          size: 6 + Math.random() * 10,
          delay: Math.random() * 90,
        };
      });

      setSparks((currentSparks) => [...currentSparks.slice(-58), ...nextSparks]);

      window.setTimeout(() => {
        const expired = new Set(nextSparks.map((spark) => spark.id));
        setSparks((currentSparks) =>
          currentSparks.filter((spark) => !expired.has(spark.id)),
        );
      }, 1100);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  return (
    <div className="cursor-sparkle-layer" aria-hidden="true">
      {sparks.map((spark) => (
        <span
          className="cursor-spark"
          key={spark.id}
          style={{
            '--spark-x': `${spark.x}px`,
            '--spark-y': `${spark.y}px`,
            '--spark-drift-x': `${spark.driftX}px`,
            '--spark-drift-y': `${spark.driftY}px`,
            '--spark-size': `${spark.size}px`,
            '--spark-delay': `${spark.delay}ms`,
          }}
        />
      ))}
    </div>
  );
}

function ScrollReveal() {
  useEffect(() => {
    const revealTargets = document.querySelectorAll(
      [
        '.about-band .section-kicker',
        '.about-grid > *',
        '.timeline-section .section-heading',
        '.timeline-card',
        '.projects-section .section-kicker',
        '.project-card',
        '.writing-section .section-heading',
        '.publication',
        '.contact-section .section-kicker',
        '.contact-copy',
        '.contact-card',
        '.footer > *',
      ].join(','),
    );

    revealTargets.forEach((element, index) => {
      element.classList.add('reveal-on-scroll');
      element.style.setProperty('--reveal-delay', `${Math.min((index % 5) * 70, 280)}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.16,
      },
    );

    revealTargets.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4 6.5h16a1.5 1.5 0 0 1 1.5 1.5v8A1.5 1.5 0 0 1 20 17.5H4A1.5 1.5 0 0 1 2.5 16V8A1.5 1.5 0 0 1 4 6.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="m4 8 8 6 8-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6.2 8.2a1.45 1.45 0 1 1 0-2.9 1.45 1.45 0 0 1 0 2.9ZM4.9 9.9h2.6v8.2H4.9ZM9.2 9.9h2.5V11h.04c.35-.66 1.22-1.36 2.5-1.36 2.67 0 3.16 1.76 3.16 4.05v4.41h-2.6v-3.9c0-.93-.02-2.13-1.3-2.13-1.3 0-1.5 1.01-1.5 2.06v3.97H9.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 3.75a8.25 8.25 0 0 0-2.61 16.08c.41.08.56-.18.56-.4v-1.42c-2.28.5-2.76-.97-2.76-.97-.37-.95-.9-1.2-.9-1.2-.73-.5.06-.49.06-.49.81.06 1.24.83 1.24.83.72 1.23 1.89.88 2.35.68.07-.52.28-.88.51-1.08-1.82-.21-3.73-.91-3.73-4.04 0-.89.32-1.62.83-2.19-.08-.2-.36-1.04.08-2.16 0 0 .68-.22 2.23.84A7.7 7.7 0 0 1 12 7.65c.68 0 1.36.09 2 .27 1.55-1.06 2.23-.84 2.23-.84.44 1.12.16 1.96.08 2.16.51.57.83 1.3.83 2.19 0 3.14-1.91 3.82-3.73 4.03.29.25.55.75.55 1.51v2.24c0 .22.15.48.57.4A8.25 8.25 0 0 0 12 3.75Z"
        fill="currentColor"
      />
    </svg>
  );
}

function App() {
  return (
    <div className="app-shell">
      <CursorSparkles />
      <ScrollReveal />
      <header className="site-nav" aria-label="Portfolio navigation">
        <a className="monogram" href="#home" aria-label="Go to home">
          PK
        </a>
        <nav>
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#publications">Papers</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="social-links" aria-label="Social links">
          <a
            href="https://www.linkedin.com/in/pranavi-kondapalli/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a href="https://github.com/pranavik24" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero__copy">
            <p className="eyebrow">Welcome to my world</p>
            <h1>Pranavi Kondapalli</h1>
            <div className="hero__summary">
              <span />
              <p>
                AI researcher and engineer building systems that are useful,
                reliable, and designed around people.
              </p>
            </div>
            <a className="round-link" href="#about">
              Explore
            </a>
          </div>

          <div className="section-counter" aria-hidden="true">

          </div>
        </section>

        <section className="about-band section" id="about">
          <div className="section-kicker">
            <p>About Me</p>
          </div>
          <div className="about-grid">
            <div>
              <h2>Allow me to introduce myself</h2>
              <p>
                I'm a junior studying Artificial Intelligence at Carnegie Mellon
                University. My work centers on building AI systems that remain
                reliable under uncertainty while directly supporting users in
                real-world tasks.
              </p>
            </div>
            <ul className="interest-list">
              <li>AI & Machine Learning</li>
              <li>Computer Vision</li>
              <li>Robotics & Perception</li>
              <li>Natural Language</li>
              <li>Human-Centered AI</li>
            </ul>
          </div>
        </section>

        <section className="timeline-section section" id="experience">
          <div className="section-heading section-heading--center">
            <h2>My Work Experience</h2>
          </div>

          <div className="timeline" aria-label="Work experience timeline">
            {experiences.map((experience) => (
              <article
                className={`timeline-card timeline-card--${experience.side}`}
                key={`${experience.role}-${experience.team}`}
              >
                <p className="timeline-card__period">{experience.period}</p>
                <h3>{experience.role}</h3>
                <p className="timeline-card__team">{experience.team}</p>
                <p>{experience.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="projects-section section" id="projects">
          <div className="section-kicker">
            <p>Featured Projects</p>
          </div>

          <div className="project-grid">
            {projects.map((project, index) => (
              <article className="project-card" key={project.title}>
                <img
                  src={project.image}
                  alt=""
                  style={{
                    objectFit: project.imageFit,
                    objectPosition: project.imagePosition,
                  }}
                />
                <div className="project-card__content">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tag-list">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  {project.href ? (
                    <a href={project.href} target="_blank" rel="noreferrer">
                      View case study
                      <span aria-hidden="true">{'->'}</span>
                    </a>
                  ) : (
                    <p className="project-card__meta">{project.file}</p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="writing-section section" id="publications">
          <div className="section-heading">
            <p className="eyebrow">Writing and research</p>
            <h2>Selected papers and essays</h2>
          </div>

          <div className="publication-list">
            {publications.map((publication, index) => (
              <article className="publication" key={publication.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{publication.title}</h3>
                  <p className="publication__venue">{publication.venue}</p>
                  <p>{publication.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-section section" id="contact">
          <div className="section-kicker">
            <p>Contact</p>
          </div>

          <div className="contact-grid">
            <div className="contact-copy">
              <h2>Let's build something thoughtful.</h2>
              <p>
                I’m always happy to talk about AI systems, human-centered products,
                research ideas, or software projects with real-world texture.
              </p>
            </div>

            <div className="contact-cards" aria-label="Contact links">
              <a className="contact-card" href="mailto:pranavi.kondapalli@gmail.com">
                <MailIcon />
                <span>Email</span>
                <strong>pranavi.kondapalli@gmail.com</strong>
              </a>
              <a
                className="contact-card"
                href="https://www.linkedin.com/in/pranavi-kondapalli/"
                target="_blank"
                rel="noreferrer"
              >
                <LinkedInIcon />
                <span>LinkedIn</span>
                <strong>pranavi-kondapalli</strong>
              </a>
              <a
                className="contact-card"
                href="https://github.com/pranavik24"
                target="_blank"
                rel="noreferrer"
              >
                <GitHubIcon />
                <span>GitHub</span>
                <strong>pranavik24</strong>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>Pranavi Kondapalli</p>
        <div className="footer__links">
          <a
            href="mailto:pranavi.kondapalli@gmail.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Email Pranavi"
            title="Email"
          >
            <MailIcon />
          </a>
          <a
            href="https://www.linkedin.com/in/pranavi-kondapalli/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
          >
            <LinkedInIcon />
          </a>
          <a
            href="https://github.com/pranavik24"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            title="GitHub"
          >
            <GitHubIcon />
          </a>
          <a href={asset('resume.pdf')} target="_blank" rel="noreferrer">
            Resume
          </a>
        </div>
      </footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
