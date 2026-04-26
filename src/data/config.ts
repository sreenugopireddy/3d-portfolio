const config = {
  title: "Sreenivasa Reddy | Data Analyst & AI Engineer",
  description: {
    long: "Explore the portfolio of Sreenivasa Reddy Gopireddy, a Data Analyst and AI & Analytics Engineer specializing in Python, SQL, Power BI, ETL pipelines, and machine learning. Discover projects including a Healthcare RAG System, Financial Anomaly Detection, and more. Let's turn data into decisions together!",
    short:
      "Portfolio of Sreenivasa Reddy Gopireddy — Data Analyst & AI Engineer skilled in Python, SQL, Power BI, and building scalable data workflows.",
  },
  keywords: [
    "Sreenivasa Reddy",
    "Sreenu Gopireddy",
    "Data Analyst",
    "AI Engineer",
    "Analytics Engineer",
    "Python",
    "SQL",
    "Power BI",
    "Machine Learning",
    "ETL Pipelines",
    "Data Science",
    "RAG System",
    "Anomaly Detection",
    "LangChain",
    "FAISS",
    "Streamlit",
    "portfolio",
  ],
  author: "Sreenivasa Reddy Gopireddy",
  email: "sreenugopireddy24@gmail.com",
  site: "https://sreenu-gopireddy.vercel.app",

  // for github stars button
  githubUsername: "sreenugopireddy",
  githubRepo: "3d-portfolio",

  get ogImg() {
    return this.site + "/assets/seo/og-image.png";
  },
  social: {
    twitter: "https://x.com/",
    linkedin: "https://www.linkedin.com/in/sreenu-gopireddy/",
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
    github: "https://github.com/sreenugopireddy",
  },
};
export { config };

