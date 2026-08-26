import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { fetchLastFmTrack, getArtworkSources } from './lastFm';
import { getFunListens, hasSharedCounter, incrementFunListens } from './sharedCounter';
import './styles.css';

const asset = (file) => `${import.meta.env.BASE_URL}${file}`;

const links = {
  email: 'mailto:pkondapa@andrew.cmu.edu',
  github: 'https://github.com/pranavik24',
  linkedin: 'https://www.linkedin.com/in/pranavi-kondapalli/',
  resume: asset('resume.pdf'),
};

const lastFmApiKey = import.meta.env.VITE_LASTFM_API_KEY;
const lastFmUsername = import.meta.env.VITE_LASTFM_USERNAME;
const hasLastFmConfig = Boolean(lastFmApiKey && lastFmUsername);

const projects = [
  {
    title: 'ReForm',
    subtitle: 'Personal Movement Aware Fitness Coach',
    href: 'https://github.com/pranavik24/Exercise-Coach',
    image: asset('reform.png'),
    plays: '34,193',
    duration: '3:42',
    tags: [ 'Next.js', 'React', 'TypeScript', 'Gemini-API', 'OpenCV', 'MediaPipe Pose', 'Vercel'],
    description:
      'ReForm is a personal movement-awareness coach. It learns a fresh baseline from comfortable reps, tracks meaningful movement change during a set, and gives one useful focus for the next set.'
  },
  {
    title: 'Octomind',
    subtitle: 'Calendar and Task Scheduling Assistant',
    href: 'https://github.com/pranavik24/task-manager',
    image: asset('project1.png'),
    plays: '842,193',
    duration: '3:42',
    tags: ['Ollama', 'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Framer Motion', 'ESLint'],
    description:
      'OctoMind Calendar is an AI-powered calendar and task scheduling application that automatically organizes tasks throughout the week, helping users find time to complete homework, assignments, and other responsibilities before their due dates.'
  },
  {
    title: 'Portfolio',
    subtitle: 'You\'re looking at it right now ;)',
    image: asset('portfolio_square.png'),
    plays: '518,024',
    duration: '2:58',
    tags: ['React', 'Vite', 'JavaScript', 'CSS', 'HTML', 'Postgres', 'Spotify API'],
    description:
        'Inspired by Spotify, this website is a central hub for my professional pursuits. As a collegiate-level dancer, music is a meaningful part of my life, and I wanted to bring the experience of discovering an artist into the way people explore my technical portfolio. I designed it to feel familiar, personal, and interactive while still highlighting the projects and experiences that define my work. Thanks for visiting!',
  },
  {
    title: 'Think Before You Trust',
    subtitle: 'Chain-of-Thought Reasoning for Prompt Injection Detection',
    href: 'https://github.com/pranavik24/PromptInject',
    image: asset('thinkbeforetrust_square.png'),
    plays: '518,024',
    duration: '2:58',
    tags: ['LLMs', 'Prompt Leaking', 'PyTorch', 'Hugging Face Transformers', 'Logistic Regression', 'Support Vector Machine (SVM)', 'Random Forest (RF)'],
    description:
      'This project investigates whether Chain-of-Thought (CoT) reasoning can serve as both a mitigation mechanism that reduces susceptibility to prompt injection attacks and an external detection signal for identifying compromised reasoning behavior.',
  },
    {
    title: 'SteelCityBot',
    subtitle: 'RAG chatbot for Pittsburgh and CMU context',
    href: 'https://github.com/pranavik24/steel-city-bot',
    image: asset('github_profile.png'),
    plays: '518,024',
    duration: '2:58',
    tags: ['RAG', 'Web Scraping', 'Data Ingestion', 'PyTorch', 'Sentence Transformers', 'Semantic Chunking', 'Sentence Aware Chunking', 'Hybrid Retrieval', 'FAISS', 'BM25', 'LangChain', 'Mistral', 'AWS', 'LLMs'],
    description:
      'A retrieval-augmented generation system that answers questions about Pittsburgh and CMU using hybrid retrieval and LLM response generation.',
  },
  {
    title: 'Dynamic Storage Allocator',
    subtitle: 'A correct and efficient dynamic memory allocator',
    image: asset('github_profile.png'),
    plays: '301,806',
    duration: '4:11',
    tags: ['C', 'GCC', 'GDB', 'Valgrind', 'Heap Optimization', 'Systems Programming'],
    description:
      'This implementation of malloc supports malloc, free, calloc, and realloc on the heap. To increase utilization and throughput, it uses segmented free lists, removes footers for allocated blocks, and keeps a minimum block size of 16 bytes. Achieved mean utilization of 74% and throughput of 9186 Kops/sec, compared to a benchmark of 74% utilization and 8218 Kops/sec.',
  },
    {
    title: 'Multithreaded Web Proxy',
    subtitle: 'A concurrent HTTP proxy with thread-safe caching',
    image: asset('github_profile.png'),
    plays: '301,806',
    duration: '4:11',
    tags: ['C', 'TCP/IP', 'HTTP', 'POSIX Threads', 'Race Condition Prevention', 'Systems Programming'],
    description:
      'Built a concurrent HTTP/1.0 web proxy in C that forwards client requests to web servers, handles multiple connections with POSIX threads, and caches frequently requested objects using thread-safe synchronization.',
  },
  {
    title: 'Cache Simulator',
    subtitle: 'Simulates the behavior of hardware cache memory',
    image: asset('github_profile.png'),
    plays: '301,806',
    duration: '4:11',
    tags: ['C', 'GCC', 'GDB', 'Valgrind', 'LRU Eviction', 'Memory Addressing', 'Bit Manipulation', 'Systems Programming'],
    description:
      'This simulator takes cache parameters from the command line, including set count, line count, byte count, and trace file. For each trace, it reports hits, misses, evictions, dirty bytes remaining in cache, and bytes evicted from dirty lines.',
  },
    {
    title: 'Simple Linux Shell Implementation',
    subtitle: 'A tiny shell program with job control and I/O redirection',
    image: asset('github_profile.png'),
    plays: '301,806',
    duration: '4:11',
    tags: ['C', 'Unix/Linux', 'Unix process control', 'Systems Programming'],
    description:
      'This program implements a simple Linux shell. This shell provides a command line interface, and can execute both built-in commands and external programs. This shell also maintains a list of active jobs. Some of the built-in commands it can execute are fg and bg, which can move a process to be a foreground or background job respectively. Other built-ins include quit (to quit the shell) and jobs (which lists all the active jobs).',
  },

  // {
  //   title: 'AI Kitchen Vision',
  //   subtitle: 'RGB-D object detection, localization, and tracking',
  //   href: '#connect',
  //   image: asset('me3.png'),
  //   plays: '229,745',
  //   duration: '3:25',
  //   tags: ['CV', 'Robotics', 'OpenCV'],
  //   description:
  //     'A multi-camera RGB-D perception pipeline for detecting, localizing, and tracking objects in kitchen environments.',
  // },
];

