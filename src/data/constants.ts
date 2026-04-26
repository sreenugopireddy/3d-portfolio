// Sreenu Gopireddy — Data Analyst & AI Engineer
// IMPORTANT: Each SkillNames value MUST exactly match the 3D object name
// inside public/assets/skills-keyboard.spline. The Spline file has 25 keycap
// objects named: js, ts, html, css, react, vue, nextjs, tailwind, nodejs,
// express, postgres, mongodb, git, github, prettier, npm, firebase, wordpress,
// linux, docker, nginx, aws, gcp, vim, vercel
// We reuse those slot names but override every label, description, color, and icon
// so every key on the keyboard represents YOUR data skills.

export enum SkillNames {
  JS        = "js",        // → Python
  TS        = "ts",        // → SQL
  HTML      = "html",      // → R
  CSS       = "css",       // → Pandas
  REACT     = "react",     // → NumPy
  VUE       = "vue",       // → Scikit-learn
  NEXTJS    = "nextjs",    // → MLflow
  TAILWIND  = "tailwind",  // → FAISS
  NODEJS    = "nodejs",    // → LangChain
  EXPRESS   = "express",   // → Streamlit
  POSTGRES  = "postgres",  // → FastAPI
  MONGODB   = "mongodb",   // → SQLite
  GIT       = "git",       // → SQLAlchemy
  GITHUB    = "github",    // → Power BI
  PRETTIER  = "prettier",  // → Plotly
  NPM       = "npm",       // → Chart.js
  FIREBASE  = "firebase",  // → Docker
  WORDPRESS = "wordpress", // → Git
  LINUX     = "linux",     // → Linux
  DOCKER    = "docker",    // → GitHub
  NGINX     = "nginx",     // → AWS
  AWS       = "aws",       // → Oracle Cloud
  GCP       = "gcp",       // → Vercel
  VIM       = "vim",       // → Overleaf
  VERCEL    = "vercel",    // → Jupyter
}

export type Skill = {
  id: number;
  name: string;
  label: string;
  shortDescription: string;
  color: string;
  icon: string;
};

