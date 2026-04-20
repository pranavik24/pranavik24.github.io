import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const projects = [
  {
    title: 'Octomind - Calender and Task Manager',
    file: 'github.com/pranavik24/task-manager',
    href: 'https://github.com/pranavik24/task-manager',
    description:
      'A calendar and task scheduling application that can automatically schedule your tasks throughout the week.',
    image: '/project1.png',
    imageFit: 'contain',
    imagePosition: 'top left',
    tags: ['React', 'Ollama', 'Scheduling'],
  },
  {
    title: 'SteelCityBot',
    file: 'github.com/pranavik24/steel-city-bot',
    href: 'https://github.com/pranavik24/steel-city-bot',
    description:
      'SteelCityBot is a retrieval-augmented generation (RAG) system that answers questions about Pittsburgh and CMU by combining document retrieval with LLM-based response generation.',
    image:
      '/github_profile.png',
    tags: ['RAG', 'LLMs', 'Document Retrieval'],
  },
];

const publications = [
  {
    title: 'Vision and Tracking in a Smart AI Kitchen for Older Adults',
    venue: 'Meeting of the Minds (CMU Research Symposium), 2025 — submitted to WAVC',
    summary:
      'we propose a system that uses multiple RGB-D cameras and zero-shot object detection models to identify and track items in 3D as they are being used in a kitchen.',
  },
  {
    title: 'The Implications of Using AI and Dance',
    venue: 'May 2024',
    summary:
      'Literature review and synthesis in whether generative AI has the capabilities to create choreography that is creative and emotionally powerful. ',
  },
];

const experiences = [
  // {
  //   role: 'Incoming Customer Success Engineer Intern',
  //   team: 'IBM, NYC',
  //   period: '2026 - Present',
  //   summary:
  //     'Supported technical customer workflows by connecting product capabilities with practical implementation needs.',
  // },
  {
    role: 'AI Research Intern',
    team: 'Reliable Autonomous Systems Lab, CMU',
    period: '2025 - Present',
    summary:
      'Building AI systems that stay reliable under uncertainty while directly supporting users in real-world tasks.',
  },
];

function Line({ number, children }) {
  return (
    <div className="code-line">
      <span className="line-number">{number}</span>
      <span className="line-content">{children}</span>
    </div>
  );
}

function App() {
  return (
    <div className="app-shell">
      <header className="topbar" aria-label="Portfolio workspace">
        <a className="window-title" href="#home" aria-label="Go to home">
          <span className="dot dot--mauve" />
          <span className="dot dot--plum" />
          <span className="dot dot--red" />
          pranavi.dev
        </a>
        <nav>
          <a href="#about">about.md</a>
          <a href="#experience">experience.log</a>
          <a href="#projects">projects.json</a>
          <a href="#publications">publications.bib</a>
        </nav>
      </header>

      <div className="workspace">
        <aside className="sidebar" aria-label="Portfolio files">
          <p className="sidebar__title">Explorer</p>
          <a href="#home">portfolio/</a>
          <a href="#about">about.md</a>
          <a href="#experience">experience.log</a>
          <a href="#projects">projects.json</a>
          <a href="#publications">publications.bib</a>
          <a href="mailto:hello@example.com">contact.env</a>
        </aside>

        <main className="editor">
          <section className="hero panel" id="home">
            <div className="tab-row" aria-label="Open file tabs">
              <span className="tab tab--active">home.jsx</span>
              <span className="tab">about.md</span>
              <span className="tab">work.log</span>
            </div>

            <div className="hero__grid">
              <div className="code-block" aria-label="Introductory code">
                <Line number="01">
                  <span className="token-muted">const</span>{' '}
                  <span className="token-red">portfolio</span> = {'{'}
                </Line>
                <Line number="02">
                  <span className="indent">name:</span>{' '}
                  <h1 className="typewriter">Pranavi Kondapalli</h1>,
                </Line>
                <Line number="03">
                  <span className="indent">focus:</span> 'building AI tools
                  that make life easier, faster, and less complicated',
                </Line>
                <Line number="04">{'};'}</Line>
              </div>

              <div className="terminal-card">
                <p className="terminal-card__label">run</p>
                <p>pnpm dev</p>
                <span>portfolio loaded</span>
              </div>
            </div>
          </section>

          <section className="section panel" id="about">
            <div className="section__heading">
              <p className="eyebrow">about.md</p>
              {/* <h2>Junior in Artifical Intelligence at Carnegie Mellon University</h2> */}
            </div>

            <div className="about-grid">
              <div className="about-copy">
                <p>
                  I'm a junior studying Artificial Intelligence at Carnegie Mellon 
                  Univeristy. Currently, I'm working as an undergraduate AI researcher
                  at the Reliable Autonomous Systems Lab at CMU, under the guidance of
                  Professor Reid Simmons. Here, my work is centered around around 
                  building AI systems that remain reliable under uncertainty while 
                  directly supporting users in real-world tasks. 
                </p>
                <p>
                  I care about designing AI products that prioritize user needs
                  and real-world impact over novelty.
                </p>
              </div>
              <figure className="image-note">
                <img
                  src="/me3.png"
                  alt="Me, Pranavi Kondapalli, in front of a chalet on my trip to the Swiss Alps"
                />
                <figcaption>me.jpeg</figcaption>
              </figure>
            </div>
          </section>

          <section className="section panel" id="experience">
            <div className="section__heading">
              <p className="eyebrow">experience.log</p>
              <h2>Experience</h2>
            </div>

            <div className="experience-list">
              {experiences.map((experience) => (
                <article className="experience-card" key={experience.role}>
                  <div>
                    <p className="experience-card__period">
                      {experience.period}
                    </p>
                    <h3>{experience.role}</h3>
                    <p className="experience-card__team">{experience.team}</p>
                  </div>
                  <p>{experience.summary}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="section panel" id="projects">
            <div className="section__heading">
              <p className="eyebrow">projects.json</p>
              <h2>Selected work</h2>
            </div>

            <div className="project-list">
              {projects.map((project) => (
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
                    {project.href ? (
                      <a
                        className="file-path"
                        href={project.href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {project.file}
                      </a>
                    ) : (
                      <p className="file-path">{project.file}</p>
                    )}
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="tag-list">
                      {project.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <p className="project-note">
              If you want to see out more of my projects, check out my{' '}
              <a
                href="https://github.com/pranavik24"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              !
            </p>
          </section>

          <section className="section panel" id="publications">
            <div className="section__heading">
              <p className="eyebrow">publications.bib</p>
              <h2>Writing and research</h2>
            </div>

            <div className="publication-list">
              {publications.map((publication, index) => (
                <article className="publication" key={publication.title}>
                  <span>@paper-{index + 1}</span>
                  <div>
                    <h3>{publication.title}</h3>
                    <p className="publication__venue">{publication.venue}</p>
                    <p>{publication.summary}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>

      <footer className="statusbar">
        <span>main</span>
        <span>React</span>
        <span>UTF-8</span>
      </footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
