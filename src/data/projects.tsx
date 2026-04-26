import SlideShow from "@/components/slide-show";
import { Button } from "@/components/ui/button";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import {
  SiPython, SiFastapi, SiStreamlit, SiDocker,
  SiPytorch, SiTensorflow, SiScikitlearn,
} from "react-icons/si";

const BASE_PATH = "/assets/projects-screenshots";

// ── Link buttons ──────────────────────────────────────────────────────────────
const ProjectsLinks = ({ live, repo }: { live?: string; repo?: string }) => (
  <div className="flex flex-col md:flex-row items-center justify-start gap-3 my-3 mb-8">
    {live && live !== repo && (
      <Link className="font-mono underline flex gap-2" rel="noopener" target="_new" href={live}>
        <Button variant="default" size="sm">
          Live Demo <ArrowUpRight className="ml-2 w-4 h-4" />
        </Button>
      </Link>
    )}
    {repo && (
      <Link className="font-mono underline flex gap-2" rel="noopener" target="_new" href={repo}>
        <Button variant="default" size="sm">
          GitHub <ArrowUpRight className="ml-2 w-4 h-4" />
        </Button>
      </Link>
    )}
  </div>
);

// ── Skill badge type ──────────────────────────────────────────────────────────
export type Skill = { title: string; bg: string; fg: string; icon: ReactNode };

const S = {
  python:     { title: "Python",       bg: "black", fg: "white", icon: <SiPython /> },
  fastapi:    { title: "FastAPI",      bg: "black", fg: "white", icon: <SiFastapi /> },
  streamlit:  { title: "Streamlit",    bg: "black", fg: "white", icon: <SiStreamlit /> },
  docker:     { title: "Docker",       bg: "black", fg: "white", icon: <SiDocker /> },
  pytorch:    { title: "PyTorch",      bg: "black", fg: "white", icon: <SiPytorch /> },
  tensorflow: { title: "TensorFlow",   bg: "black", fg: "white", icon: <SiTensorflow /> },
  sklearn:    { title: "Scikit-learn", bg: "black", fg: "white", icon: <SiScikitlearn /> },
  faiss:      { title: "FAISS",        bg: "black", fg: "white", icon: <span style={{fontWeight:700,fontSize:11}}>FAISS</span> },
  langchain:  { title: "LangChain",    bg: "black", fg: "white", icon: <span style={{fontWeight:700,fontSize:11}}>LC</span> },
  mlflow:     { title: "MLflow",       bg: "black", fg: "white", icon: <span style={{fontWeight:700,fontSize:11}}>MLf</span> },
  sql:        { title: "SQL",          bg: "black", fg: "white", icon: <span style={{fontWeight:700,fontSize:11}}>SQL</span> },
  pandas:     { title: "Pandas",       bg: "black", fg: "white", icon: <span style={{fontWeight:700,fontSize:11}}>pd</span> },
  numpy:      { title: "NumPy",        bg: "black", fg: "white", icon: <span style={{fontWeight:700,fontSize:11}}>np</span> },
  gradcam:    { title: "Grad-CAM",     bg: "black", fg: "white", icon: <span style={{fontWeight:700,fontSize:11}}>XAI</span> },
  powerbi:    { title: "Power BI",     bg: "black", fg: "white", icon: <span style={{fontWeight:700,fontSize:11}}>PBI</span> },
};

// ── Project type ──────────────────────────────────────────────────────────────
export type Project = {
  id: string;
  category: string;
  title: string;
  src: string;
  screenshots: string[];
  skills: { frontend: Skill[]; backend: Skill[] };
  content: React.ReactNode | any;
  github?: string;
  live?: string;
};