const experiences = [
  {
    role: 'Customer Success Engineer Intern',
    team: 'IBM',
    period: 'August 2026 - Present',
    start: 'August 2026',
    end: 'Present',
    image: asset('ibm_logo.png'),
    tags: [],
    description:
      'Working on the Experience Engineering team to develop AI solutions for IBM enterprise clients',
  },
  {
    role: 'Machine Learning Researcher',
    team: 'Machine Learning for Speech Processing Lab @ CMU',
    period: 'May 2026 - August 2026',
    start: 'May 2026',
    end: 'Present',
    image: asset('mlsp_img.png'),
    tags: ['Speech Verification', 'ML', 'Generative Adversarial Networks'],
    description:
      'Developing a class augmentation framework for speaker datasets using synthetic classes, adversarial mixup in embedding space, and adversarial training to improve robustness and generalization.',
  },
  {
    role: 'NLP Intern - Human-Centered AI',
    team: 'AI-CARING Institute',
    period: 'Mar 2026 - August 2026',
    start: 'Mar 2026',
    end: 'Present',
    image: asset('aicaring_logo.png'),
    tags: ['HiRAG', 'Knowledge Graphs','LLMs', 'HCAI'],
    description:
      'Building a socially aware conversational AI system with value-based RAG, hierarchical retrieval, knowledge graph construction, and LLM benchmarking across 2,000+ narratives.',
  },
  {
    role: 'AI Researcher',
    team: 'Reliable Autonomous System Lab @ CMU',
    period: 'May 2024 - Mar 2026',
    start: 'May 2024',
    end: 'Mar 2026',
    image: asset('cmu_ri.png'),
    tags: ['Computer Vision', 'Robotics', 'RGB-D', 'Depth Sensing', 'Grounding Dino', 'Grounded SAM', 'Object Tracking'],
    description:
      'Built real-time 3D computer vision pipelines with RGB-D sensors, Python, and OpenCV for multi-object detection, tracking, 3D localization, and real-world transfer evaluation.',
  },
  {
    role: 'Software Developer',
    team: 'ScottyLabs @ CMU',
    period: 'Oct 2023 - Oct 2024',
    start: 'Oct 2023',
    end: 'Oct 2024',
    image: asset('scottylabs_cmu.png'),
    tags: ['React', 'TypeScript', 'PostgreSQL', 'Search', 'Campus'],
    description:
      'Built backend systems for a campus-wide platform used by 1000+ students, including search and matching algorithms that streamlined lost and found workflows.',
  },
];

const currentSong = {
  title: 'Best Song',
  artist: 'Best Artist',
  album: '',
  image: asset('default_song.png'),
  duration: '',
};

const libraryItems = [
  {
    title: 'Pranavi Kondapalli',
    type: 'Artist',
    image: asset('me3.png'),
    active: true,
  },
];

const getArtworkAlt = (item) => {
  if (!item) {
    return '';
  }

  if (item.type === 'project') {
    return `${item.title} project artwork`;
  }

  if (item.type === 'experience') {
    return `${item.title} at ${item.subtitle}`;
  }

  return `${item.title} ${item.type}`;
};