export enum SkillNames {
  PYTHON = "python",
  SQL = "sql",
  R = "r",
  POWERBI = "powerbi",
  PLOTLY = "plotly",
  CHARTJS = "chartjs",
  STREAMLIT = "streamlit",
  FASTAPI = "fastapi",
  LANGCHAIN = "langchain",
  FAISS = "faiss",
  MLFLOW = "mlflow",
  SQLITE = "sqlite",
  SQLALCHEMY = "sqlalchemy",
  GIT = "git",
  GITHUB = "github",
  DOCKER = "docker",
  AWS = "aws",
  ORACLE = "oracle",
  LINUX = "linux",
  PANDAS = "pandas",
  NUMPY = "numpy",
  SKLEARN = "sklearn",
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
  [SkillNames.PYTHON]: {
    id: 1,
    name: "python",
    label: "Python",
    shortDescription: "the glue of data science, deadass indispensable 🐍🔥",
    color: "#3776AB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  [SkillNames.SQL]: {
    id: 2,
    name: "sql",
    label: "SQL",
    shortDescription: "SELECT * FROM skills WHERE value = 'high' 💅🗄️",
    color: "#F29111",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  },
  [SkillNames.R]: {
    id: 3,
    name: "r",
    label: "R",
    shortDescription: "stats never looked this good, periodt 📊✨",
    color: "#276DC3",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg",
  },
  [SkillNames.POWERBI]: {
    id: 4,
    name: "powerbi",
    label: "Power BI",
    shortDescription: "turning raw data into boardroom bangers 📈💼",
    color: "#F2C811",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuredevops/azuredevops-original.svg",
  },
  [SkillNames.PLOTLY]: {
    id: 5,
    name: "plotly",
    label: "Plotly",
    shortDescription: "interactive charts hitting different fr fr 📉🎨",
    color: "#3F4F75",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  [SkillNames.CHARTJS]: {
    id: 6,
    name: "chartjs",
    label: "Chart.js",
    shortDescription: "canvas-based charts, no cap 🖼️📊",
    color: "#FF6384",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  [SkillNames.STREAMLIT]: {
    id: 7,
    name: "streamlit",
    label: "Streamlit",
    shortDescription: "data apps at lightspeed, sheesh 🚀🎈",
    color: "#FF4B4B",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  [SkillNames.FASTAPI]: {
    id: 8,
    name: "fastapi",
    label: "FastAPI",
    shortDescription: "async APIs go brrr, no cap! ⚡🔌",
    color: "#009688",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
  },
  [SkillNames.LANGCHAIN]: {
    id: 9,
    name: "langchain",
    label: "LangChain",
    shortDescription: "chaining LLMs like a data wizard 🧙‍♂️🔗",
    color: "#1C3C3C",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  [SkillNames.FAISS]: {
    id: 10,
    name: "faiss",
    label: "FAISS",
    shortDescription: "vector search hitting different, fr 🔍⚡",
    color: "#0066CC",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  [SkillNames.MLFLOW]: {
    id: 11,
    name: "mlflow",
    label: "MLflow",
    shortDescription: "tracking experiments like a pro scientist 🧪📋",
    color: "#0194E2",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  [SkillNames.SQLITE]: {
    id: 12,
    name: "sqlite",
    label: "SQLite",
    shortDescription: "lightweight but hits heavy fr 🦾🗃️",
    color: "#003B57",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg",
  },
  [SkillNames.SQLALCHEMY]: {
    id: 13,
    name: "sqlalchemy",
    label: "SQLAlchemy",
    shortDescription: "ORM sorcery making queries feel clean ✨🧬",
    color: "#D71F00",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  [SkillNames.GIT]: {
    id: 14,
    name: "git",
    label: "Git",
    shortDescription: "the code's personal bodyguard, no cap! 🕵️‍♂️🔄",
    color: "#F1502F",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  [SkillNames.GITHUB]: {
    id: 15,
    name: "github",
    label: "GitHub",
    shortDescription: "sliding into those pull requests, IYKYK! 🐙",
    color: "#000000",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },
  [SkillNames.DOCKER]: {
    id: 16,
    name: "docker",
    label: "Docker",
    shortDescription: "containers go zoom zoom, sheesh 🐳🔥",
    color: "#2496ED",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  [SkillNames.AWS]: {
    id: 17,
    name: "aws",
    label: "AWS",
    shortDescription: "ML in the cloud — certified and ready 🌐☁️",
    color: "#FF9900",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  },
  [SkillNames.ORACLE]: {
    id: 18,
    name: "oracle",
    label: "Oracle Cloud",
    shortDescription: "OCI certified AI foundations, period 🏅☁️",
    color: "#F80000",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg",
  },
  [SkillNames.LINUX]: {
    id: 19,
    name: "linux",
    label: "Linux",
    shortDescription: "terminal life chose me, fr fr 🐧💻",
    color: "#FCC624",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
  },
  [SkillNames.PANDAS]: {
    id: 20,
    name: "pandas",
    label: "Pandas",
    shortDescription: "DataFrames hitting different every time 🐼📊",
    color: "#150458",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
  },
  [SkillNames.NUMPY]: {
    id: 21,
    name: "numpy",
    label: "NumPy",
    shortDescription: "arrays and math going crazy, no cap 🔢⚡",
    color: "#013243",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
  },
  [SkillNames.SKLEARN]: {
    id: 22,
    name: "sklearn",
    label: "Scikit-learn",
    shortDescription: "ML pipelines bussin' fr fr 🤖🔬",
    color: "#F7931E",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg",
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
      SkillNames.POWERBI,
      SkillNames.SQL,
      SkillNames.PYTHON,
      SkillNames.PANDAS,
    ],
  },
  {
    id: 2,
    startDate: "Oct 2025",
    endDate: "Nov 2025",
    title: "AI & Data Analytics Intern",
    company: "Edunet Foundation",
    description: [
      "Collected, cleaned, and validated 50K+ financial transaction records ensuring high data quality and consistency.",
      "Performed analytical and statistical analysis to identify trends, anomalies, and fraud patterns.",
      "Generated dashboards and reports to support strategic and operational decision-making.",
      "Communicated insights clearly to stakeholders and contributed to process improvement initiatives.",
    ],
    skills: [
      SkillNames.PYTHON,
      SkillNames.SQL,
      SkillNames.PANDAS,
      SkillNames.NUMPY,
      SkillNames.SKLEARN,
      SkillNames.MLFLOW,
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