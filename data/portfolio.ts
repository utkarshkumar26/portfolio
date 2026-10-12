export const profile = {
  name: "Utkarsh Kumar",
  role: "Software Engineer",
  roles: ["Software Engineer", "Full-Stack Developer", "AI Automation Builder"],
  availability: "OPEN TO OPPORTUNITIES",
  team: "Meta's Enterprise Products Engineering team (via Wipro)",
  location: "Bangalore, India",
  email: "utkarshtiwari20020@gmail.com",
  github: "https://github.com/utkarshkumar26",
  linkedin: "https://linkedin.com/in/utkarshtiwari04",
  resume: "https://drive.google.com/file/d/1Oao_9KmRMkc58vz1VNpnzX0mMl-HLJ8a/view",
  pitch: "I build and ship production apps at Meta scale, with AI agents in the loop.",
  summary:
    "Software Engineer with 1+ year of experience in full-stack development and AI-driven automation, working on Meta's Enterprise Products Engineering team with TypeScript, Hack, React, GraphQL and Python, plus AI-assisted development using coding agents.",
  education: "B.Tech in Computer Science and Engineering, BIT Mesra (2021–2025)",
  seoTitle: "Utkarsh Kumar — Software Engineer",
  seoDescription:
    "Utkarsh Kumar is a Software Engineer building full-stack products and AI-driven automation on Meta's Enterprise Products Engineering team.",
} as const;

export const stats = [
  { value: "200+", label: "production code changes" },
  { value: "160+", label: "automation scripts" },
  { value: "~97%", label: "automation pass rate" },
  { value: "6", label: "team members led" },
] as const;

export const experience = {
  company: "Wipro",
  team: "Meta's Enterprise Products Engineering Team",
  role: "Software Engineer",
  dates: "Oct 2025 – Present",
  location: "Bangalore, India",
  highlights: [
    "Delivered 200+ production changes across TypeScript, Hack, React, GraphQL and Python (features, bug fixes, security remediation, on-call).",
    "Enhanced GenAI features in Meta's Performance Management Tool, including an AI calibration-notes drafter and AI feedback suggestions.",
    'Built a one-click "Polish with AI" feature for self-reviews that preserves meaning and facts and leaves approval decisions to managers.',
    "Led a 6-member AI-powered QA automation initiative: 160+ scripts, ~97% pass rate, delivered ahead of schedule.",
    "Automated hourly Chronos job sync from Configerator for the People Data Platform; migrated recruiting schemas to LinkedSchema.",
  ],
  technologies: [
    "TypeScript",
    "Hack",
    "React",
    "Flow",
    "GraphQL",
    "Relay",
    "Python",
    "Playwright",
    "Jest",
    "Claude Code",
    "Devmate",
    "Codex",
  ],
} as const;

