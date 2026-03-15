'use client';

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Fira_Code, Inter } from "next/font/google";
import RotatingEarth from "@/components/ui/wireframe-dotted-globe";

const inter = Inter({ subsets: ["latin"] });
const firaCode = Fira_Code({ weight: "500", subsets: ["latin"] });

type ResearchItem = {
  title: string;
  venue?: string;
  status?: string;
  summary: string;
  abstract?: string;
  paperPath?: string;
  link?: string;
  techStack?: string[];
  category: "research" | "systems";
  dataset?: string;
  metrics?: { label: string; value: string }[];
  downloadOnly?: boolean;
  domain?: "cardiovascular" | "imaging" | "mental-health" | "systems" | "oncology";
  censored?: boolean;
};

const researchItems: ResearchItem[] = [
  {
    title: "Disability and Predicted 10-Year ASCVD Risk in U.S. Adults: Evidence from NHANES 2005–2018",
    venue: "American Journal of Preventive Medicine",
    status: "Submission Pending",
    category: "research",
    domain: "cardiovascular",
    dataset: "NHANES 2005–2018",
    summary:
      "Mobility-related disability is independently associated with substantially higher predicted 10-year ASCVD risk. Using survey-weighted regression on 23,506 NHANES participants aged 40–79, we show disability predicts higher odds of clinically meaningful ASCVD thresholds, highlighting an underrecognized cardiovascular risk marker.",
    abstract: `Introduction: Adults with disabilities experience a disproportionate burden of cardiometabolic risk factors, yet disability status remains underreported in cardiovascular research. Population-level estimates of predicted atherosclerotic cardiovascular disease (ASCVD) risk in this group are limited.
Methods: We analyzed data from 23,506 adults aged 40-79 years with complete Pooled Cohort Equation (PCE) data in the 2005-2018 National Health and Nutrition Examination Survey (NHANES). Disability was defined as the presence of at least one self-reported mobility-related limitation (use of walking equipment, difficulty climbing ten steps, or difficulty stooping, crouching, or kneeling). Predicted 10-year ASCVD risk was calculated using the 2013 ACC/AHA PCEs. Survey-weighted analyses generated nationally representative estimates. Linear regression models adjusted for age, sex, and race/ethnicity.
Results: Among participants, 7,928 (33.7% unweighted) were classified as having a disability. Adults with disability were older and had higher prevalence of diabetes, current smoking, and antihypertensive medication use. Mean predicted 10-year ASCVD risk was higher among disabled compared with non-disabled adults (14.98% vs 7.66%, p<0.001). In linear models adjusting for age, sex, and race/ethnicity, disability remained associated with higher predicted 10-year ASCVD risk (beta = 1.75%, 95% CI: 1.30-2.19%, p<0.001). Disability also predicted higher odds of ASCVD >= 7.5% (OR 2.33; 95% CI: 1.79-3.02) and >= 20% (OR 4.22; 95% CI: 1.57-11.37). At the mean sample age (60 years), the predicted probability of ASCVD risk >= 7.5% was 33.2% for adults with disability compared with 17.6% for those without.
Conclusions: Adults with disability have substantially higher predicted ASCVD risk as estimated by standard risk prediction models. Disability also predicts higher odds of clinically meaningful ASCVD thresholds (>=7.5% and >=20%), with predicted probabilities at age 60 of 33.2% versus 17.6%. These findings highlight disability as an underrecognized marker of elevated cardiovascular risk and underscore the importance of inclusive prevention strategies.`,
    metrics: [
      { label: "Study Population", value: "23,506" },
      { label: "OR for ASCVD ≥7.5%", value: "2.33×" },
      { label: "OR for ASCVD ≥20%", value: "4.22×" },
    ],
  },
  {
    title: "Transcriptional Regulation of Immune Evasion in Solid Tumors",
    venue: "Active Research",
    status: "Ongoing",
    category: "research",
    domain: "oncology",
    censored: true,
    summary:
      "Single-cell transcriptomic screen identifying a transcription factor that suppresses immune recognition in malignant cells. Results withheld — manuscript in preparation.",
    techStack: ["scRNA-seq", "GSEA", "Survival Analysis", "Drug Repurposing", "R", "Python"],
    metrics: [
      { label: "Transcription Factors Screened", value: "899" },
      { label: "Malignant Cells Analyzed", value: "1,252" },
      { label: "Cancer Types Validated", value: "10" },
    ],
  },
  {
    title: "Improving Pediatric Pneumonia Detection with Synthetic X-ray Augmentation",
    venue: "Research Project",
    category: "research",
    domain: "imaging",
    summary:
      "Fine-tuned latent diffusion models to generate synthetic pediatric chest X-rays for dataset augmentation. The optimal model combining real data with 50% synthetic images improved overall accuracy from 88% to 90.2%, primarily by enhancing detection of healthy cases without compromising pneumonia identification.",
    paperPath: "/WRSEF_Entire_Project.pdf",
    techStack: ["PyTorch", "Stable Diffusion", "DenseNet", "Python", "Hugging Face"],
    metrics: [
      { label: "Accuracy Gain", value: "+2.2%" },
      { label: "Best Synthetic Ratio", value: "50%" },
      { label: "Base Accuracy", value: "88%" },
    ],
    downloadOnly: true,
  },
  {
    title: "COVID-19 and Shifted Adolescent Suicide Vulnerability",
    venue: "Research Project",
    category: "research",
    domain: "mental-health",
    dataset: "YRBS 2019–2021",
    summary:
      "Using a nationally representative sample of 45,674 U.S. students aged 13–18, this study quantified how COVID-19 reshaped suicidal ideation probability via a Protective Factor Index. Previously moderately-protected students showed the largest relative increases post-pandemic.",
    abstract: `The COVID-19 pandemic significantly altered patterns of adolescent suicidal ideation, yet quantitative evidence of how vulnerability shifted is limited. Using a nationally representative sample of 45,674 U.S. students aged 13-18, this study examined pre- and post-pandemic changes in suicidal ideation probability. A Protective Factor Index (PFI) was calculated for each student, integrating mental health indicators, substance use, and social stressors; lower PFI values indicate higher vulnerability. Logistic regression modeled suicidal ideation as a function of PFI, pandemic period, and their interaction. Pre-pandemic, students with the lowest PFI (highest vulnerability) had a 37.5% baseline probability of suicidal ideation, with a slope of 0.103 across PFI, indicating decreasing probability with increasing protective factors. Post-pandemic, the baseline probability increased to 50%, and the slope steepened to 0.308, reflecting a 199% amplification of risk trends. The curves intersected at a PFI of 5, showing that previously moderately protected adolescents experienced disproportionate increases in vulnerability. Odds ratios reveal that post-COVID, adolescents in the lowest PFI tertile were 2.03 times more likely to report suicidal ideation compared with pre-pandemic levels, while moderate- and high-PFI groups showed smaller relative increases (OR = 1.57-1.33). These findings indicate that COVID-19 did not uniformly increase adolescent suicide risk but reshaped the vulnerability distribution, with previously moderately protected and low-protection students becoming significantly more susceptible.`,
    paperPath: "/HOSAposter.png",
    metrics: [
      { label: "Study Population", value: "45,674" },
      { label: "Risk Amplification", value: "199%" },
      { label: "Baseline Risk at Low Protection", value: "2.03x" },
    ],
    downloadOnly: true,
  },
  {
    title: "Momentum",
    venue: "Product Launch",
    category: "systems",
    domain: "systems",
    summary:
      "AI-powered habit tracking and goal execution platform. Combines gamification (XP, levels, streaks), LLM-based coaching, and behavioral analytics into a full-stack productivity system built for sustained behavior change.",
    link: "https://momentum-frontend-b1je.onrender.com/",
    techStack: ["React", "TypeScript", "Node.js", "Tailwind CSS", "REST APIs", "LLM Integration"],
  },
];

