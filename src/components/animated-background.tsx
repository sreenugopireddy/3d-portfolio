"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ThreeKeyboard, { MockApplication as Application, ProxyObject as SPEObject } from "./three-keyboard";
import { Skill, SkillNames, SKILLS } from "@/data/constants";
import { sleep } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { usePreloader } from "./preloader";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { Section, getKeyboardState } from "./animated-background-config";
import { useSounds } from "./realtime/hooks/use-sounds";

gsap.registerPlugin(ScrollTrigger);

// Skill info overlay — shown on hover/keydown
function SkillOverlay({ skill }: { skill: Skill | null }) {
  return (
    <div
      className="pointer-events-none fixed bottom-8 left-1/2 z-50 transition-all duration-300"
      style={{
        transform: `translateX(-50%) translateY(${skill ? "0px" : "16px"})`,
        opacity: skill ? 1 : 0,
      }}
    >
      {skill && (
        <div className="flex items-center gap-3 bg-background/90 backdrop-blur-md border border-border rounded-2xl px-5 py-3 shadow-xl">
          <img src={skill.icon} alt={skill.label} className="w-8 h-8 object-contain flex-shrink-0" />
          <div>
            <p className="font-semibold text-sm text-foreground">{skill.label}</p>
            <p className="text-xs text-muted-foreground mt-0.5 max-w-[220px] line-clamp-2">
              {skill.shortDescription}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

const AnimatedBackground = () => {
  const { isLoading, bypassLoading } = usePreloader();
  const { theme } = useTheme();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const splineContainer = useRef<HTMLDivElement>(null);
  const [splineApp, setSplineApp] = useState<Application>();
  const selectedSkillRef = useRef<Skill | null>(null);

  const { playPressSound, playReleaseSound } = useSounds();

  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [activeSection, setActiveSection] = useState<Section>("hero");

  const bongoAnimationRef = useRef<{ start: () => void; stop: () => void }>(null);
  const keycapAnimationsRef = useRef<{ start: () => void; stop: () => void }>(null);

  const [keyboardRevealed, setKeyboardRevealed] = useState(false);
  const router = useRouter();
  const isDark = theme === "dark";

  // --- Event Handlers ---

  const handleMouseHover = (e: { target: { name: string } }) => {
    if (!splineApp || selectedSkillRef.current?.name === e.target.name) return;

    if (e.target.name === "body" || e.target.name === "platform") {
      if (selectedSkillRef.current) playReleaseSound();
      setSelectedSkill(null);
      selectedSkillRef.current = null;
    } else {
      if (!selectedSkillRef.current || selectedSkillRef.current.name !== e.target.name) {
        const skill = SKILLS[e.target.name as SkillNames];
        if (skill) {
          if (selectedSkillRef.current) playReleaseSound();
          playPressSound();
          setSelectedSkill(skill);
          selectedSkillRef.current = skill;
        }
      }
    }
  };

  const handleSplineInteractions = () => {
    if (!splineApp) return;

    const isInputFocused = () => {
      const activeElement = document.activeElement;
      return (
        activeElement &&
        (activeElement.tagName === "INPUT" ||
          activeElement.tagName === "TEXTAREA" ||
          (activeElement as HTMLElement).isContentEditable)
      );
    };

    splineApp.addEventListener("keyUp", () => {
      if (isInputFocused()) return;
      playReleaseSound();
    });
    splineApp.addEventListener("keyDown", (e: { target: { name: string } }) => {
      if (isInputFocused()) return;
      const skill = SKILLS[e.target.name as SkillNames];
      if (skill) {
        playPressSound();
        setSelectedSkill(skill);
        selectedSkillRef.current = skill;
      }
    });
    splineApp.addEventListener("mouseHover", handleMouseHover);
  };

  // --- Animation Setup ---

  const createSectionTimeline = (
    triggerId: string,
    targetSection: Section,
    prevSection: Section,
    start: string = "top 50%",
    end: string = "bottom bottom"
  ) => {
    if (!splineApp) return;
    const kbd = splineApp.findObjectByName("keyboard");
    if (!kbd) return;

    gsap.timeline({
      scrollTrigger: {
        trigger: triggerId,
        start,
        end,
        scrub: true,
        onEnter: () => {
          setActiveSection(targetSection);
          const state = getKeyboardState({ section: targetSection, isMobile });
          // Reveal keyboard the first time user leaves the hero section
          if (prevSection === "hero") {
            kbd.visible = true;
            setKeyboardRevealed(true);
          }
          gsap.to(kbd.position, { ...state.position, duration: 1 });
          gsap.to(kbd.rotation, { ...state.rotation, duration: 1 });
        },
        onLeaveBack: () => {
          setActiveSection(prevSection);
          const state = getKeyboardState({ section: prevSection, isMobile });
          // Hide keyboard when scrolling back up to hero
          if (prevSection === "hero") {
            kbd.visible = false;
            setKeyboardRevealed(false);
          }
          gsap.to(kbd.position, { ...state.position, duration: 1 });
          gsap.to(kbd.rotation, { ...state.rotation, duration: 1 });
        },
      },
    });
  };

  const setupScrollAnimations = () => {
    if (!splineApp || !splineContainer.current) return;
    const kbd = splineApp.findObjectByName("keyboard");
    if (!kbd) return;

    const heroState = getKeyboardState({ section: "hero", isMobile });
    gsap.set(kbd.position, heroState.position);

    createSectionTimeline("#skills", "skills", "hero");
    createSectionTimeline("#projects", "projects", "skills", "top 70%");
    createSectionTimeline("#contact", "contact", "projects", "top 30%");
  };

  const getBongoAnimation = () => {
    const framesParent = splineApp?.findObjectByName("bongo-cat");
    const frame1 = splineApp?.findObjectByName("frame-1");
    const frame2 = splineApp?.findObjectByName("frame-2");
    if (!frame1 || !frame2 || !framesParent) return { start: () => {}, stop: () => {} };
    let interval: NodeJS.Timeout;
    const start = () => {
      let i = 0;
      framesParent.visible = true;
      interval = setInterval(() => {
        frame1.visible = i % 2 === 0;
        frame2.visible = i % 2 !== 0;
        i++;
      }, 100);
    };
    const stop = () => {
      clearInterval(interval);
      framesParent.visible = false;
      frame1.visible = false;
      frame2.visible = false;
    };
    return { start, stop };
  };

  const getKeycapsAnimation = () => {
    if (!splineApp) return { start: () => {}, stop: () => {} };
    let tweens: gsap.core.Tween[] = [];
    const removePrevTweens = () => tweens.forEach((t) => t.kill());
    const start = () => {
      removePrevTweens();
      Object.values(SKILLS).sort(() => Math.random() - 0.5).forEach((skill, idx) => {
        const keycap = splineApp.findObjectByName(skill.name);
        if (!keycap) return;
        const t = gsap.to(keycap.position, {
          y: Math.random() * 200 + 200,
          duration: Math.random() * 2 + 2,
          delay: idx * 0.6,
          repeat: -1,
          yoyo: true,
          yoyoEase: "none",
          ease: "elastic.out(1,0.3)",
        });
        tweens.push(t);
      });
    };
    const stop = () => {
      removePrevTweens();
      Object.values(SKILLS).forEach((skill) => {
        const keycap = splineApp.findObjectByName(skill.name);
        if (!keycap) return;
        const t = gsap.to(keycap.position, { y: 0, duration: 4, repeat: 1, ease: "elastic.out(1,0.7)" });
        tweens.push(t);
      });
      setTimeout(removePrevTweens, 1000);
    };
    return { start, stop };
  };

  const updateKeyboardTransform = async () => {
    if (!splineApp) return;
    const kbd = splineApp.findObjectByName("keyboard");
    if (!kbd) return;

    // Keep keyboard fully hidden while the user is on the hero section.
    // It will be revealed once they scroll down to skills.
    kbd.visible = false;
    if (activeSection === "hero") {
      setKeyboardRevealed(false);
      return;
    }
    await sleep(400);
    kbd.visible = true;
    setKeyboardRevealed(true);

    // Three.js keyboard uses native scale (1,1,1) — no shrink/scale-in needed.
    // Just animate position for a nice entrance instead.
    const currentState = getKeyboardState({ section: activeSection, isMobile });
    gsap.fromTo(
      kbd.position,
      { y: currentState.position.y - 300 },
      { y: currentState.position.y, duration: 1.5, ease: "elastic.out(1, 0.6)" }
    );

    const allObjects = splineApp.getAllObjects();
    const keycaps = allObjects.filter((obj: any) => obj.name === "keycap");

    await sleep(900);

    if (isMobile) {
      allObjects.filter((obj: any) => obj.name === "keycap-mobile")
        .forEach((kc: any) => { kc.visible = true; });
    } else {
      allObjects.filter((obj: any) => obj.name === "keycap-desktop")
        .forEach(async (kc: any, idx: number) => {
          await sleep(idx * 70);
          kc.visible = true;
        });
    }

    // Staggered bounce-in for all named keycaps
    Object.values(SKILLS).forEach(async (skill, idx) => {
      const keycap = splineApp.findObjectByName(skill.name);
      if (!keycap) return;
      keycap.visible = false;
      await sleep(idx * 70);
      keycap.visible = true;
      gsap.fromTo(
        keycap.position,
        { y: -400 },
        { y: 0, duration: 0.6, delay: 0.05, ease: "bounce.out" }
      );
    });
  };

  // --- Effects ---

  useEffect(() => {
    if (!splineApp) return;
    handleSplineInteractions();
    setupScrollAnimations();
    bongoAnimationRef.current = getBongoAnimation();
    keycapAnimationsRef.current = getKeycapsAnimation();
    return () => {
      bongoAnimationRef.current?.stop();
      keycapAnimationsRef.current?.stop();
    };
  }, [splineApp, isMobile]);

  useEffect(() => {
    if (!splineApp) return;
    // text visibility dummies — no-op for Three.js but keeps original logic intact
    const textObjs = ["text-desktop-dark", "text-desktop", "text-mobile-dark", "text-mobile"];
    textObjs.forEach((n) => {
      const obj = splineApp.findObjectByName(n);
      if (obj) obj.visible = false;
    });
  }, [theme, splineApp, isMobile, activeSection]);

  useEffect(() => {
    if (!selectedSkill || !splineApp) return;
    splineApp.setVariable("heading", selectedSkill.label);
    splineApp.setVariable("desc", selectedSkill.shortDescription);
  }, [selectedSkill]);

  useEffect(() => {
    if (!splineApp) return;
    let rotateKeyboard: gsap.core.Tween | undefined;
    let teardownKeyboard: gsap.core.Tween | undefined;
    const kbd = splineApp.findObjectByName("keyboard");

    if (kbd) {
      rotateKeyboard = gsap.to(kbd.rotation, {
        y: Math.PI * 2 + (kbd.rotation.y ?? 0),
        duration: 10, repeat: -1, yoyo: true, yoyoEase: true,
        ease: "back.inOut", delay: 2.5, paused: true,
      });
      teardownKeyboard = gsap.fromTo(
        kbd.rotation,
        { y: 0, x: -Math.PI, z: 0 },
        { y: -Math.PI / 2, duration: 5, repeat: -1, yoyo: true, yoyoEase: true,
          delay: 2.5, immediateRender: false, paused: true }
      );
    }

    const manageAnimations = async () => {
      if (activeSection === "hero") {
        rotateKeyboard?.restart();
        teardownKeyboard?.pause();
      } else if (activeSection === "contact") {
        rotateKeyboard?.pause();
      } else {
        rotateKeyboard?.pause();
        teardownKeyboard?.pause();
      }

      if (activeSection === "projects") {
        await sleep(300);
        bongoAnimationRef.current?.start();
      } else {
        await sleep(200);
        bongoAnimationRef.current?.stop();
      }

      if (activeSection === "contact") {
        await sleep(600);
        teardownKeyboard?.restart();
        keycapAnimationsRef.current?.start();
      } else {
        await sleep(600);
        teardownKeyboard?.pause();
        keycapAnimationsRef.current?.stop();
      }
    };

    manageAnimations();
    return () => { rotateKeyboard?.kill(); teardownKeyboard?.kill(); };
  }, [activeSection, splineApp]);

  useEffect(() => {
    const hash = activeSection === "hero" ? "#" : `#${activeSection}`;
    router.push("/" + hash, { scroll: false });
    if (!splineApp || isLoading || keyboardRevealed) return;
    updateKeyboardTransform();
  }, [splineApp, isLoading, activeSection]);

  return (
    <>
      <ThreeKeyboard
        className="w-full h-full fixed"
        ref={splineContainer}
        isDark={isDark}
        onLoad={(app: Application) => {
          setSplineApp(app);
          bypassLoading();
        }}
      />
      <SkillOverlay skill={selectedSkill} />
    </>
  );
};

export default AnimatedBackground;