export const projects = [
  {
    id: "perfai",
    name: "PerfAI",
    eyebrow: "01 / FLAGSHIP",
    title: "AI Performance & Career Platform",
    description:
      "A role-based performance and career platform that pairs structured workflows with AI-powered task, review and career guidance.",
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Upstash Redis",
      "OpenAI / Gemini",
      "Jest",
      "Vercel",
    ],
    highlights: [
      "AI task generation with scope, acceptance criteria and edge cases; plus bug/task solving with root causes, solution steps, PR titles and test plans.",
      "AI review polishing and employee/manager experiences across 36 REST API handlers and 11 Prisma models.",
      "HMAC-signed sessions, AI career roadmaps, skill-gap analysis, promotion readiness and a chat assistant with saved chats.",
      "LLM provider abstraction with structured JSON output and per-user rate limiting.",
    ],
    problem:
      "Performance and career workflows benefit from clear, structured guidance. This project brings those workflows and AI assistance into one platform.",
    solution:
      "Built employee and manager experiences for task creation, review preparation and career planning, with dedicated AI features and saved assistant chats.",
    outcome:
      "The supplied project details include 36 REST API handlers across 11 Prisma models. No additional usage or impact metrics were provided.",
    repo: "https://github.com/utkarshkumar26/PerfAI---PUBLIC",
    live: "https://perf-ai-uk.vercel.app/",
    featured: true,
  },
  {
    id: "ondc",
    name: "ONDC Price Optimization",
    eyebrow: "02 / HACKATHON",
    title: "Finalist · Top 10 nationwide",
    description:
      "Price optimization project for the ONDC Build for Bharat Hackathon 2024. Further problem and implementation details were not provided.",
    stack: ["[Stack details to be added]"],
    highlights: [
      "Finalist in the ONDC Build for Bharat Hackathon 2024.",
      "Top 10 nationwide, as provided.",
      "Add a verified project summary and stack details when available.",
    ],
    problem: "[Add the specific pricing problem this project addresses.]",
    solution: "[Add the verified approach and key implementation details.]",
    outcome: "Finalist · Top 10 nationwide · ONDC Build for Bharat Hackathon 2024.",
    repo: "https://github.com/utkarshkumar26/ONDC-PriceOptimization",
    live: null,
    featured: false,
  },
  {
    id: "mcq-generator",
    name: "Multiple Choice Question Generator",
    eyebrow: "03 / PROJECT",
    title: "Question generation",
    description:
      "[Add a verified 1–2 line description of the project and how it generates multiple-choice questions.]",
    stack: ["[Stack details to be added]"],
    highlights: ["[Add verified project highlights.]"],
    problem: "[Add the problem this project solves.]",
    solution: "[Add the verified solution and implementation.]",
    outcome: "[Add a verified outcome or metric, if available.]",
    repo: "https://github.com/utkarshkumar26/Multiple-Choice-Question-Generator",
    live: null,
    featured: false,
  },
  {
    id: "career-recommendation",
    name: "Career Recommendation System",
    eyebrow: "04 / PROJECT",
    title: "Career recommendations",
    description:
      "[Add a verified 1–2 line description of this career recommendation system.]",
    stack: ["[Stack details to be added]"],
    highlights: ["[Add verified project highlights.]"],
    problem: "[Add the problem this project solves.]",
    solution: "[Add the verified recommendation approach.]",
    outcome: "[Add a verified outcome or metric, if available.]",
    repo: "https://github.com/utkarshkumar26/Career-Recommendation-Syst3",
    live: null,
    featured: false,
  },
] as const;

export const skillGroups = [
  {
    name: "Languages",
    skills: ["C++", "Java", "Python", "JavaScript", "TypeScript", "Hack", "SQL", "PHP"],
  },
  {
    name: "Frontend",
    skills: ["React", "Next.js", "Flow", "HTML5", "CSS3"],
  },
  {
    name: "Backend",
    skills: ["Node.js", "Express", "Flask", "GraphQL", "REST", "Microservices"],
  },
  {
    name: "Databases",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Prisma"],
  },
  {
    name: "Testing & DevOps",
    skills: ["Playwright", "Jest", "Docker", "Git", "Jenkins", "CI/CD", "AWS", "Vercel", "Kafka"],
  },
  {
    name: "AI & LLM",
    skills: ["Generative AI", "Prompt Engineering", "AI Agents", "Claude Code", "Devmate", "Codex"],
  },
] as const;

export const achievements = [
  {
    title: "Inspiring Performance",
    issuer: "Wipro",
    detail: "Recognition",
    mark: "IP",
  },
  {
    title: "Build for Bharat",
    issuer: "ONDC Hackathon 2024",
    detail: "Finalist · Top 10 nationwide",
    mark: "10",
  },
  {
    title: "Developer – Associate",
    issuer: "AWS Certified",
    detail: "2026–2029",
    mark: "AWS",
  },
  {
    title: "Foundations Associate",
    issuer: "Oracle Certified",
    detail: "2025–2027",
    mark: "OC",
  },
] as const;

export const navigation = [
  { label: "About", id: "about" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Skills", id: "skills" },
  { label: "Contact", id: "contact" },
] as const;
