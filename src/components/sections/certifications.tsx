"use client";

import { motion } from "motion/react";
import { useRef } from "react";
import { useInView } from "motion/react";
import {
  Award, Cloud, BarChart2, Database,
  FileSpreadsheet, ExternalLink, Brain, ShieldCheck,
} from "lucide-react";
import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";
import { cn } from "@/lib/utils";

type Cert = {
  title: string;
  issuer: string;
  icon: React.ElementType;
  color: string;
  link: string;
};

const CERTIFICATIONS: Cert[] = [
  {
    title: "AWS Solutions Architecture",
    issuer: "Forage",
    icon: Cloud,
    color: "#FF9900",
    link: "https://drive.google.com/file/d/1e2JRS1VVhj5Co9ORgC2TyxUviaXljZJc/view?usp=sharing",
  },
  {
    title: "RAG System Expert",
    issuer: "Ready Tensor",
    icon: Brain,
    color: "#6C3483",
    link: "https://drive.google.com/file/d/1uGNfucIQZP6nqoOFYtLY1c8R59-1AyfV/view?usp=drive_link",
  },
  {
    title: "Data Visualization",
    issuer: "Tata",
    icon: BarChart2,
    color: "#00B0F0",
    link: "https://drive.google.com/file/d/1V3MrdomO-mYq0IqzdUD9ym2Dt3uKMGqx/view?usp=sharing",
  },
  {
    title: "Zscaler Cyber Trust Associate",
    issuer: "Zscaler Academy",
    icon: ShieldCheck,
    color: "#00A3E0",
    link: "https://drive.google.com/file/d/185c3uGkQuutnEGbDU379p6WMlRIdYl6f/view?usp=sharing",
  },
  {
    title: "Oracle AI Foundations Associate",
    issuer: "Oracle University",
    icon: FileSpreadsheet,
    color: "#F80000",
    link: "https://drive.google.com/file/d/19WCTBgtK15UTkUcFOVmXcCbMHKCbbpCn/view?usp=sharing",
  },
  {
    title: "SQL for Data Science",
    issuer: "UC Davis",
    icon: Database,
    color: "#007DB8",
    link: "https://drive.google.com/file/d/1A8kwTT6N_d2jsrfvpShlDQ5bKKEkKC6b/view?usp=sharing",
  },
  {
    title: "ETL in Power BI",
    issuer: "Microsoft (Coursera)",
    icon: Database,
    color: "#F2C811",
    link: "https://drive.google.com/file/d/1S-LntOyxZsCb1KdU_ZF-nltyUAn0IwtP/view?usp=sharing",
  },
  {
    title: "Harnessing Power of Data",
    issuer: "Microsoft (Coursera)",
    icon: BarChart2,
    color: "#0078D4",
    link: "https://drive.google.com/file/d/1M8dep_W2fT8pmPH2nMXBfL_LbGJ43XR5/view?usp=sharing",
  },
];

function CertCard({ cert, index }: { cert: Cert; index: number }) {
  const Icon = cert.icon;

  return (
    <motion.a
      href={cert.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: "easeOut" }}
      whileHover={{ y: -6, transition: { type: "spring", stiffness: 400, damping: 20 } }}
      className={cn(
        "group relative flex flex-col items-center text-center",
        "rounded-2xl p-5 cursor-pointer",
        "border border-white/10 bg-white/5 backdrop-blur-sm",
        "hover:border-white/25 transition-colors duration-300"
      )}
      style={{
        // subtle glow uses cert color on hover — done via CSS custom prop
        ["--cert-color" as string]: cert.color,
      }}
    >
      {/* Hover glow backdrop */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"
        style={{ background: cert.color, opacity: 0 }}
      />

      {/* Icon box */}
      <motion.div
        whileHover={{ scale: 1.12, rotate: 4 }}
        transition={{ type: "spring", stiffness: 350, damping: 18 }}
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 flex-shrink-0"
        style={{
          background: `${cert.color}22`,
          border: `1px solid ${cert.color}44`,
          boxShadow: `0 0 0 0 ${cert.color}00`,
        }}
      >
        <Icon
          className="w-6 h-6 transition-colors duration-200"
          style={{ color: cert.color }}
        />
      </motion.div>

      {/* Text */}
      <h3 className="text-sm font-semibold text-white/90 mb-1 leading-snug line-clamp-2 group-hover:text-white transition-colors">
        {cert.title}
      </h3>
      <p className="text-xs text-white/40 mb-3 group-hover:text-white/60 transition-colors">
        {cert.issuer}
      </p>

      {/* View badge — appears on hover */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0">
        <span className="text-xs font-medium" style={{ color: cert.color }}>
          View
        </span>
        <ExternalLink className="w-3 h-3" style={{ color: cert.color }} />
      </div>

      {/* Bottom color accent line */}
      <div
        className="absolute bottom-0 left-4 right-4 h-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${cert.color}, transparent)` }}
      />
    </motion.a>
  );
}

const CertificationsSection = () => {
  return (
    <SectionWrapper
      id="certifications"
      className="w-full min-h-[60vh] flex flex-col justify-center py-24 pointer-events-auto"
    >
      <div className="w-full max-w-6xl mx-auto px-4 md:px-8">
        {/* Section header matching portfolio style */}
        <SectionHeader
          id="certifications"
          title={
            <span>
              Achievements &{" "}
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Certifications
              </span>
            </span>
          }
          desc="Verified credentials from industry-leading organizations"
          className="mb-16"
        />

        {/* Cert grid — 2 cols mobile → 4 cols tablet → 4 cols desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {CERTIFICATIONS.map((cert, i) => (
            <CertCard key={cert.title} cert={cert} index={i} />
          ))}
        </div>

        {/* Count badge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="flex justify-center mt-10"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5">
            <Award className="w-4 h-4 text-amber-400" />
            <span className="text-sm text-white/60">
              <span className="text-white font-semibold">{CERTIFICATIONS.length}</span> certifications earned
            </span>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default CertificationsSection;