const researchInterests = [
  { label: "Cardiovascular disease", color: "border-red-800 text-red-300" },
  { label: "Population health", color: "border-teal-800 text-teal-300" },
  { label: "Clinical risk prediction", color: "border-blue-800 text-blue-300" },
  { label: "Health disparities", color: "border-amber-800 text-amber-300" },
  { label: "Preventative medicine & computational biology", color: "border-purple-800 text-purple-300" },
];

const techCategories = [
  { label: "Data", items: ["Python", "Pandas", "NumPy", "R", "SQL"], accentColor: "#06b6d4" },
  { label: "Machine Learning", items: ["PyTorch", "Scikit-learn", "Stable Diffusion", "DenseNet", "Hugging Face"], accentColor: "#a855f7" },
  { label: "Datasets & Methods", items: ["NHANES", "YRBS", "Pooled Cohort Equations", "Epidemiology", "Statistical Modeling"], accentColor: "#f59e0b" },
  { label: "Infrastructure", items: ["Next.js", "Node.js", "REST APIs", "Cloud Deployment", "Git"], accentColor: "#3b82f6" },
];

const pipelineSteps = [
  { label: "Dataset Acquisition", detail: "Finding credible dataset", icon: "01", status: "complete" },
  { label: "Data Cleaning", detail: "Clinical variable extraction", icon: "02", status: "complete" },
  { label: "Feature Engineering", detail: "Risk factor modeling", icon: "03", status: "complete" },
  { label: "Model Training", detail: "Regression pipeline", icon: "04", status: "complete" },
  { label: "Validation", detail: "Survey-weighted analysis", icon: "05", status: "complete" },
  { label: "Publication", detail: "Peer review", icon: "06", status: "upcoming" },
];

const typewriterPhrases = [
  "23,506 patients studied",
  "1 active research project",
  "ML + Epidemiology",
  "Tumor Immunology",
];

// Utility: get domain accent color
function getDomainBorderColor(domain?: string) {
  switch (domain) {
    case "cardiovascular": return "#ef4444";
    case "imaging": return "#a855f7";
    case "mental-health": return "#f59e0b";
    case "systems": return "#06b6d4";
    case "oncology": return "#10b981";
    default: return "#3b82f6";
  }
}

// Utility: get tech tag color by type
function getTechTagStyle(tag: string): React.CSSProperties {
  const ml = ["PyTorch", "Stable Diffusion", "DenseNet", "Hugging Face", "Scikit-learn", "LLM Integration"];
  const data = ["Python", "Pandas", "NumPy", "R", "SQL"];
  const infra = ["React", "TypeScript", "Node.js", "Tailwind CSS", "REST APIs", "Next.js", "Git", "Cloud Deployment"];
  if (ml.includes(tag)) return { background: "#3b0764", color: "#d8b4fe" };
  if (data.includes(tag)) return { background: "#042f2e", color: "#5eead4" };
  if (infra.includes(tag)) return { background: "#0c1a4a", color: "#93c5fd" };
  return { background: "#1e3a8a33", color: "#93c5fd" };
}

// Animated counter hook
function useCountUp(target: number, isVisible: boolean, duration = 1500) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isVisible, target, duration]);
  return count;
}

