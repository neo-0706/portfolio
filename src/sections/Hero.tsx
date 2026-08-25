import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Github } from "lucide-react";
import MagneticButton from "../components/MagneticButton";
import ConstellationBackground from "../components/ConstellationBackground";
import { personal } from "../data/nav";

const line1 = "MOHAMMAD".split("");
const line2 = "HOSEIN".split("");
const line3 = "SHAHSAVAND".split("");
const line4 = "BAGHDADI".split("");

const letterVariants = {
  hidden: { y: "110%" },
  visible: (i: number) => ({
    y: "0%",
    transition: {
      delay: 0.4 + i * 0.018,
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

/**
 * Signature visual: a small stack of floating interface layers, each
 * representing a layer of the request lifecycle (UI, component, API,
 * data). It reappears, expanded, in the Mindset section — tying the
 * hero to the closing argument of the page.
 */
function InterfaceStack() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const layers = [
    { label: "UI.tsx", rotate: -6, x: -30, y: -40, delay: 0 },
    { label: "useState()", rotate: 4, x: 40, y: -10, delay: 0.15 },
    { label: "GET /api", rotate: -3, x: -10, y: 40, delay: 0.3 },
    { label: "Postgres", rotate: 7, x: 20, y: 80, delay: 0.45 },
  ];

  return (
    <div className="relative hidden h-[420px] w-full max-w-sm lg:block">
      {layers.map((layer, i) => {
        const isHovered = hoveredIndex === i;

        return (
          <motion.div
            key={layer.label}
            initial={{ opacity: 0, y: 60, rotate: layer.rotate - 4 }}
            animate={{
              opacity: 1,
              y: isHovered ? layer.y - 20 : layer.y,
              x: layer.x,
              rotate: isHovered ? 0 : layer.rotate,
              scale: isHovered ? 1.04 : 1,
            }}
            transition={
              isHovered
                ? { type: "spring", stiffness: 380, damping: 24 }
                : {
                    delay: 1 + layer.delay,
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                  }
            }
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`absolute left-1/2 top-1/2 flex h-32 w-64 -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col justify-between rounded-2xl border p-5 transition-colors duration-300 backdrop-blur-md ${
              isHovered
                ? "border-signal/60 bg-ink-panel/95 shadow-[0_25px_65px_-12px_rgba(124,108,255,0.25)]"
                : "border-ink-line/80 bg-ink-panel/70 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]"
            }`}
            style={{ zIndex: isHovered ? 30 : i }}
          >
            <div className="flex items-center justify-between">
              <span
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  isHovered
                    ? "bg-signal shadow-[0_0_10px_rgba(124,108,255,0.8)]"
                    : "bg-signal"
                }`}
              />
              <span
                className={`font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 ${
                  isHovered ? "text-bone" : "text-bone-faint"
                }`}
              >
                0{i + 1}
              </span>
            </div>
            <span
              className={`font-mono text-sm transition-colors duration-300 ${
                isHovered ? "text-bone font-medium" : "text-bone-dim"
              }`}
            >
              {layer.label}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-6 pb-8 pt-32 md:px-10 md:pt-40"
    >
      <ConstellationBackground />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_78%_15%,rgba(124,108,255,0.16),transparent_70%)]"
      />

      <motion.div
        style={{ y, opacity }}
        className="grid flex-1 grid-cols-1 items-center gap-10 lg:grid-cols-[1.4fr_1fr]"
      >
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="eyebrow mb-6"
          >
            {personal.title} · {personal.location}
          </motion.p>

          <h1 className="font-display text-[13.5vw] font-semibold leading-[0.92] tracking-tightest text-bone sm:text-[9vw] lg:text-[6.4vw]">
            <span className="block overflow-hidden">
              {line1.map((char, i) => (
                <motion.span
                  key={`l1-${i}`}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </span>

            <span className="block overflow-hidden">
              {line2.map((char, i) => (
                <motion.span
                  key={`l2-${i}`}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </span>

            <span className="block overflow-hidden text-outline">
              {line3.map((char, i) => (
                <motion.span
                  key={`l3-${i}`}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </span>

            <span className="block overflow-hidden text-outline">
              {line4.map((char, i) => (
                <motion.span
                  key={`l4-${i}`}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.7 }}
            className="mt-8 max-w-lg"
          >
            <p className="text-lg leading-relaxed text-bone-dim md:text-xl">
              I build modern, responsive web experiences where thoughtful design
              meets clean engineering.
            </p>
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.25em] text-bone-faint">
              React · JavaScript · UI Engineering · APIs
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.7 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton href="#work" variant="solid" cursorLabel="View">
              View my work
            </MagneticButton>
            <MagneticButton
              href="#contact"
              variant="outline"
              cursorLabel="Connect"
            >
              Let's connect
            </MagneticButton>
            <a
              href={personal.github}
              target="_blank"
              rel="noreferrer"
              data-cursor="GitHub"
              className="ml-1 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-bone-faint transition-colors hover:text-signal"
            >
              <Github size={16} />
              @neo-0706
              <ArrowUpRight size={13} />
            </a>
          </motion.div>
        </div>

        <InterfaceStack />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="mt-16 flex items-center justify-between border-t border-ink-line pt-6"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-bone-faint">
          Scroll to explore
        </span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="text-bone-faint"
        >
          <ArrowDown size={16} />
        </motion.span>
      </motion.div>
    </section>
  );
}