function Icon({ name }) {
  const icons = {
    home: (
      <path d="M4.5 10.8 12 4l7.5 6.8v8.7a.7.7 0 0 1-.7.7h-4.4v-5.8H9.6v5.8H5.2a.7.7 0 0 1-.7-.7v-8.7Z" />
    ),
    search: (
      <path d="m18.8 18.8-4.1-4.1m1.5-5.3a6.8 6.8 0 1 1-13.6 0 6.8 6.8 0 0 1 13.6 0Z" />
    ),
    library: <path d="M4 5.2h3v15H4Zm5.5 0h3v15h-3Zm5.7.8 2.9-.8 3.9 14.5-2.9.8Z" />,
    plus: <path d="M12 5v14M5 12h14" />,
    play: <path d="M8.5 5.8v12.4L18 12Z" fill="currentColor" stroke="none" />,
    pause: (
      <>
        <path d="M8 5.5h2.8v13H8Z" fill="currentColor" stroke="none" />
        <path d="M13.2 5.5H16v13h-2.8Z" fill="currentColor" stroke="none" />
      </>
    ),
    previous: (
      <>
        <path d="M6.8 5.5v13" />
        <path d="m17.8 6-8.4 6 8.4 6Z" fill="currentColor" stroke="none" />
      </>
    ),
    next: (
      <>
        <path d="M17.2 5.5v13" />
        <path d="m6.2 6 8.4 6-8.4 6Z" fill="currentColor" stroke="none" />
      </>
    ),
    shuffle: (
      <path d="M4 7h2.1c2.2 0 3.4 1.1 4.7 3.5l.8 1.5c1.2 2.3 2.6 5 6.3 5H20m-3-3 3 3-3 3M4 17h2.1c1.6 0 2.6-.6 3.5-1.8M16.8 4.8 20 7l-3.2 2.2M13.5 7H20" />
    ),
    repeat: <path d="M17 2.8 20.2 6 17 9.2M3.8 11V8a2 2 0 0 1 2-2h14M7 21.2 3.8 18 7 14.8M20.2 13v3a2 2 0 0 1-2 2h-14" />,
    mic: <path d="M12 14.5a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v5.5a3 3 0 0 0 3 3Zm-6-4v1a6 6 0 0 0 12 0v-1M12 17.5V21m-3 0h6" />,
    queue: <path d="M4 6h16M4 12h16M4 18h10" />,
    device: <path d="M5 5h11.5a1.5 1.5 0 0 1 1.5 1.5V9M5 5a1.5 1.5 0 0 0-1.5 1.5v11A1.5 1.5 0 0 0 5 19h4m7-8h4.5v8H16Zm-3 3h2m0 3h-2" />,
    volume: <path d="M4 9.5h3.3L12 5v14l-4.7-4.5H4Zm12.2-.7a5 5 0 0 1 0 8.4m2.4-11.4a8 8 0 0 1 0 13.4" />,
    mini: <path d="M4 6h16v12H4Zm11 8h4" />,
    fullscreen: <path d="M8 4H4v4m12-4h4v4M8 20H4v-4m16 0v4h-4" />,
    moon: <path d="M20 15.2A7.7 7.7 0 0 1 8.8 4a8 8 0 1 0 11.2 11.2Z" />,
    sun: (
      <path d="M12 7.2a4.8 4.8 0 1 1 0 9.6 4.8 4.8 0 0 1 0-9.6Zm0-4v2m0 14.8v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2.9 12h2m14.2 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    ),
    github: (
      <path
        d="M12 3.8a8.2 8.2 0 0 0-2.6 16c.4.1.6-.2.6-.4v-1.4c-2.3.5-2.8-1-2.8-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.2 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.7-.9-3.7-4 0-.9.3-1.6.8-2.2-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8a7.6 7.6 0 0 1 4 0c1.6-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.2 0 3.1-1.9 3.8-3.7 4 .3.3.6.8.6 1.5v2.3c0 .2.1.5.6.4A8.2 8.2 0 0 0 12 3.8Z"
        fill="currentColor"
        stroke="none"
      />
    ),
    linkedin: (
      <path
        d="M6.3 8.3a1.6 1.6 0 1 1 0-3.2 1.6 1.6 0 0 1 0 3.2ZM4.9 9.8h2.8v8.8H4.9Zm4.7 0h2.7V11h.1c.4-.7 1.3-1.5 2.7-1.5 2.9 0 3.4 1.9 3.4 4.4v4.7h-2.8v-4.2c0-1 0-2.3-1.4-2.3s-1.6 1.1-1.6 2.2v4.3H9.6Z"
        fill="currentColor"
        stroke="none"
      />
    ),
    mail: (
      <>
        <path d="M4.3 6.8h15.4c.8 0 1.3.6 1.3 1.3v7.8c0 .8-.6 1.3-1.3 1.3H4.3c-.8 0-1.3-.6-1.3-1.3V8.1c0-.8.6-1.3 1.3-1.3Z" />
        <path d="m4 8 8 5.8L20 8" />
      </>
    ),
    external: <path d="M8 6h10v10m0-10L6 18" />,
    download: <path d="M12 4v10m0 0 4-4m-4 4-4-4M5 19h14" />,
    check: <path d="m4.5 12.5 4.2 4.2 10-10" />,
  };

  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      {icons[name]}
    </svg>
  );
}

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio-theme') || 'dark');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDetailPanelOpen, setIsDetailPanelOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffleOn, setIsShuffleOn] = useState(false);
  const [isRepeatOn, setIsRepeatOn] = useState(false);
  const [shuffleOrder, setShuffleOrder] = useState([]);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [playbackMessage, setPlaybackMessage] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [viewedItemIds, setViewedItemIds] = useState([]);
  const [funListens, setFunListens] = useState(0);
  const [isFunAnimating, setIsFunAnimating] = useState(false);
  const [lastFmSong, setLastFmSong] = useState(null);
  const [lastFmStatus, setLastFmStatus] = useState(hasLastFmConfig ? 'loading' : 'unconfigured');
  const [artworkSourceIndex, setArtworkSourceIndex] = useState(0);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [projectPageCount, setProjectPageCount] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const contentPanelRef = useRef(null);
  const projectsCarouselRef = useRef(null);
  const funAnimationTimerRef = useRef(null);
  const detailCloseTimerRef = useRef(null);
  const isDark = theme === 'dark';

  useEffect(() => {
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (!hasLastFmConfig) {
      return undefined;
    }

    let isMounted = true;
    fetchLastFmTrack({ apiKey: lastFmApiKey, username: lastFmUsername })
      .then((song) => {
        if (isMounted) {
          setLastFmSong(song);
          setLastFmStatus(song ? 'ready' : 'empty');
        }
      })
      .catch(() => {
        if (isMounted) {
          setLastFmStatus('error');
          setToastMessage('Unable to load latest Last.fm track');
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setArtworkSourceIndex(0);
  }, [lastFmSong?.image]);

  useEffect(() => {
    const savedListens = localStorage.getItem('funListens');
    if (savedListens) {
      setFunListens(Number(savedListens));
    }

    if (!hasSharedCounter) {
      return undefined;
    }

    let isMounted = true;
    getFunListens()
      .then((sharedListens) => {
        if (isMounted && sharedListens !== null) {
          setFunListens(sharedListens);
          localStorage.setItem('funListens', String(sharedListens));
        }
      })
      .catch((error) => {
        if (isMounted) {
          setToastMessage(error.message);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const playableItems = useMemo(
    () => [
      ...experiences.map((experience) => ({
        id: `experience-${experience.role}`,
        type: 'experience',
        title: experience.role,
        subtitle: experience.team,
        image: experience.image,
        period: experience.period,
        duration: experience.period,
        year: experience.start.match(/\d{4}/)?.[0] || experience.period.match(/\d{4}/)?.[0] || '',
        description: experience.description,
        tags: experience.tags,
      })),
      ...projects.map((project) => ({
        id: `project-${project.title}`,
        type: 'project',
        title: project.title,
        subtitle: project.subtitle,
        image: project.image,
        period: project.tags.join(' · '),
        duration: project.duration,
        year: '',
        description: project.description,
        tags: project.tags,
        href: project.href,
      })),
    ],
    [],
  );

  const playableById = useMemo(
    () => new Map(playableItems.map((item) => [item.id, item])),
    [playableItems],
  );

  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return [];
    }

    return playableItems
      .map((item) => {
        const tagScore = item.tags.reduce((score, tag) => {
          const normalizedTag = tag.toLowerCase();
          if (normalizedTag === query) return score + 100;
          if (normalizedTag.startsWith(query)) return score + 70;
          if (normalizedTag.includes(query)) return score + 45;
          return score;
        }, 0);
        const titleScore = item.title.toLowerCase().includes(query) ? 18 : 0;
        const subtitleScore = item.subtitle.toLowerCase().includes(query) ? 10 : 0;

        return { item, score: tagScore + titleScore + subtitleScore };
      })
      .filter((result) => result.score > 0)
      .sort((first, second) => second.score - first.score)
      .slice(0, 4);
  }, [playableItems, searchQuery]);

  const makeShuffleOrder = (currentId = selectedItem?.id) => {
    const ids = playableItems.map((item) => item.id);
    for (let index = ids.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [ids[index], ids[swapIndex]] = [ids[swapIndex], ids[index]];
    }

    if (currentId) {
      const currentIndex = ids.indexOf(currentId);
      if (currentIndex > 0) {
        ids.splice(currentIndex, 1);
        ids.unshift(currentId);
      }
    }

    return ids;
  };

  const selectPlayableItem = (item) => {
    window.clearTimeout(detailCloseTimerRef.current);
    setSelectedItem(item);
    setIsDetailPanelOpen(true);
    setIsPlaying(true);
    setElapsedSeconds(0);
    setPlaybackMessage('');
    setToastMessage('');
    setViewedItemIds((ids) => (ids.includes(item.id) ? ids : [...ids, item.id]));
  };

  const selectSearchResult = (item) => {
    selectPlayableItem(item);
    setSearchQuery(item.tags[0] || item.title);
    setIsSearchOpen(false);
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === 'Escape') {
      setIsSearchOpen(false);
      event.currentTarget.blur();
    }
  };

  const closeDetailPanel = () => {
    setIsDetailPanelOpen(false);
    setIsPlaying(false);
    window.clearTimeout(detailCloseTimerRef.current);
    const closeDelay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 240;
    detailCloseTimerRef.current = window.setTimeout(() => {
      setSelectedItem(null);
      setElapsedSeconds(0);
    }, closeDelay);
  };

  const returnToNowListening = () => {
    closeDetailPanel();
    setIsPlaying(false);
    setElapsedSeconds(0);
    setPlaybackMessage('End of playlist');
    setToastMessage('End of playlist');
    window.setTimeout(() => {
      document.getElementById('now-listening')?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, 0);
  };

  const moveInQueue = (direction) => {
    const order = isShuffleOn && shuffleOrder.length ? shuffleOrder : playableItems.map((item) => item.id);
    const startIndex = selectedItem ? order.indexOf(selectedItem.id) : direction > 0 ? -1 : 0;
    const requestedIndex = startIndex + direction;
    const viewedIds = new Set(viewedItemIds);
    if (selectedItem) {
      viewedIds.add(selectedItem.id);
    }
    const hasViewedAllItems = playableItems.every((item) => viewedIds.has(item.id));

    if (!isRepeatOn && requestedIndex >= order.length) {
      if (hasViewedAllItems) {
        returnToNowListening();
        return;
      }

      const nextUnviewedId = order.find((id) => !viewedIds.has(id));
      selectPlayableItem(playableById.get(nextUnviewedId));
      return;
    }

    if (!isRepeatOn && requestedIndex < 0) {
      return;
    }

    const nextIndex = (requestedIndex + order.length) % order.length;
    selectPlayableItem(playableById.get(order[nextIndex]));
  };

  const toggleShuffle = () => {
    setIsShuffleOn((wasOn) => {
      if (!wasOn) {
        setShuffleOrder(makeShuffleOrder());
      }
      return !wasOn;
    });
  };

  const togglePlayback = () => {
    if (!selectedItem) {
      selectPlayableItem(playableItems[0]);
      return;
    }
    setPlaybackMessage('');
    setIsPlaying((playing) => !playing);
  };

  const handleFunListen = async () => {
    const nextListens = funListens + 1;
    setFunListens(nextListens);
    localStorage.setItem('funListens', String(nextListens));
    setIsFunAnimating(true);
    window.clearTimeout(funAnimationTimerRef.current);
    funAnimationTimerRef.current = window.setTimeout(() => setIsFunAnimating(false), 1500);

    if (!hasSharedCounter) {
      return;
    }

    try {
      const sharedListens = await incrementFunListens();
      if (sharedListens !== null) {
        setFunListens(sharedListens);
        localStorage.setItem('funListens', String(sharedListens));
      }
    } catch (error) {
      setToastMessage(error.message);
    }
  };

  const scrollToTop = (event) => {
    event.preventDefault();
    contentPanelRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToContentSection = (event, sectionId) => {
    event.preventDefault();
    if (sectionId === 'profile') {
      contentPanelRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    contentPanelRef.current
      ?.querySelector(`#${sectionId}`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollProjects = (direction) => {
    const carousel = projectsCarouselRef.current;
    const firstCard = carousel?.querySelector('.album-card');
    if (!carousel || !firstCard) {
      return;
    }

    const styles = window.getComputedStyle(carousel);
    const gap = Number.parseFloat(styles.columnGap) || 0;
    carousel.scrollBy({
      left: direction * (firstCard.getBoundingClientRect().width + gap),
      behavior: 'smooth',
    });
  };

  const updateProjectIndicator = () => {
    const carousel = projectsCarouselRef.current;
    const firstCard = carousel?.querySelector('.album-card');
    if (!carousel || !firstCard) {
      return;
    }

    const styles = window.getComputedStyle(carousel);
    const gap = Number.parseFloat(styles.columnGap) || 0;
    const step = firstCard.getBoundingClientRect().width + gap;
    const visibleCards = Math.max(1, Math.round((carousel.clientWidth + gap) / step));
    const nextPageCount = Math.max(1, projects.length - visibleCards + 1);
    const nextIndex = Math.round(carousel.scrollLeft / step);

    setProjectPageCount(nextPageCount);
    setActiveProjectIndex(Math.max(0, Math.min(nextPageCount - 1, nextIndex)));
  };

  const scrollProjectToIndex = (index) => {
    const carousel = projectsCarouselRef.current;
    const firstCard = carousel?.querySelector('.album-card');
    if (!carousel || !firstCard) {
      return;
    }

    const styles = window.getComputedStyle(carousel);
    const gap = Number.parseFloat(styles.columnGap) || 0;
    const clampedIndex = Math.max(0, Math.min(projectPageCount - 1, index));
    carousel.scrollTo({
      left: clampedIndex * (firstCard.getBoundingClientRect().width + gap),
      behavior: 'smooth',
    });
    setActiveProjectIndex(clampedIndex);
  };

  const endSeconds = selectedItem ? 120 + (selectedItem.year ? Number(selectedItem.year.slice(-2)) : 0) : 0;
  const endTime = selectedItem ? `2:${selectedItem.year ? selectedItem.year.slice(-2) : '00'}` : '';
  const progressValue = endSeconds ? Math.min((elapsedSeconds / endSeconds) * 100, 100) : 0;
  const progressStyle = { '--progress-value': progressValue };
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  useEffect(() => {
    if (!isPlaying || !selectedItem || !endSeconds) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setElapsedSeconds((seconds) => {
        if (seconds >= endSeconds) {
          window.clearInterval(timer);
          setIsPlaying(false);
          return endSeconds;
        }

        return seconds + 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [endSeconds, isPlaying, selectedItem]);

  useEffect(() => {
    if (!toastMessage) {
      return undefined;
    }

    const timer = window.setTimeout(() => setToastMessage(''), 2600);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  useEffect(() => {
    updateProjectIndicator();
    window.addEventListener('resize', updateProjectIndicator);

    return () => window.removeEventListener('resize', updateProjectIndicator);
  }, []);

  useEffect(
    () => () => {
      window.clearTimeout(detailCloseTimerRef.current);
    },
    [],
  );

  const lastListenedSong = lastFmSong
    ? {
        ...currentSong,
        ...lastFmSong,
        image: lastFmSong.image || currentSong.image,
      }
    : currentSong;
  const artworkSources = getArtworkSources(lastListenedSong.image, currentSong.image);
  const artworkSource = artworkSources[Math.min(artworkSourceIndex, artworkSources.length - 1)] || currentSong.image;
  const handleArtworkError = () => {
    setArtworkSourceIndex((index) => Math.min(index + 1, artworkSources.length - 1));
  };
  const lastFmStatusMessage = {
    loading: 'Loading latest track…',
    empty: 'No recent track found on Last.fm',
    error: 'Last.fm unavailable — showing fallback track',
  }[lastFmStatus];
  const nowPlaying = selectedItem
    ? {
        title: selectedItem.title,
        artist: selectedItem.subtitle,
        image: selectedItem.image,
        duration: selectedItem.duration,
      }
    : { ...lastListenedSong, image: artworkSource };
  const funImage = isFunAnimating ? asset('fun_light_ani.PNG') : asset('fun_light.PNG');

  return (
    <div className="spotify-shell" data-theme={theme}>
      <header className="top-bar" aria-label="Portfolio navigation">
        <div className="nav-center">
          <a className="home-button" href="#top" aria-label="Home" onClick={scrollToTop}>
            <Icon name="home" />
          </a>
          <div className="search-area">
            <div className="search-box">
              <Icon name="search" />
              <input
                type="search"
                value={searchQuery}
                placeholder="Search projects, skills, or experience"
                aria-label="Search portfolio by tag"
                aria-autocomplete="list"
                aria-expanded={isSearchOpen && searchResults.length > 0}
                aria-controls="search-results"
                role="combobox"
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                onKeyDown={handleSearchKeyDown}
              />
              {searchQuery ? (
                <button
                  type="button"
                  className="search-clear"
                  aria-label="Clear search"
                  onClick={() => {
                    setSearchQuery('');
                    setIsSearchOpen(false);
                  }}
                >
                  ×
                </button>
              ) : null}
            </div>
            {isSearchOpen && searchResults.length > 0 ? (
              <div className="search-results" id="search-results" role="listbox">
                {searchResults.map(({ item }) => (
                  <button
                    type="button"
                    key={item.id}
                    role="option"
                    aria-selected={selectedItem?.id === item.id}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => selectSearchResult(item)}
                  >
                    <img src={item.image} alt={getArtworkAlt(item)} />
                    <span>
                      <strong>{item.title}</strong>
                      <small>
                        {item.type === 'project' ? 'Project' : 'Experience'} · {item.tags.slice(0, 4).join(' · ')}
                      </small>
                    </span>
                    <Icon name="play" />
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
        <nav className="top-links" aria-label="External links">
          <a href={links.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <Icon name="github" />
          </a>
          <a href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Icon name="linkedin" />
          </a>
          <a href={links.email} aria-label="Email">
            <Icon name="mail" />
          </a>
          <button
            type="button"
            className="theme-toggle"
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            aria-pressed={!isDark}
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
          >
            <Icon name={isDark ? 'sun' : 'moon'} />
          </button>
        </nav>
      </header>

      <div className={`app-grid${selectedItem ? ' has-detail' : ''}`}>
        <aside className="library-panel" aria-label="Portfolio library">
          <div className="library-heading">
            <div>
              <Icon name="library" />
              <h2>Your Library</h2>
            </div>
            <a className="create-button" href={links.resume} target="_blank" rel="noreferrer">
              Resume
            </a>
          </div>

          <div className="chip-row" aria-label="Portfolio categories">
            <a href="#experience" onClick={(event) => scrollToContentSection(event, 'experience')}>Work</a>
            <a href="#projects" onClick={(event) => scrollToContentSection(event, 'projects')}>Projects</a>
            <a href="#connect" onClick={(event) => scrollToContentSection(event, 'connect')}>Connect</a>
          </div>

          <ul className="library-list">
            {libraryItems.map((item) => (
              <li key={item.title}>
                <a
                  className={item.active ? 'active' : undefined}
                  href={item.active ? '#profile' : '#projects'}
                  onClick={(event) => scrollToContentSection(event, item.active ? 'profile' : 'projects')}
                >
                  <img src={item.image} alt={`${item.title} ${item.type}`} />
                  <span>
                    <strong>{item.title}</strong>
                    <small>{item.type}</small>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="sidebar-note">
            <p>AI @ Carnegie Mellon</p>
            <small>Built by Pranavi Kondapalli</small>
          </div>
        </aside>

        <main className="content-panel" id="profile" ref={contentPanelRef}>
          <section className="artist-hero" aria-label="Profile">
            <img className="hero-backdrop" src={asset('cmu_banner.jpg')} alt="" />
            <div className="hero-shade" />
            <div className="artist-copy">
              <div className="artist-identity">
                <img className="hero-profile" src={asset('me3.png')} alt="Pranavi Kondapalli" />
                <div className="artist-text">
                  <p className="verified">
                    <span>
                      <Icon name="check" />
                    </span>
                    Verified
                  </p>
                  <h1>Pranavi Kondapalli</h1>
                  <p className="artist-meta">
                    Artificial Intelligence @ Carnegie Mellon University
                  </p>
                </div>
              </div>
              {/* <p className="artist-summary">
                I build AI systems across speech, computer vision, robotics, and
                human-centered products, with a bias toward reliable tools that
                work in real settings.
              </p> */}
            </div>
          </section>

          <section className="action-row" aria-label="Profile actions">
            <button
              type="button"
              className="play-button"
              aria-label={isPlaying ? 'Pause selected item' : 'Play selected item'}
              aria-pressed={isPlaying}
              onClick={togglePlayback}
            >
              <Icon name={selectedItem && isPlaying ? 'pause' : 'play'} />
            </button>
            <a className="cover-chip" href={links.github} target="_blank" rel="noreferrer">
              <img src={asset('github_profile.png')} alt="GitHub profile" />
            </a>
            <a className="follow-button" href={links.resume} target="_blank" rel="noreferrer">
              Resume
            </a>
            <a className="icon-link" href={links.email} aria-label="Email">
              <Icon name="mail" />
            </a>
            <a className="icon-link" href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Icon name="linkedin" />
            </a>
          </section>

          <section className="popular-section" id="experience" aria-labelledby="popular-title">
            <div className="section-title-row">
              <h2 id="popular-title">Work Experience</h2>
            </div>

            <ol className="track-list">
              {experiences.map((experience, index) => (
                <li key={`${experience.role}-${experience.team}`}>
                  <button
                    type="button"
                    className={selectedItem?.type === 'experience' && selectedItem.title === experience.role ? 'is-selected' : undefined}
                    onClick={() => selectPlayableItem(playableById.get(`experience-${experience.role}`))}
                  >
                    <span className="track-number">{index + 1}</span>
                    <img src={experience.image} alt={`${experience.role} at ${experience.team}`} />
                    <span className="track-main">
                      <strong>{experience.role}</strong>
                      <small>{experience.team}</small>
                    </span>
                    {/* <span className="tag-strip">
                      {experience.tags.map((tag) => (
                        <small key={tag}>{tag}</small>
                      ))}
                    </span> */}
                    <span className="duration">{experience.period} </span>
                    {/* <span className="duration"></span> */}
                  </button>
                </li>
              ))}
            </ol>
          </section>

          <section className="shelf-section" id="projects" aria-labelledby="projects-title">
            <div className="section-title-row">
              <h2 id="projects-title">Projects</h2>
              <div className="carousel-controls" aria-label="Project carousel controls">
                <button type="button" aria-label="Previous projects" onClick={() => scrollProjects(-1)}>
                  <Icon name="previous" />
                </button>
                <button type="button" aria-label="Next projects" onClick={() => scrollProjects(1)}>
                  <Icon name="next" />
                </button>
              </div>
            </div>
            <div className="album-grid" ref={projectsCarouselRef} onScroll={updateProjectIndicator}>
              {projects.map((project) => (
                <button
                  type="button"
                  className={`album-card${selectedItem?.type === 'project' && selectedItem.title === project.title ? ' is-selected' : ''}`}
                  key={project.title}
                  onClick={() => selectPlayableItem(playableById.get(`project-${project.title}`))}
                >
                  <img src={project.image} alt={`${project.title} project artwork`} />
                  <h3>{project.title}</h3>
                  <p>{project.subtitle}</p>
                  <small className="card-tags">
                    <span>{project.tags.join(' · ')}</span>
                  </small>
                </button>
              ))}
            </div>
            <div className="carousel-dots" aria-label="Project carousel position">
              {Array.from({ length: projectPageCount }, (_, index) => (
                <button
                  type="button"
                  className={index === activeProjectIndex ? 'is-active' : undefined}
                  key={`project-page-${index + 1}`}
                  aria-label={`Go to project page ${index + 1}`}
                  aria-current={index === activeProjectIndex ? 'true' : undefined}
                  onClick={() => scrollProjectToIndex(index)}
                />
              ))}
            </div>
          </section>

          <section className="two-column-section" id="connect" aria-label="Connect and now listening">
            <div className="panel-card connect-card">
              <div className="section-title-row">
                <h2>Let's connect</h2>
              </div>
              <p>
                I'm always excited to meet new people and talk about new technologies!
              </p>
              <div className="connect-actions">
                <a href={links.email}>
                  <Icon name="mail" />
                  Email
                </a>
                <a href={links.linkedin} target="_blank" rel="noreferrer">
                  <Icon name="linkedin" />
                  LinkedIn
                </a>
                <a href={links.github} target="_blank" rel="noreferrer">
                  <Icon name="github" />
                  GitHub
                </a>
              </div>
              <div className="fun-listens">
                {/* <span className="click-me-arrow">click me ↘</span> */}
                <button type="button" aria-label="Add a listen" onClick={handleFunListen}>
                  <img src={funImage} alt="Interactive listen counter artwork" />
                </button>
                <p>{funListens.toLocaleString()} Listens</p>
                <small>Thanks for visiting!</small>
              </div>
            </div>

            <div className="panel-card contact-card" id="now-listening">
              <div className="section-title-row">
                <h2>{lastListenedSong.isNowPlaying ? 'Now Playing:' : 'Last Listened To:'}</h2>
              </div>
              <img
                src={artworkSource}
                alt={`${lastListenedSong.title} cover art`}
                onError={handleArtworkError}
              />
              <h3>{lastListenedSong.title}</h3>
              <p>{[lastListenedSong.artist, lastListenedSong.album, lastListenedSong.duration].filter(Boolean).join(' · ')}</p>
              {lastFmStatusMessage ? (
                <div className="song-status" role="status">
                  {lastFmStatusMessage}
                </div>
              ) : null}
              {playbackMessage ? (
                <div className="song-status">
                  <Icon name="check" />
                  {playbackMessage}
                </div>
              ) : null}
            </div>
          </section>
        </main>

        {selectedItem ? (
          <aside
            className="experience-detail-panel"
            key={selectedItem.id}
            data-state={isDetailPanelOpen ? 'open' : 'closing'}
            aria-hidden={!isDetailPanelOpen}
            inert={!isDetailPanelOpen ? true : undefined}
            aria-label="Selected item details"
          >
            <div className="detail-heading">
              <h2>{selectedItem.title}</h2>
              <button
                type="button"
                aria-label="Close details"
                onClick={closeDetailPanel}
              >
                ×
              </button>
            </div>
            <img src={selectedItem.image} alt={getArtworkAlt(selectedItem)} />
            <p className="detail-team">{selectedItem.subtitle}</p>
            {selectedItem.type === 'experience' ? (
              <p className="detail-period">{selectedItem.period}</p>
            ) : null}
            <p className="detail-description">{selectedItem.description}</p>
            <div className="detail-tags" aria-label={`${selectedItem.type} tags`}>
              {selectedItem.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            {selectedItem.href && !selectedItem.href.startsWith('#') ? (
              <a className="detail-link" href={selectedItem.href} target="_blank" rel="noreferrer">
                Open project
                <Icon name="external" />
              </a>
            ) : null}
          </aside>
        ) : null}
      </div>

      <footer className="player-bar" aria-label="Footer">
        <div className="now-playing">
          <img src={nowPlaying.image} alt={`${nowPlaying.title} artwork`} />
          <span>
            <strong>{nowPlaying.title}</strong>
            <small>{nowPlaying.artist}</small>
          </span>
          {selectedItem ? (
            <span className="selected-check" aria-label="Selected">
              <Icon name="check" />
            </span>
          ) : null}
        </div>
        <div className="player-center">
          <div className="player-controls">
            <button
              type="button"
              className={isShuffleOn ? 'is-active' : undefined}
              aria-label={isShuffleOn ? 'Turn shuffle off' : 'Turn shuffle on'}
              aria-pressed={isShuffleOn}
              onClick={toggleShuffle}
            >
              <Icon name="shuffle" />
            </button>
            <button type="button" aria-label="Previous item" onClick={() => moveInQueue(-1)}>
              <Icon name="previous" />
            </button>
            <button
              type="button"
              className="control-play"
              aria-label={isPlaying ? 'Pause selected item' : 'Play selected item'}
              aria-pressed={isPlaying}
              onClick={togglePlayback}
            >
              <Icon name={isPlaying ? 'pause' : 'play'} />
            </button>
            <button type="button" aria-label="Next item" onClick={() => moveInQueue(1)}>
              <Icon name="next" />
            </button>
            <button
              type="button"
              className={isRepeatOn ? 'is-active' : undefined}
              aria-label={isRepeatOn ? 'Turn repeat off' : 'Turn repeat on'}
              aria-pressed={isRepeatOn}
              onClick={() => setIsRepeatOn((repeat) => !repeat)}
            >
              <Icon name="repeat" />
            </button>
          </div>
          <div className="progress-row" style={progressStyle} aria-hidden="true">
            <span>{selectedItem ? formatTime(elapsedSeconds) : '0:00'}</span>
            <span className="progress-track">
              <span />
            </span>
            <span>{endTime}</span>
          </div>
        </div>
        <div className="player-period" aria-label="Selected period">
          {selectedItem?.type === 'experience' ? selectedItem.period : ''}
        </div>
      </footer>
      {toastMessage ? (
        <div className="toast-message" role="status" aria-live="polite">
          {toastMessage}
        </div>
      ) : null}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