// Animated metric display component
function AnimatedMetric({ value, label, isVisible, firaClassName }: {
  value: string;
  label: string;
  isVisible: boolean;
  firaClassName: string;
}) {
  const numMatch = value.match(/^([+]?)(\d[\d,]*)(\.\d+)?(%|x)?$/);
  const isNumeric = !!numMatch;
  const numericVal = isNumeric ? parseInt(value.replace(/[^0-9]/g, "")) : 0;
  const prefix = numMatch ? numMatch[1] : "";
  const suffix = numMatch ? (numMatch[4] || "") : "";
  const hasDecimal = numMatch ? !!numMatch[3] : false;
  const decimalPart = numMatch ? (numMatch[3] || "") : "";
  const animated = useCountUp(numericVal, isVisible && isNumeric);

  function formatNum(n: number) {
    return n.toLocaleString();
  }

  return (
    <div>
      <p className="text-3xl font-bold text-white" style={{ textShadow: "0 0 20px rgba(59,130,246,0.3)" }}>
        {isNumeric && isVisible ? `${prefix}${formatNum(animated)}${hasDecimal ? decimalPart : ""}${suffix}` : value}
      </p>
      <p className={`text-xs text-slate-500 mt-0.5 ${firaClassName}`}>{label}</p>
    </div>
  );
}

const LOADING_QUOTE = {
  text: "The art of medicine consists of amusing the patient while nature cures the disease.",
  author: "Voltaire",
  year: "1764",
};