const projects: Project[] = [

  // ── 1. Pneumonia Detection CNN ─────────────────────────────────────────────
  {
    id: "pneumonia-detection",
    category: "Deep Learning / Medical AI",
    title: "Pneumonia Detection CNN + XAI",
    src: `${BASE_PATH}/pneumonia-detection/landing.png`,
    screenshots: ["landing.png"],
    skills: {
      frontend: [S.streamlit],
      backend:  [S.pytorch, S.tensorflow, S.gradcam, S.faiss, S.langchain, S.python],
    },
    live:   "https://pneumonia-detection-using-cnn.vercel.app",
    github: "https://github.com/sreenugopireddy/Pneumonia-detection-Using-CNN",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-xl text-center">
            Pneumonia Detection Using CNN + Explainable AI + PDF-RAG Assistant
          </TypographyP>
          <TypographyP className="font-mono">
            An end-to-end AI system that detects pneumonia from chest X-ray images
            using a CNN with transfer learning, provides visual explanations via
            Grad-CAM heatmaps, and generates evidence-grounded medical explanations
            through a PDF-RAG pipeline — a full Explainable Medical AI Assistant prototype.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />

          <TypographyH3 className="my-4 mt-8">CNN + Transfer Learning</TypographyH3>
          <p className="font-mono mb-2">
            MobileNetV2 fine-tuned on the Kaggle Chest X-Ray dataset (5,000+ images).
            Weighted CrossEntropy handles class imbalance. Achieved 92%+ validation
            accuracy with strong precision and recall on the held-out test set.
          </p>

          <TypographyH3 className="my-4 mt-8">Grad-CAM Explainability</TypographyH3>
          <p className="font-mono mb-2">
            Grad-CAM heatmaps overlay on the X-ray to show exactly which lung
            regions influenced the model's decision — providing a visual trust
            signal essential for medical imaging applications.
          </p>

          <TypographyH3 className="my-4 mt-8">PDF-Grounded RAG Chatbot</TypographyH3>
          <p className="font-mono mb-2">
            Instead of hallucinated AI text, explanations are retrieved from indexed
            medical PDFs (fact sheets, treatment references, antibiotic guidelines).
            Pipeline: PDF → chunks → embeddings → FAISS index → semantic search →
            evidence-grounded answer. Zero hallucination.
          </p>

          <TypographyH3 className="my-4 mt-8">Streamlit Dashboard</TypographyH3>
          <p className="font-mono mb-2">
            Upload a chest X-ray → instant prediction (Normal / Pneumonia) with
            confidence score, Grad-CAM overlay, risk indicator, medical explanation,
            and a sidebar RAG chatbot for follow-up questions.
          </p>

          <TypographyH3 className="my-4 mt-8">Tech Stack</TypographyH3>
          <p className="font-mono mb-2">
            PyTorch · TorchVision · MobileNetV2 · Grad-CAM · LangChain ·
            FAISS · Sentence-Transformers · Streamlit · Python
          </p>
        </div>
      );
    },
  },

  // ── 2. Healthcare RAG Assistant ────────────────────────────────────────────
  {
    id: "healthcare-rag",
    category: "AI / RAG System",
    title: "Healthcare RAG Assistant",
    src: `${BASE_PATH}/healthcare-rag/landing.png`,
    screenshots: ["landing.png"],
    skills: {
      frontend: [S.streamlit],
      backend:  [S.python, S.faiss, S.langchain, S.mlflow],
    },
    live:   "https://healthcare-document-rag-assistant-bszat4b6m3dbktycg7yvlc.streamlit.app/",
    github: "https://github.com/sreenugopireddy/Healthcare-Document-RAG-Assistant",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-xl text-center">
            Healthcare Document RAG Assistant — Modular RAG System
          </TypographyP>
          <TypographyP className="font-mono">
            A modular Retrieval-Augmented Generation system that processes
            unstructured healthcare documents — clinical notes, research papers,
            medical records — enabling intelligent Q&amp;A grounded in your own
            data. Published on ReadyTensor as a peer-reviewed technical publication.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />

          <TypographyH3 className="my-4 mt-8">Document Ingestion Pipeline</TypographyH3>
          <p className="font-mono mb-2">
            Scalable pipelines chunk and embed healthcare PDFs into a FAISS vector
            store for fast semantic retrieval. Handles noisy, unstructured clinical text.
          </p>

          <TypographyH3 className="my-4 mt-8">RAG-Powered Q&amp;A</TypographyH3>
          <p className="font-mono mb-2">
            LangChain + FAISS retrieves the most relevant document chunks before
            generating accurate, grounded answers — no hallucinations.
          </p>

          <TypographyH3 className="my-4 mt-8">MLflow Experiment Tracking</TypographyH3>
          <p className="font-mono mb-2">
            Full experiment tracking across embedding strategies, retrieval
            configurations, and model versions — reproducible, documented workflows.
          </p>

          <TypographyH3 className="my-4 mt-8">Publication</TypographyH3>
          <p className="font-mono mb-2">
            Peer-reviewed on ReadyTensor:{" "}
            <a
              className="underline text-blue-400"
              href="https://app.readytensor.ai/publications/healthcare-document-rag-assitant-0EKLQ6QTqtCS"
              target="_blank" rel="noopener"
            >
              Healthcare Document RAG Assistant: A Modular RAG System
            </a>
          </p>
        </div>
      );
    },
  },

  // ── 3. Financial Anomaly Detection ────────────────────────────────────────
  {
    id: "anomaly-detection",
    category: "Data Engineering / ML",
    title: "Financial Anomaly Detection",
    src: `${BASE_PATH}/anomaly-detection/landing.png`,
    screenshots: ["landing.png"],
    skills: {
      frontend: [S.streamlit],
      backend:  [S.python, S.fastapi, S.sql, S.pandas, S.sklearn, S.docker],
    },
    live:   "https://github.com/sreenugopireddy/Anamoly_detection",
    github: "https://github.com/sreenugopireddy/Anamoly_detection",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-xl text-center">
            Financial Transaction Analysis &amp; Anomaly Detection System
          </TypographyP>
          <TypographyP className="font-mono">
            End-to-end data pipeline for detecting anomalies, fraud patterns,
            and risk signals in 50K+ financial transactions — ETL, statistical
            ML models, A/B testing, and a real-time risk monitoring dashboard.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />

          <TypographyH3 className="my-4 mt-8">ETL Pipeline</TypographyH3>
          <p className="font-mono mb-2">
            Robust ingestion, cleaning, and validation across 50K+ rows —
            schema enforcement, deduplication, and null-value strategies.
          </p>

          <TypographyH3 className="my-4 mt-8">Anomaly &amp; Fraud Detection</TypographyH3>
          <p className="font-mono mb-2">
            Isolation Forest + z-score analysis surfaces anomalous transactions,
            tracks fraud patterns, and generates real-time risk alerts.
          </p>

          <TypographyH3 className="my-4 mt-8">A/B Testing &amp; Evaluation</TypographyH3>
          <p className="font-mono mb-2">
            Compared detection models by precision, recall, and false positive
            rates across threshold configurations using rigorous A/B testing.
          </p>

          <TypographyH3 className="my-4 mt-8">Risk Dashboard</TypographyH3>
          <p className="font-mono mb-2">
            Real-time monitoring dashboard with anomaly alerts, risk metrics,
            cohort analysis, and transaction health scores.
          </p>
        </div>
      );
    },
  },

  // ── 4. Smart Grid Energy Forecasting ─────────────────────────────────────
  {
    id: "smartgrid-forecasting",
    category: "ML / Time-Series Forecasting",
    title: "Smart Grid Energy Forecasting",
    src: `${BASE_PATH}/smartgrid-forecasting/landing.png`,
    screenshots: ["landing.png"],
    skills: {
      frontend: [S.streamlit],
      backend:  [S.python, S.sklearn, S.pandas, S.numpy, S.mlflow],
    },
    github: "https://github.com/sreenugopireddy",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-xl text-center">
            Smart Grid Energy Demand Forecasting System
          </TypographyP>
          <TypographyP className="font-mono">
            A machine learning pipeline that forecasts electricity demand for
            smart grid systems — enabling better load balancing, reduced waste,
            and proactive capacity planning for energy providers.
          </TypographyP>
          <ProjectsLinks repo={this.github} />

          <TypographyH3 className="my-4 mt-8">Time-Series Forecasting</TypographyH3>
          <p className="font-mono mb-2">
            Random Forest + XGBoost trained on historical consumption data with
            weather and time-of-day features to forecast hourly and daily demand.
          </p>

          <TypographyH3 className="my-4 mt-8">Feature Engineering</TypographyH3>
          <p className="font-mono mb-2">
            Lag features, rolling averages, and seasonal indicators capture
            demand cycles — significantly improving accuracy over baseline models.
          </p>

          <TypographyH3 className="my-4 mt-8">Demand Dashboard</TypographyH3>
          <p className="font-mono mb-2">
            Interactive Streamlit dashboard shows actual vs. predicted demand,
            confidence intervals, and anomaly flags for grid operators in real time.
          </p>
        </div>
      );
    },
  },

  // ── 5. AI Data Analyst ────────────────────────────────────────────────────
  {
    id: "ai-data-analyst",
    category: "AI Agent / NLP",
    title: "AI Data Analyst Agent",
    src: `${BASE_PATH}/ai-data-analyst/landing.png`,
    screenshots: ["landing.png"],
    skills: {
      frontend: [S.streamlit],
      backend:  [S.python, S.langchain, S.pandas, S.fastapi, S.sql],
    },
    github: "https://github.com/sreenugopireddy",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-xl text-center">
            Conversational AI Agent for Data Analysis
          </TypographyP>
          <TypographyP className="font-mono">
            An LLM-powered data analyst that lets you upload a CSV or connect a
            database and ask questions in plain English — it writes the SQL/pandas
            code, executes it, and explains the results back to you. No SQL
            knowledge required.
          </TypographyP>
          <ProjectsLinks repo={this.github} />

          <TypographyH3 className="my-4 mt-8">Natural Language → Code</TypographyH3>
          <p className="font-mono mb-2">
            Ask "What are the top 5 products by revenue last quarter?" — the agent
            generates the query, runs it, and returns a chart plus a plain-English
            explanation.
          </p>

          <TypographyH3 className="my-4 mt-8">Auto Visualization</TypographyH3>
          <p className="font-mono mb-2">
            Automatically selects the best chart type (bar, line, scatter, pie)
            for the query result and renders it interactively in Streamlit.
          </p>

          <TypographyH3 className="my-4 mt-8">Multi-source Support</TypographyH3>
          <p className="font-mono mb-2">
            Works with CSV uploads, SQLite databases, and PostgreSQL connections —
            flexible for analysts and non-technical stakeholders alike.
          </p>
        </div>
      );
    },
  },

  // ── 6. Power BI Sales Dashboard ───────────────────────────────────────────
  {
    id: "powerbi-dashboard",
    category: "BI / Analytics",
    title: "Power BI Sales Dashboard",
    src: `${BASE_PATH}/powerbi-dashboard/landing.png`,
    screenshots: ["landing.png"],
    skills: {
      frontend: [S.powerbi],
      backend:  [S.sql, S.pandas, S.python],
    },
    github: "https://github.com/sreenugopireddy",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-xl text-center">
            Enterprise Sales &amp; Revenue Analytics — Power BI
          </TypographyP>
          <TypographyP className="font-mono">
            An interactive Power BI dashboard built during the Microsoft Elevate
            internship, tracking revenue, profit, regional performance, and KPIs
            — enabling sales and finance teams to make faster data-driven decisions.
          </TypographyP>
          <ProjectsLinks repo={this.github} />

          <TypographyH3 className="my-4 mt-8">12+ DAX Measures</TypographyH3>
          <p className="font-mono mb-2">
            Custom DAX formulas for YoY growth, running totals, profit margins,
            and dynamic ranking — flexible self-serve analytics without waiting
            on reports. Reduced manual prep time by 80%.
          </p>

          <TypographyH3 className="my-4 mt-8">Automated ETL</TypographyH3>
          <p className="font-mono mb-2">
            Power Query workflows automate ingestion and transformation from
            multiple source systems, keeping dashboards always up to date.
          </p>

          <TypographyH3 className="my-4 mt-8">Regional Drill-down</TypographyH3>
          <p className="font-mono mb-2">
            Slicers and drill-throughs let stakeholders explore performance by
            region, product category, and time period — all in real time.
          </p>
        </div>
      );
    },
  },

];

export default projects;