"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { File } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { usePreloader } from "../preloader";
import { BlurIn, BoxReveal } from "../reveal-animations";
import ScrollDownIcon from "../scroll-down-icon";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { config } from "@/data/config";
import SectionWrapper from "../ui/section-wrapper";
import { motion } from "motion/react";

// Inline skill tags shown in the hero
const HERO_SKILLS = ["Python", "SQL", "Machine Learning", "LLMs", "Azure", "Power BI"];

// Starfield — 80 twinkling dots
const STARS = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 0.5,
  delay: Math.random() * 4,
  duration: Math.random() * 3 + 2,
}));

const HeroSection = () => {
  const { isLoading } = usePreloader();
  // Prevent SSR mismatch for random star positions
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <SectionWrapper id="hero" className={cn("relative w-full h-screen overflow-hidden")}>

      {/* ── Starfield ── */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none z-0">
          {STARS.map((star) => (
            <motion.div
              key={star.id}
              className="absolute rounded-full bg-white/70 dark:bg-white/80"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: star.size,
                height: star.size,
              }}
              animate={{ opacity: [0.1, 0.8, 0.1] }}
              transition={{
                duration: star.duration,
                delay: star.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      {/* ── Main content — centered full width ── */}
      {!isLoading && (
        <div
          className={cn(
            "relative z-10 h-screen",
            "flex flex-col justify-center items-center text-center",
            "px-6 md:px-16"
          )}
        >
          {/* Open to work badge */}
          <BlurIn delay={0.5}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-green-500/40 bg-green-500/10 text-green-400 text-sm font-medium tracking-wide">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              OPEN TO WORK
            </span>
          </BlurIn>

          {/* Name */}
          <BlurIn delay={0.8}>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <h1
                  className={cn(
                    "leading-none font-thin text-transparent cursor-default",
                    "text-edge-outline font-display",
                    "text-6xl sm:text-7xl md:text-8xl lg:text-9xl"
                  )}
                >
                  {config.author.split(" ").slice(0, 2).join(" ")}
                </h1>
              </TooltipTrigger>
              <TooltipContent side="top" className="dark:bg-white dark:text-black">
                Data speaks louder than words 📊
              </TooltipContent>
            </Tooltip>
          </BlurIn>

          {/* Role subtitle */}
          <BlurIn delay={1.1}>
            <p className="mt-4 font-thin text-slate-500 dark:text-zinc-400 text-base sm:text-lg md:text-xl tracking-widest uppercase">
              Data Scientist · AI &amp; ML Engineer · Data Analyst
            </p>
          </BlurIn>

          {/* Inline skill tags */}
          <BlurIn delay={1.3}>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {HERO_SKILLS.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4 + i * 0.07, duration: 0.3 }}
                  className={cn(
                    "px-3 py-1 rounded-full text-sm font-medium cursor-default",
                    "border border-slate-300/40 dark:border-white/10",
                    "bg-slate-100/60 dark:bg-white/5",
                    "text-slate-600 dark:text-zinc-300",
                    "hover:border-blue-400/50 hover:text-blue-500 dark:hover:border-blue-400/50 dark:hover:text-blue-300",
                    "transition-colors duration-200"
                  )}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </BlurIn>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-3">
            <Link
              href="https://drive.google.com/file/d/1PG30cgvGtIeKgfWdiw58QMzx9G_GgLeO/view?usp=sharing"
              target="_blank"
            >
              <BoxReveal delay={1.8} width="100%">
                <Button className="flex items-center gap-2 px-6">
                  <File size={18} />
                  Resume
                </Button>
              </BoxReveal>
            </Link>

            <BoxReveal delay={1.9} width="100%">
              <div className="flex items-center gap-2">
                <Tooltip delayDuration={300}>
                  <TooltipTrigger asChild>
                    <Link href="#contact">
                      <Button variant="outline" className="px-6">
                        Hire Me
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    Let&apos;s build something great 🚀
                  </TooltipContent>
                </Tooltip>

                <Link href={config.social.github} target="_blank" className="cursor-can-hover">
                  <Button variant="outline" size="icon">
                    <SiGithub size={20} />
                  </Button>
                </Link>
                <Link href={config.social.linkedin} target="_blank" className="cursor-can-hover">
                  <Button variant="outline" size="icon">
                    <SiLinkedin size={20} />
                  </Button>
                </Link>
              </div>
            </BoxReveal>
          </div>
        </div>
      )}

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <ScrollDownIcon />
      </div>
    </SectionWrapper>
  );
};

export default HeroSection;