function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const duration = 5000;
    const start = performance.now();
    const raf = requestAnimationFrame(function tick(now) {
      const pct = Math.min(((now - start) / duration) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        requestAnimationFrame(tick);
      } else {
        setFadeOut(true);
        setTimeout(onDone, 600);
      }
    });
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-opacity duration-600 ${firaCode.className}`}
      style={{
        background: "#05070f",
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.6s ease",
        pointerEvents: fadeOut ? "none" : "all",
      }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#3b82f618 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 max-w-xl px-8 text-center space-y-8">
        {/* Pulsing accent dot */}
        <div className="flex justify-center">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
        </div>

        {/* Quote */}
        <div className="space-y-4">
          <p
            className="text-xl sm:text-2xl font-light text-slate-300 leading-relaxed"
            style={{ fontFamily: "Georgia, serif" }}
          >
            &ldquo;{LOADING_QUOTE.text}&rdquo;
          </p>
          <p className="text-sm text-blue-400 tracking-widest uppercase">
            &mdash; {LOADING_QUOTE.author}, {LOADING_QUOTE.year}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-xs mx-auto space-y-2">
          <div className="h-[1px] w-full rounded-full" style={{ background: "#1e3a8a" }}>
            <div
              className="h-[1px] rounded-full transition-all"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #3b82f6, #06b6d4)",
              }}
            />
          </div>
          <p className="text-xs text-slate-600 text-right">{Math.floor(progress)}%</p>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<"research" | "systems">("research");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [typewriterText, setTypewriterText] = useState("");
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  const [metricsVisible, setMetricsVisible] = useState(false);
  const [abstractOpen, setAbstractOpen] = useState(false);
  const [cardAbstractOpen, setCardAbstractOpen] = useState<Record<string, boolean>>({});
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());

  const featuredRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<Map<string, HTMLElement>>(new Map());

  // #1 Scroll progress bar
  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement;
      const scrollTop = el.scrollTop || document.body.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      setScrollProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // #2 Active section detection
  useEffect(() => {
    const sections = ["research", "pipeline", "systems"];
    const observers: IntersectionObserver[] = [];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // #6 Typewriter effect
  useEffect(() => {
    let charIndex = 0;
    let phraseIdx = 0;
    let isDeleting = false;
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      const current = typewriterPhrases[phraseIdx];
      if (isDeleting) {
        charIndex--;
        setTypewriterText(current.slice(0, charIndex));
        if (charIndex === 0) {
          isDeleting = false;
          phraseIdx = (phraseIdx + 1) % typewriterPhrases.length;
          timeout = setTimeout(tick, 500);
          return;
        }
        timeout = setTimeout(tick, 40);
      } else {
        charIndex++;
        setTypewriterText(current.slice(0, charIndex));
        if (charIndex === current.length) {
          isDeleting = true;
          timeout = setTimeout(tick, 2000);
          return;
        }
        timeout = setTimeout(tick, 70);
      }
    };
    timeout = setTimeout(tick, 800);
    return () => clearTimeout(timeout);
  }, []);

  // #19 Metrics counter visibility
  useEffect(() => {
    if (!featuredRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setMetricsVisible(true); },
      { threshold: 0.3 }
    );
    observer.observe(featuredRef.current);
    return () => observer.disconnect();
  }, []);

  // #30 Card scroll-in animation
  const setCardRef = useCallback((title: string, el: HTMLElement | null) => {
    if (el) cardRefs.current.set(title, el);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    cardRefs.current.forEach((el, title) => {
      el.classList.add("card-hidden");
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.remove("card-hidden");
            el.classList.add("card-visible");
            setVisibleCards((prev) => new Set(prev).add(title));
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [activeTab]);

  const toggleCardAbstract = (title: string) => {
    setCardAbstractOpen((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLoadingDone = useCallback(() => setLoaded(true), []);

  return (
    <>
      {!loaded && <LoadingScreen onDone={handleLoadingDone} />}
    <main className={`min-h-screen text-[#e5e7eb] ${inter.className}`} style={{ background: "#05070f", opacity: loaded ? 1 : 0, transition: "opacity 0.5s ease" }}>

      {/* #1 Scroll progress bar */}
      <div
        className="fixed top-0 left-0 z-[60] h-[2px] transition-all duration-100"
        style={{
          width: `${scrollProgress}%`,
          background: "linear-gradient(90deg, #3b82f6, #06b6d4)",
        }}
      />

      {/* #42 Ambient background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="ambient-blob-1 absolute w-[600px] h-[600px] rounded-full opacity-[0.035]"
          style={{
            top: "10%", left: "5%",
            background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)",
          }}
        />
        <div
          className="ambient-blob-2 absolute w-[500px] h-[500px] rounded-full opacity-[0.025]"
          style={{
            top: "50%", right: "10%",
            background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)",
          }}
        />
      </div>

      {/* #41 Hex-inspired dot grid background */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "radial-gradient(#3b82f620 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* NAV */}
      <nav
        className="fixed top-[2px] left-0 right-0 z-50 border-b"
        style={{ background: "#05070fdd", borderColor: "#1e3a8a55", backdropFilter: "blur(12px)" }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* #5 Pulsing status dot */}
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
            {/* #3 Terminal logo prefix */}
            <span className={`text-blue-400 tracking-widest text-sm ${firaCode.className}`}>
              <span className="text-slate-500">[/&gt;]</span> AYAN MISHRA
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className={`flex gap-6 text-sm text-slate-400 ${firaCode.className}`}>
              {["research", "pipeline", "systems"].map((section) => (
                <a
                  key={section}
                  href={`#${section}`}
                  className="transition capitalize"
                  style={{
                    color: activeSection === section ? "#60a5fa" : undefined,
                    borderBottom: activeSection === section ? "1px solid #3b82f6" : "1px solid transparent",
                    paddingBottom: "2px",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#60a5fa"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = activeSection === section ? "#60a5fa" : ""; }}
                >
                  {section}
                </a>
              ))}
            </div>
            {/* #4 Contact button in nav */}
            <a
              href="mailto:mishra.ayan1@gmail.com"
              className={`text-xs px-3 py-1 rounded-full border transition-all ${firaCode.className}`}
              style={{ borderColor: "#1e3a8a", color: "#60a5fa" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#3b82f6";
                (e.currentTarget as HTMLElement).style.color = "#93c5fd";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#1e3a8a";
                (e.currentTarget as HTMLElement).style.color = "#60a5fa";
              }}
            >
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-20 px-6 overflow-hidden">
        {/* #14 Large watermark number */}
        <div
          className={`absolute pointer-events-none select-none font-bold text-white ${firaCode.className}`}
          style={{
            fontSize: "clamp(6rem, 18vw, 14rem)",
            opacity: 0.018,
            top: "50%",
            left: "-2%",
            transform: "translateY(-50%)",
            lineHeight: 1,
            letterSpacing: "-0.05em",
          }}
        >
          23,506
        </div>

        {/* #10 ECG hero accent */}
        <div className="absolute bottom-12 left-0 right-0 pointer-events-none overflow-hidden" style={{ height: "60px", opacity: 0.15 }}>
          <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full h-full">
            <path
              className="ecg-path"
              d="M0,30 L100,30 L120,30 L130,5 L145,55 L155,15 L165,45 L175,30 L300,30 L320,30 L330,5 L345,55 L355,15 L365,45 L375,30 L500,30 L520,30 L530,5 L545,55 L555,15 L565,45 L575,30 L700,30 L720,30 L730,5 L745,55 L755,15 L765,45 L775,30 L900,30 L920,30 L930,5 L945,55 L955,15 L965,45 L975,30 L1200,30"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-7">
            <div className="space-y-3">
              <p className={`text-blue-400 text-xs uppercase tracking-[0.3em] ${firaCode.className}`}>Computational Health Research</p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight text-white leading-[1.08]">
                Ayan<br />
                {/* #9 Gradient text on "Mishra" */}
                <span
                  className="font-semibold"
                  style={{
                    background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Mishra
                </span>
              </h1>
              <p className="text-slate-400 text-base font-light">AI &amp; Biomedical Data Science</p>
              {/* #12 Currently researching badge */}
              <div className="flex items-center gap-2 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
                <span className={`text-xs text-slate-500 ${firaCode.className}`}>Researching ASCVD risk in disabled populations</span>
              </div>
            </div>

            {/* #6 Typewriter credentials */}
            <div className={`text-sm text-blue-400 ${firaCode.className} flex items-center gap-0`}>
              <span className="text-slate-600">$ </span>
              <span className="ml-1">{typewriterText}</span>
              <span className="typewriter-cursor" />
            </div>

            <p className="text-slate-400 leading-relaxed max-w-lg">
              Investigating cardiovascular risk factors using large-scale clinical and epidemiological datasets.
            </p>

            {/* #15 Colored research interest pills */}
            <div className="flex flex-wrap gap-2">
              {researchInterests.map((interest) => (
                <span
                  key={interest.label}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-200 ${firaCode.className} ${interest.color}`}
                  style={{ background: "#0b0f1a" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.05)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
                >
                  {interest.label}
                </span>
              ))}
            </div>

            <div className="flex gap-4 flex-wrap">
              {/* #8 Shimmer CTA button */}
              <a
                href="#research"
                className={`btn-shimmer px-5 py-2.5 text-sm font-medium rounded transition-all ${firaCode.className}`}
                style={{ background: "#3b82f6", color: "#fff" }}
              >
                View Research
              </a>
              <a
                href="#systems"
                className={`px-5 py-2.5 text-sm font-medium rounded border transition-all hover:border-blue-500 hover:text-blue-200 ${firaCode.className}`}
                style={{ borderColor: "#1e3a8a", color: "#93c5fd" }}
              >
                View Systems
              </a>
            </div>
          </div>

          {/* Globe with #11 ambient glow */}
          <div className="relative h-screen lg:h-[600px] w-full -mr-6 lg:-mr-16 flex items-center justify-center">
            {/* #11 Ambient glow behind globe */}
            <div
              className="absolute inset-0 pointer-events-none animate-pulse"
              style={{
                background: "radial-gradient(circle at center, #3b82f612 0%, #06b6d408 40%, transparent 70%)",
                animationDuration: "4s",
              }}
            />
            <div className="w-[600px] h-[600px] relative z-10">
              <RotatingEarth width={600} height={600} />
            </div>
          </div>
        </div>

        {/* #13 Scroll down indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-600 animate-bounce">
          <span className={`text-xs ${firaCode.className}`}>scroll</span>
          <span>↓</span>
        </div>
      </section>

      {/* #43 Section gradient divider */}
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #1e3a8a44 20%, #3b82f644 50%, #1e3a8a44 80%, transparent)" }} />

      {/* RESEARCH STATEMENT SECTION */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* #18 Affiliation tag */}
          <div className={`inline-flex items-center gap-2 text-xs px-4 py-1.5 rounded-full border ${firaCode.className}`}
            style={{ borderColor: "#1e3a8a", color: "#60a5fa", background: "#0b0f1a" }}>
            <span className="text-slate-600">[</span>
            <span>Computational Epidemiology</span>
            <span className="text-slate-600">]</span>
          </div>

          <div className="space-y-4 relative">
            {/* #16 Decorative quote marks */}
            <span
              className="absolute -top-8 -left-4 text-blue-900 pointer-events-none select-none font-serif"
              style={{ fontSize: "5rem", lineHeight: 1, opacity: 0.4 }}
            >
              &ldquo;
            </span>
            <p className={`text-blue-400 text-xs uppercase tracking-[0.3em] ${firaCode.className}`}>Research Statement</p>
            <p className="text-xl sm:text-2xl font-light text-slate-300 leading-relaxed">
              My work focuses on applying machine learning to large-scale biomedical datasets to identify predictors of cardiovascular disease. I am particularly interested in improving risk prediction for underrepresented clinical populations.
            </p>
            <span
              className="absolute -bottom-4 -right-4 text-blue-900 pointer-events-none select-none font-serif"
              style={{ fontSize: "5rem", lineHeight: 1, opacity: 0.4 }}
            >
              &rdquo;
            </span>
          </div>
        </div>
      </section>

      {/* #43 Section gradient divider */}
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #1e3a8a44 20%, #3b82f644 50%, #1e3a8a44 80%, transparent)" }} />

      {/* FEATURED RESEARCH */}
      <section className="py-16 px-6" ref={featuredRef}>
        <div className="max-w-6xl mx-auto">
          <p className={`text-blue-400 text-xs uppercase tracking-[0.3em] mb-8 ${firaCode.className}`}>Featured Research</p>
          <article
            className="rounded-xl border p-6 sm:p-8 transition-all duration-300 mb-8 relative overflow-hidden"
            style={{ background: "#0b0f1a", borderColor: "#1e3a8a" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#3b82f6";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(59,130,246,0.12)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#1e3a8a";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            {/* #20 Left gradient accent bar */}
            <div
              className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl"
              style={{ background: "linear-gradient(180deg, #3b82f6, #06b6d4)" }}
            />

            {/* #24 Featured ribbon */}
            <div
              className={`absolute top-4 right-6 flex items-center gap-1 text-xs px-2 py-0.5 rounded ${firaCode.className}`}
              style={{ background: "#f59e0b22", color: "#f59e0b", border: "1px solid #f59e0b44" }}
            >
              ★ FEATURED
            </div>

            {/* #34 Card index number */}
            <div
              className={`absolute bottom-4 right-6 text-7xl font-bold text-white pointer-events-none select-none ${firaCode.className}`}
              style={{ opacity: 0.03 }}
            >
              01
            </div>

            <div className="flex flex-col gap-5 pl-2">
              <div className="flex items-start justify-between gap-4 flex-wrap pr-20">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* #21 Pulsing publication badge */}
                    <span
                      className={`text-xs px-2 py-0.5 rounded border animate-pulse ${firaCode.className}`}
                      style={{
                        borderColor: "#3b82f6",
                        color: "#3b82f6",
                        background: "#3b82f610",
                        boxShadow: "0 0 8px rgba(59,130,246,0.3)",
                      }}
                    >
                      {researchItems[0].status}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded text-slate-400" style={{ background: "#ffffff0a" }}>
                      {researchItems[0].venue}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded ${firaCode.className}`} style={{ color: "#60a5fa", background: "#3b82f610" }}>
                      {researchItems[0].dataset}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-medium text-white leading-snug">{researchItems[0].title}</h3>
                </div>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed">{researchItems[0].summary}</p>

              {/* #19 Animated metric counters */}
              {researchItems[0].metrics && (
                <div className="flex gap-8 flex-wrap">
                  {researchItems[0].metrics.map((m) => (
                    <AnimatedMetric
                      key={m.label}
                      value={m.value}
                      label={m.label}
                      isVisible={metricsVisible}
                      firaClassName={firaCode.className}
                    />
                  ))}
                </div>
              )}

              {/* #23 Risk visualization bar */}
              <div className="space-y-2">
                <p className={`text-xs text-slate-500 uppercase tracking-wide ${firaCode.className}`}>10-year ASCVD Risk Comparison</p>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400 w-28 shrink-0">With disability</span>
                    <div className="flex-1 h-2 rounded-full" style={{ background: "#1e3a8a" }}>
                      <div className="h-2 rounded-full" style={{ width: "74.9%", background: "linear-gradient(90deg, #3b82f6, #06b6d4)" }} />
                    </div>
                    <span className={`text-xs font-semibold text-blue-400 w-10 ${firaCode.className}`}>14.98%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400 w-28 shrink-0">Without disability</span>
                    <div className="flex-1 h-2 rounded-full" style={{ background: "#1e3a8a" }}>
                      <div className="h-2 rounded-full" style={{ width: "38.3%", background: "#374151" }} />
                    </div>
                    <span className={`text-xs text-slate-500 w-10 ${firaCode.className}`}>7.66%</span>
                  </div>
                </div>
              </div>

              {/* #22 Smooth abstract expansion */}
              {researchItems[0].abstract && (
                <div className="rounded-lg border border-blue-900/30 overflow-hidden">
                  <button
                    onClick={() => setAbstractOpen(!abstractOpen)}
                    className={`w-full px-4 py-3 text-sm font-medium text-blue-400 flex justify-between items-center cursor-pointer hover:text-blue-300 transition ${firaCode.className}`}
                    style={{ background: "transparent", border: "none" }}
                  >
                    Abstract
                    <span style={{ transform: abstractOpen ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>›</span>
                  </button>
                  <div
                    style={{
                      maxHeight: abstractOpen ? "2000px" : "0",
                      overflow: "hidden",
                      transition: "max-height 0.4s ease",
                    }}
                  >
                    <div className="px-4 pb-4 text-sm text-slate-400 leading-relaxed space-y-3 border-t border-blue-900/30 pt-3">
                      {researchItems[0].abstract.split("\n").map((para, i) => (
                        <p key={i}>{para.trim()}</p>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </article>
        </div>
      </section>

      {/* #43 Section gradient divider */}
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #1e3a8a44 20%, #3b82f644 50%, #1e3a8a44 80%, transparent)" }} />

      {/* PIPELINE SECTION */}
      <section id="pipeline" className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <p className={`text-blue-400 text-xs uppercase tracking-[0.3em] mb-12 ${firaCode.className}`}>Research Pipeline</p>
          <div className="relative">
            {/* #26 Flowing shimmer line */}
            <div className="hidden md:block absolute top-5 left-[8.33%] right-[8.33%] h-[2px] pipeline-line rounded-full" />
            <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
              {pipelineSteps.map((step, i) => {
                const nodeColor = step.status === "complete" ? "#22c55e" : step.status === "active" ? "#3b82f6" : "#374151";
                const isActive = step.status === "active";
                return (
                  <div
                    key={step.label}
                    className="pipeline-node flex flex-col items-center text-center gap-3 group cursor-default"
                    style={{ animationDelay: `${i * 120}ms` }}
                  >
                    {/* #29 Step icons + #27 Status colors */}
                    <div
                      className={`w-11 h-11 rounded-full border-2 flex items-center justify-center text-base relative z-10 transition-all duration-300 ${isActive ? "animate-pulse" : ""}`}
                      style={{
                        background: "#0b0f1a",
                        borderColor: nodeColor,
                        color: nodeColor,
                        boxShadow: step.status !== "upcoming" ? `0 0 12px ${nodeColor}40` : "none",
                      }}
                    >
                      {step.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-200">{step.label}</p>
                      {/* #28 Detail text with hover expansion */}
                      <p
                        className={`text-xs mt-1 transition-all duration-200 ${firaCode.className}`}
                        style={{ color: "#60a5fa88" }}
                      >
                        {step.detail}
                      </p>
                      {/* Status indicator */}
                      <span
                        className={`text-xs mt-1 inline-block ${firaCode.className}`}
                        style={{ color: nodeColor, opacity: 0.7 }}
                      >
                        {step.status === "complete" ? "✓ done" : step.status === "active" ? "● active" : "○ queued"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* #43 Section gradient divider */}
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #1e3a8a44 20%, #3b82f644 50%, #1e3a8a44 80%, transparent)" }} />

      {/* RESEARCH & SYSTEMS GRID */}
      <section id="research" className="py-16 px-6">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <p className={`text-blue-400 text-xs uppercase tracking-[0.3em] mb-2 ${firaCode.className}`}>Work</p>
              <h2 className="text-3xl sm:text-4xl font-light text-white">Research &amp; Systems</h2>
            </div>
            <div
              className={`flex gap-1 rounded-lg p-1 ${firaCode.className}`}
              style={{ background: "#0b0f1a", border: "1px solid #1e3a8a" }}
            >
              {(["research", "systems"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="px-4 py-1.5 rounded text-sm capitalize transition"
                  style={{
                    background: activeTab === tab ? "#1e3a8a" : "transparent",
                    color: activeTab === tab ? "#fff" : "#60a5fa",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-5">
            {researchItems
              .slice(1)
              .filter((item) => item.category === activeTab)
              .map((item, idx) => {
                const domainColor = getDomainBorderColor(item.domain);
                if (item.censored) {
                  return (
                    <article
                      key={item.title}
                      ref={(el) => setCardRef(item.title, el)}
                      className="rounded-xl border p-6 sm:p-8 transition-all duration-300 relative overflow-hidden"
                      style={{ background: "#0b0f1a", borderColor: "#10b98133" }}
                    >
                      {/* Green left accent for active/ongoing */}
                      <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl" style={{ background: "#10b981" }} />
                      <div className="flex flex-col gap-4 pl-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`text-xs px-2 py-0.5 rounded border flex items-center gap-1.5 ${firaCode.className}`}
                            style={{ borderColor: "#10b98160", color: "#10b981", background: "#10b98110" }}
                          >
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                            </span>
                            Ongoing
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded text-slate-400" style={{ background: "#ffffff0a" }}>
                            Active Research
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded ${firaCode.className}`} style={{ color: "#6ee7b7", background: "#10b98110" }}>
                            Tumor Immunology
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-medium text-white leading-snug">{item.title}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">{item.summary}</p>
                        {/* Metrics */}
                        <div className="flex gap-8 flex-wrap">
                          {item.metrics?.map((m) => (
                            <div key={m.label}>
                              <p className="text-3xl font-bold text-white" style={{ textShadow: "0 0 20px rgba(16,185,129,0.25)" }}>{m.value}</p>
                              <p className={`text-xs text-slate-500 mt-0.5 ${firaCode.className}`}>{m.label}</p>
                            </div>
                          ))}
                        </div>
                        {/* Censored redacted block */}
                        <div className="rounded-lg border p-4 space-y-3 relative overflow-hidden" style={{ borderColor: "#10b98133", background: "#05100a" }}>
                          <p className={`text-xs uppercase tracking-widest mb-3 ${firaCode.className}`} style={{ color: "#10b98188" }}>Findings — Results Withheld</p>
                          {[85, 70, 90, 55, 75].map((w, i) => (
                            <div key={i} className="h-3 rounded" style={{ width: `${w}%`, background: "#10b98118", position: "relative", overflow: "hidden" }}>
                              <div className="absolute inset-0 rounded" style={{ background: "repeating-linear-gradient(90deg, #10b98122 0px, #10b98122 8px, transparent 8px, transparent 14px)" }} />
                            </div>
                          ))}
                          <p className={`text-xs mt-2 ${firaCode.className}`} style={{ color: "#10b98155" }}>Manuscript in preparation · Not for citation</p>
                        </div>
                        {/* Tech stack */}
                        {item.techStack && (
                          <div className="flex flex-wrap gap-2">
                            {item.techStack.map((t) => (
                              <span key={t} className={`text-xs px-2.5 py-1 rounded ${firaCode.className}`} style={getTechTagStyle(t)}>
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </article>
                  );
                }
                return (
                  <article
                    key={item.title}
                    ref={(el) => setCardRef(item.title, el)}
                    className="rounded-xl border p-6 sm:p-8 transition-all duration-300 relative overflow-hidden"
                    style={{ background: "#0b0f1a", borderColor: "#1e3a8a" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "#3b82f6";
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(59,130,246,0.12)";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; // #35
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "#1e3a8a";
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    }}
                  >
                    {/* #31 Domain color accent border */}
                    <div
                      className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl"
                      style={{ background: domainColor }}
                    />

                    {/* #34 Card index number */}
                    <div
                      className={`absolute bottom-4 right-6 text-7xl font-bold text-white pointer-events-none select-none ${firaCode.className}`}
                      style={{ opacity: 0.03 }}
                    >
                      {String(idx + 2).padStart(2, "0")}
                    </div>

                    <div className="flex flex-col gap-5 pl-2">
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div className="space-y-2">
                          <div className="flex flex-wrap items-center gap-2">
                            {item.status && (
                              <span
                                className={`text-xs px-2 py-0.5 rounded border ${firaCode.className}`}
                                style={{ borderColor: "#3b82f6", color: "#3b82f6", background: "#3b82f610" }}
                              >
                                {item.status}
                              </span>
                            )}
                            {item.venue && (
                              <span className="text-xs px-2 py-0.5 rounded text-slate-400" style={{ background: "#ffffff0a" }}>
                                {item.venue}
                              </span>
                            )}
                            {item.dataset && (
                              <span className={`text-xs px-2 py-0.5 rounded ${firaCode.className}`} style={{ color: "#60a5fa", background: "#3b82f610" }}>
                                {item.dataset}
                              </span>
                            )}
                          </div>
                          <h3 className="text-lg sm:text-xl font-medium text-white leading-snug">{item.title}</h3>
                        </div>
                        {item.link && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noreferrer"
                            className={`text-sm text-blue-400 hover:text-blue-300 transition shrink-0 border border-blue-900 rounded px-3 py-1 hover:border-blue-500 ${firaCode.className}`}
                          >
                            Visit →
                          </a>
                        )}
                      </div>

                      <p className="text-slate-400 text-sm leading-relaxed">{item.summary}</p>

                      {/* #32 Larger metric values */}
                      {item.metrics && (
                        <div className="flex gap-8 flex-wrap">
                          {item.metrics.map((m) => (
                            <div key={m.label}>
                              <p
                                className="text-3xl font-bold text-white"
                                style={{ textShadow: "0 0 20px rgba(59,130,246,0.25)" }}
                              >
                                {m.value}
                              </p>
                              <p className={`text-xs text-slate-500 mt-0.5 ${firaCode.className}`}>{m.label}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* #33 Colored tech stack tags */}
                      {item.techStack && (
                        <div className="flex flex-wrap gap-2">
                          {item.techStack.map((t) => (
                            <span
                              key={t}
                              className={`text-xs px-2.5 py-1 rounded ${firaCode.className}`}
                              style={getTechTagStyle(t)}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}

                      {item.abstract && (
                        <div className="rounded-lg border border-blue-900/30 overflow-hidden">
                          <button
                            onClick={() => toggleCardAbstract(item.title)}
                            className={`w-full px-4 py-3 text-sm font-medium text-blue-400 flex justify-between items-center cursor-pointer hover:text-blue-300 transition ${firaCode.className}`}
                            style={{ background: "transparent", border: "none" }}
                          >
                            Abstract
                            <span style={{ transform: cardAbstractOpen[item.title] ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>›</span>
                          </button>
                          <div
                            style={{
                              maxHeight: cardAbstractOpen[item.title] ? "2000px" : "0",
                              overflow: "hidden",
                              transition: "max-height 0.4s ease",
                            }}
                          >
                            <div className="px-4 pb-4 text-sm text-slate-400 leading-relaxed space-y-3 border-t border-blue-900/30 pt-3">
                              {item.abstract.split("\n").map((para, i) => (
                                <p key={i}>{para.trim()}</p>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {item.paperPath && (
                        item.downloadOnly ? (
                          <a
                            href={item.paperPath}
                            download
                            className={`inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition border border-blue-900 rounded px-4 py-2 hover:border-blue-500 w-fit ${firaCode.className}`}
                          >
                            Download Full Paper ↓
                          </a>
                        ) : (
                          <details className="rounded-lg border border-blue-900/30 px-4 py-3">
                            <summary className="cursor-pointer text-sm font-medium text-blue-400 list-none flex justify-between items-center">
                              Full Paper
                              <span>›</span>
                            </summary>
                            <div className="mt-3 space-y-3">
                              {item.paperPath.endsWith(".pdf") ? (
                                <div className="w-full aspect-[4/5] rounded-lg overflow-hidden border border-blue-900/30" style={{ background: "#05070f" }}>
                                  <object data={item.paperPath} type="application/pdf" className="w-full h-full">
                                    <p className="p-4 text-sm text-slate-400">
                                      PDF preview unavailable.{" "}
                                      <a href={item.paperPath} download className="text-blue-400 underline">Download</a>
                                    </p>
                                  </object>
                                </div>
                              ) : (
                                <div className="relative w-full rounded-lg overflow-hidden border border-blue-900/30 min-h-[320px]" style={{ background: "#05070f" }}>
                                  <Image
                                    src={item.paperPath}
                                    alt={`${item.title} paper`}
                                    fill
                                    sizes="(min-width: 1024px) 800px, 100vw"
                                    className="object-contain"
                                    priority
                                  />
                                </div>
                              )}
                              <a href={item.paperPath} download className="text-sm text-blue-400 underline">
                                Download file
                              </a>
                            </div>
                          </details>
                        )
                      )}
                    </div>
                  </article>
                );
              })}
          </div>
        </div>
      </section>

      {/* #43 Section gradient divider */}
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #1e3a8a44 20%, #3b82f644 50%, #1e3a8a44 80%, transparent)" }} />

      {/* TECH CAROUSEL — redesigned (#36-40) */}
      <section id="systems" className="py-12 px-6">
        <div className="max-w-full mx-auto overflow-hidden">
          <p className={`text-blue-400 text-xs uppercase tracking-[0.3em] mb-6 px-6 ${firaCode.className}`}>Tools &amp; Technology</p>
          {/* #40 Edge fades */}
          <div className="relative overflow-hidden group carousel-container">
            <div className="carousel-inner flex gap-4 w-max">
              {[...techCategories, ...techCategories].map(({ label, items, accentColor }, idx) => (
                <div
                  key={`${label}-${idx}`}
                  className="rounded-xl border shrink-0 overflow-hidden transition-all duration-200"
                  style={{
                    background: "#0b0f1a",
                    borderColor: "#1e3a8a",
                    minWidth: "220px",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = accentColor;
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${accentColor}33`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#1e3a8a";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  {/* #36 Colored top accent bar */}
                  <div className="h-[3px] w-full" style={{ background: accentColor }} />
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      {/* #37 Category label */}
                      <p className={`text-xs uppercase tracking-wide ${firaCode.className}`} style={{ color: accentColor }}>
                        {label}
                      </p>
                      {/* #39 Tool count badge */}
                      <span
                        className={`text-xs px-1.5 py-0.5 rounded ${firaCode.className}`}
                        style={{ background: "#ffffff08", color: "#475569" }}
                      >
                        {items.length} tools
                      </span>
                    </div>
                    {/* #38 Item bubbles */}
                    <div className="flex flex-wrap gap-1">
                      {items.map((item) => (
                        <span
                          key={item}
                          className={`text-xs px-2 py-0.5 rounded ${firaCode.className}`}
                          style={{ background: "#ffffff06", color: "#94a3b8", border: "1px solid #1e293b" }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* #43 Section gradient divider */}
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #1e3a8a44 20%, #3b82f644 50%, #1e3a8a44 80%, transparent)" }} />

      {/* #46 Pre-footer "Collaborate" CTA */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div
            className="rounded-2xl p-px"
            style={{
              background: "linear-gradient(135deg, #3b82f644, #06b6d444, #6366f144, #3b82f644)",
            }}
          >
            <div className="rounded-2xl px-8 py-12 space-y-6" style={{ background: "#0b0f1a" }}>
              <p className={`text-blue-400 text-xs uppercase tracking-[0.3em] ${firaCode.className}`}>Let&apos;s Collaborate</p>
              <h2 className="text-3xl font-light text-white">Interested in research collaboration?</h2>
              <p className="text-slate-400 max-w-md mx-auto">
                I&apos;m open to research partnerships, clinical data collaborations, and discussions about computational epidemiology and AI in medicine.
              </p>
              <a
                href="mailto:mishra.ayan1@gmail.com"
                className={`btn-shimmer inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all ${firaCode.className}`}
                style={{ background: "#3b82f6", color: "#fff" }}
              >
                Get in Touch →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="py-12 px-6 relative"
        style={{ borderTop: "none" }}
      >
        {/* #50 Footer gradient top border */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, #3b82f655 30%, #06b6d455 50%, #3b82f655 70%, transparent)" }}
        />
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <span className={`text-sm text-slate-600 ${firaCode.className}`}>Ayan Mishra · Computational Health Research</span>
            <a href="mailto:mishra.ayan1@gmail.com" className="text-sm text-blue-400 hover:text-blue-300 transition">
              mishra.ayan1@gmail.com
            </a>
          </div>

          {/* #47 Social links as icon pills */}
          <div className="flex items-center gap-3 flex-wrap mb-6">
            <a
              href="https://github.com/ayan-mishra"
              target="_blank"
              rel="noreferrer"
              className={`flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition border rounded-full px-4 py-1.5 hover:border-blue-500 ${firaCode.className}`}
              style={{ borderColor: "#1e3a8a" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/ayanmishra-/"
              target="_blank"
              rel="noreferrer"
              className={`flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition border rounded-full px-4 py-1.5 hover:border-blue-500 ${firaCode.className}`}
              style={{ borderColor: "#1e3a8a" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
          </div>

        </div>
      </footer>
    </main>
    </>
  );
}
