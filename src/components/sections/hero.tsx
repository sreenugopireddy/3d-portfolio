"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { File } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePreloader } from "../preloader";
import { BlurIn, BoxReveal } from "../reveal-animations";
import ScrollDownIcon from "../scroll-down-icon";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { config } from "@/data/config";
import SectionWrapper from "../ui/section-wrapper";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

// Roles for the typewriter animation
const ROLES = [
  "Data Scientist",
  "AI & ML Engineer",
  "Data Analyst",
  "LLM Developer",
];

// Inline skill tags
const HERO_SKILLS = ["Python", "SQL", "Machine Learning", "LLMs", "Azure", "Power BI"];

const TypewriterRole = () => {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[index];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setIndex((i) => (i + 1) % ROLES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, index]);

  return (
    <span className="inline-flex items-center">
      <span className="text-white">{displayed}</span>
      <span className="ml-0.5 w-[3px] h-[1em] bg-white inline-block animate-pulse" />
    </span>
  );
};

const HeroSection = () => {
  const { isLoading } = usePreloader();

  return (
    <SectionWrapper id="hero" className={cn("relative w-full h-screen overflow-hidden")}>
      {!isLoading && (
        <div className="relative z-10 h-screen grid md:grid-cols-2">

          {/* ── LEFT: Accent panel ── */}
          <div
            className={cn(
              "relative flex flex-col justify-center",
              "px-8 sm:px-12 md:px-16 lg:px-20",
              "pt-24 pb-16 md:pt-0 md:pb-0",
              // Dark mode: deep navy-blue; Light mode: vivid indigo-blue (your palette)
              "bg-[#0f172a] dark:bg-[#0f172a]",
              "col-span-1"
            )}
          >
            {/* Subtle grid texture overlay */}
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            {/* Glow blob */}
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-cyan-400/10 rounded-full blur-[60px] pointer-events-none" />

            <div className="relative z-10 flex flex-col gap-3">

              {/* Open to work badge */}
              <BlurIn delay={0.4}>
                <span className="inline-flex items-center gap-2 w-fit px-3 py-1 rounded-full border border-green-400/40 bg-green-400/10 text-green-400 text-xs font-semibold tracking-widest uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Open to Work
                </span>
              </BlurIn>

              {/* Hi I'm */}
              <BlurIn delay={0.6}>
                <p className="text-zinc-400 text-base sm:text-lg font-light tracking-wide">
                  Hi, I&apos;m
                </p>
              </BlurIn>

              {/* Name */}
              <BlurIn delay={0.8}>
                <Tooltip delayDuration={300}>
                  <TooltipTrigger asChild>
                    <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold text-white leading-tight cursor-default">
                      {config.author.split(" ").slice(0, 2).join(" ")}
                    </h1>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="bg-white text-black">
                    Data speaks louder than words 📊
                  </TooltipContent>
                </Tooltip>
              </BlurIn>

              {/* Typewriter role */}
              <BlurIn delay={1.0}>
                <div className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-semibold text-blue-400 min-h-[1.5em]">
                  <TypewriterRole />
                </div>
              </BlurIn>

              {/* Skill tags */}
              <BlurIn delay={1.2}>
                <div className="flex flex-wrap gap-2 mt-1">
                  {HERO_SKILLS.map((skill, i) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.3 + i * 0.07, duration: 0.3 }}
                      className="px-2.5 py-1 rounded-full text-xs font-medium border border-white/10 bg-white/5 text-zinc-300 hover:border-blue-400/50 hover:text-blue-300 transition-colors cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </BlurIn>

              {/* Bio */}
              <BlurIn delay={1.4}>
                <p className="text-sm text-zinc-400 max-w-sm leading-relaxed mt-1">
                  I build intelligent systems, uncover insights from data, and create ML-driven solutions that solve real problems.
                </p>
              </BlurIn>

              {/* CTAs */}
              <div className="flex flex-col gap-2 mt-4 w-fit">
                <Link
                  href="https://drive.google.com/file/d/1PG30cgvGtIeKgfWdiw58QMzx9G_GgLeO/view?usp=sharing"
                  target="_blank"
                >
                  <BoxReveal delay={1.8} width="100%">
                    <Button className="flex items-center gap-2 w-full bg-blue-500 hover:bg-blue-600 text-white border-0">
                      <File size={16} />
                      Resume
                    </Button>
                  </BoxReveal>
                </Link>

                <BoxReveal delay={1.9} width="100%">
                  <div className="flex items-center gap-2">
                    <Tooltip delayDuration={300}>
                      <TooltipTrigger asChild>
                        <Link href="#contact">
                          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:text-white">
                            Hire Me
                          </Button>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        Let&apos;s build something great 🚀
                      </TooltipContent>
                    </Tooltip>

                    <Link href={config.social.github} target="_blank" className="cursor-can-hover">
                      <Button variant="outline" size="icon" className="border-white/20 text-white hover:bg-white/10 hover:text-white">
                        <SiGithub size={18} />
                      </Button>
                    </Link>
                    <Link href={config.social.linkedin} target="_blank" className="cursor-can-hover">
                      <Button variant="outline" size="icon" className="border-white/20 text-white hover:bg-white/10 hover:text-white">
                        <SiLinkedin size={18} />
                      </Button>
                    </Link>
                  </div>
                </BoxReveal>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Photo panel ── */}
          <div
            className={cn(
              "hidden md:flex items-end justify-center relative overflow-hidden",
              "bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400",
              "col-span-1"
            )}
          >
            {/* Decorative circles */}
            <div className="absolute top-10 right-10 w-32 h-32 rounded-full border border-white/20" />
            <div className="absolute top-6 right-6 w-48 h-48 rounded-full border border-white/10" />
            <div className="absolute bottom-20 left-10 w-20 h-20 rounded-full bg-white/10" />

            {/* Photo — bottom-anchored so it feels grounded like Leeshark */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.8, ease: "easeOut" }}
              className="relative w-full h-full flex items-end justify-center"
            >
              <Image
                src="/assets/mine.png"
                alt={config.author}
                width={500}
                height={620}
                className="object-cover object-top w-auto h-[85%] max-h-[calc(100vh-4rem)] drop-shadow-2xl select-none"
                priority
              />
            </motion.div>

            {/* Gradient fade at bottom so photo blends */}
            <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-blue-600/60 to-transparent pointer-events-none" />
          </div>
        </div>
      )}

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <ScrollDownIcon />
      </div>
    </SectionWrapper>
  );
};

export default HeroSection;