export const SKILLS: Record<SkillNames, Skill> = {
  [SkillNames.JS]: {
    id: 1,
    name: "js",
    label: "Python",
    shortDescription: "the glue of data science, deadass indispensable 🐍🔥",
    color: "#3776AB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  [SkillNames.TS]: {
    id: 2,
    name: "ts",
    label: "SQL",
    shortDescription: "SELECT * FROM skills WHERE value = 'high' 💅🗄️",
    color: "#F29111",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  },
  [SkillNames.HTML]: {
    id: 3,
    name: "html",
    label: "R",
    shortDescription: "stats never looked this good, periodt 📊✨",
    color: "#276DC3",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg",
  },
  [SkillNames.CSS]: {
    id: 4,
    name: "css",
    label: "Pandas",
    shortDescription: "DataFrames hitting different every time 🐼📊",
    color: "#150458",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
  },
  [SkillNames.REACT]: {
    id: 5,
    name: "react",
    label: "NumPy",
    shortDescription: "arrays and math going crazy, no cap 🔢⚡",
    color: "#013243",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
  },
  [SkillNames.VUE]: {
    id: 6,
    name: "vue",
    label: "Scikit-learn",
    shortDescription: "ML pipelines bussin' fr fr 🤖🔬",
    color: "#F7931E",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg",
  },
  [SkillNames.NEXTJS]: {
    id: 7,
    name: "nextjs",
    label: "MLflow",
    shortDescription: "tracking experiments like a pro scientist 🧪📋",
    color: "#0194E2",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  [SkillNames.TAILWIND]: {
    id: 8,
    name: "tailwind",
    label: "FAISS",
    shortDescription: "vector search hitting different, fr 🔍⚡",
    color: "#0066CC",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  [SkillNames.NODEJS]: {
    id: 9,
    name: "nodejs",
    label: "LangChain",
    shortDescription: "chaining LLMs like a data wizard 🧙‍♂️🔗",
    color: "#1C3C3C",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  [SkillNames.EXPRESS]: {
    id: 10,
    name: "express",
    label: "Streamlit",
    shortDescription: "data apps at lightspeed, sheesh 🚀🎈",
    color: "#FF4B4B",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  [SkillNames.POSTGRES]: {
    id: 11,
    name: "postgres",
    label: "FastAPI",
    shortDescription: "async APIs go brrr, no cap! ⚡🔌",
    color: "#009688",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
  },
  [SkillNames.MONGODB]: {
    id: 12,
    name: "mongodb",
    label: "SQLite",
    shortDescription: "lightweight but hits heavy fr 🦾🗃️",
    color: "#003B57",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg",
  },
  [SkillNames.GIT]: {
    id: 13,
    name: "git",
    label: "SQLAlchemy",
    shortDescription: "ORM sorcery making queries feel clean ✨🧬",
    color: "#D71F00",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  [SkillNames.GITHUB]: {
    id: 14,
    name: "github",
    label: "Power BI",
    shortDescription: "turning raw data into boardroom bangers 📈💼",
    color: "#F2C811",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuredevops/azuredevops-original.svg",
  },
  [SkillNames.PRETTIER]: {
    id: 15,
    name: "prettier",
    label: "Plotly",
    shortDescription: "interactive charts hitting different fr fr 📉🎨",
    color: "#3F4F75",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  [SkillNames.NPM]: {
    id: 16,
    name: "npm",
    label: "Chart.js",
    shortDescription: "canvas-based charts bussin', no cap 🖼️📊",
    color: "#FF6384",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  [SkillNames.FIREBASE]: {
    id: 17,
    name: "firebase",
    label: "Docker",
    shortDescription: "containers go zoom zoom, sheesh 🐳🔥",
    color: "#2496ED",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  [SkillNames.WORDPRESS]: {
    id: 18,
    name: "wordpress",
    label: "Git",
    shortDescription: "the code's personal bodyguard, no cap! 🕵️‍♂️🔄",
    color: "#F1502F",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  [SkillNames.LINUX]: {
    id: 19,
    name: "linux",
    label: "Linux",
    shortDescription: "terminal life chose me, fr fr 🐧💻",
    color: "#FCC624",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
  },
  [SkillNames.DOCKER]: {
    id: 20,
    name: "docker",
    label: "GitHub",
    shortDescription: "sliding into those pull requests, IYKYK! 🐙",
    color: "#24292E",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },
  [SkillNames.NGINX]: {
    id: 21,
    name: "nginx",
    label: "AWS",
    shortDescription: "ML in the cloud — certified & ready ☁️🌐",
    color: "#FF9900",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  },
  [SkillNames.AWS]: {
    id: 22,
    name: "aws",
    label: "Oracle Cloud",
    shortDescription: "OCI certified AI foundations, period 🏅☁️",
    color: "#F80000",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg",
  },
  [SkillNames.GCP]: {
    id: 23,
    name: "gcp",
    label: "Vercel",
    shortDescription: "deploying data apps live in seconds, sheesh 🚀🌿",
    color: "#000000",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
  },
  [SkillNames.VIM]: {
    id: 24,
    name: "vim",
    label: "Overleaf",
    shortDescription: "LaTeX papers looking crispy, publication-ready 📄✍️",
    color: "#47A141",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/latex/latex-original.svg",
  },
  [SkillNames.VERCEL]: {
    id: 25,
    name: "vercel",
    label: "Jupyter",
    shortDescription: "notebooks go brrrr, analysis never looked so clean 📓🔬",
    color: "#F37626",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original-wordmark.svg",
  },
};

export type Experience = {
  id: number;
  startDate: string;
  endDate: string;
  title: string;
  company: string;
  description: string[];
  skills: SkillNames[];
};

export const EXPERIENCE: Experience[] = [
  {
    id: 1,
    startDate: "Feb 2026",
    endDate: "Mar 2026",
    title: "Power BI Intern",
    company: "Microsoft Elevate (AICTE)",
    description: [
      "Built interactive dashboards tracking business metrics including revenue, profit, and regional sales.",
      "Developed 12+ DAX measures and automated ETL workflows for reporting.",
      "Enabled stakeholders in sales and finance to analyze performance and drive data-driven decisions.",
      "Supported continuous improvement through reporting automation and data validation.",
    ],
    skills: [
      SkillNames.GITHUB,   // Power BI
      SkillNames.TS,       // SQL
      SkillNames.JS,       // Python
      SkillNames.CSS,      // Pandas
    ],
  },
  {
    id: 2,
    startDate: "Oct 2025",
    endDate: "Nov 2025",
    title: "AI & Data Analytics Intern",
    company: "Edunet Foundation",
    description: [
      "Collected, cleaned, and validated 50K+ financial transaction records ensuring high data quality.",
      "Performed statistical analysis to identify trends, anomalies, and fraud patterns.",
      "Generated dashboards and reports to support strategic and operational decision-making.",
      "Communicated insights clearly to stakeholders and contributed to process improvement initiatives.",
    ],
    skills: [
      SkillNames.JS,      // Python
      SkillNames.TS,      // SQL
      SkillNames.CSS,     // Pandas
      SkillNames.REACT,   // NumPy
      SkillNames.VUE,     // Scikit-learn
      SkillNames.NEXTJS,  // MLflow
    ],
  },
];

export const themeDisclaimers = {
  light: [
    "Warning: Light mode emits a gazillion lumens of pure radiance!",
    "Caution: Light mode ahead! Please don't try this at home.",
    "Only trained professionals can handle this much brightness. Proceed with sunglasses!",
    "Brace yourself! Light mode is about to make everything shine brighter than your future.",
    "Flipping the switch to light mode... Are you sure your eyes are ready for this?",
  ],
  dark: [
    "Light mode? I thought you went insane... but welcome back to the dark side!",
    "Switching to dark mode... How was life on the bright side?",
    "Dark mode activated! Thanks you from the bottom of my heart, and my eyes too.",
    "Welcome back to the shadows. How was life out there in the light?",
    "Dark mode on! Finally, someone who understands true sophistication.",
  ],
};