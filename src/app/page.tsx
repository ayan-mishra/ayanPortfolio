'use client';

import { useState } from "react";
import Image from "next/image";
import { Fira_Code, Inter } from "next/font/google";

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
};

const researchItems: ResearchItem[] = [
  {
    title: "Disability and Predicted 10-Year ASCVD Risk in U.S. Adults: Evidence from NHANES 2005–2018",
    venue: "American Journal of Preventive Medicine",
    status: "Pending Publication",
    category: "research",
    dataset: "NHANES 2005–2018",
    summary:
      "Mobility-related disability is independently associated with substantially higher predicted 10-year ASCVD risk. Using survey-weighted regression on 23,506 NHANES participants aged 40–79, we show disability predicts higher odds of clinically meaningful ASCVD thresholds, highlighting an underrecognized cardiovascular risk marker.",
    abstract: `Introduction: Adults with disabilities experience a disproportionate burden of cardiometabolic risk factors, yet disability status remains underreported in cardiovascular research. Population-level estimates of predicted atherosclerotic cardiovascular disease (ASCVD) risk in this group are limited.
Methods: We analyzed data from 23,506 adults aged 40-79 years with complete Pooled Cohort Equation (PCE) data in the 2005-2018 National Health and Nutrition Examination Survey (NHANES). Disability was defined as the presence of at least one self-reported mobility-related limitation (use of walking equipment, difficulty climbing ten steps, or difficulty stooping, crouching, or kneeling). Predicted 10-year ASCVD risk was calculated using the 2013 ACC/AHA PCEs. Survey-weighted analyses generated nationally representative estimates. Linear regression models adjusted for age, sex, and race/ethnicity.
Results: Among participants, 7,928 (33.7% unweighted) were classified as having a disability. Adults with disability were older and had higher prevalence of diabetes, current smoking, and antihypertensive medication use. Mean predicted 10-year ASCVD risk was higher among disabled compared with non-disabled adults (14.98% vs 7.66%, p<0.001). In linear models adjusting for age, sex, and race/ethnicity, disability remained associated with higher predicted 10-year ASCVD risk (beta = 1.75%, 95% CI: 1.30-2.19%, p<0.001). Disability also predicted higher odds of ASCVD >= 7.5% (OR 2.33; 95% CI: 1.79-3.02) and >= 20% (OR 4.22; 95% CI: 1.57-11.37). At the mean sample age (60 years), the predicted probability of ASCVD risk >= 7.5% was 33.2% for adults with disability compared with 17.6% for those without.
Conclusions: Adults with disability have substantially higher predicted ASCVD risk as estimated by standard risk prediction models. Disability also predicts higher odds of clinically meaningful ASCVD thresholds (>=7.5% and >=20%), with predicted probabilities at age 60 of 33.2% versus 17.6%. These findings highlight disability as an underrecognized marker of elevated cardiovascular risk and underscore the importance of inclusive prevention strategies.`,
    metrics: [
      { label: "Study Population", value: "23,506" },
      { label: "Disability Prevalence", value: "33.7%" },
      { label: "Mean Risk Delta", value: "+7.32%" },
      { label: "OR (ASCVD ≥7.5%)", value: "2.33" },
    ],
  },
  {
    title: "Improving Pediatric Pneumonia Detection with Synthetic X-ray Augmentation",
    venue: "Research Project",
    category: "research",
    summary:
      "Fine-tuned latent diffusion models to generate synthetic pediatric chest X-rays for dataset augmentation. The optimal model combining real data with 50% synthetic images improved overall accuracy from 88% to 90.2%, primarily by enhancing detection of healthy cases without compromising pneumonia identification.",
    paperPath: "/WRSEF_Entire_Project.pdf",
    techStack: ["PyTorch", "Stable Diffusion", "DenseNet", "Python", "Hugging Face"],
    metrics: [
      { label: "Accuracy Gain", value: "+2.2%" },
      { label: "Synthetic Ratio", value: "50%" },
      { label: "Base Accuracy", value: "88%" },
    ],
  },
  {
    title: "COVID-19 and Shifted Adolescent Suicide Vulnerability",
    venue: "Research Project",
    category: "research",
    dataset: "YRBS 2019–2021",
    summary:
      "Using a nationally representative sample of 45,674 U.S. students aged 13–18, this study quantified how COVID-19 reshaped suicidal ideation probability via a Protective Factor Index. Previously moderately-protected students showed the largest relative increases post-pandemic.",
    abstract: `The COVID-19 pandemic significantly altered patterns of adolescent suicidal ideation, yet quantitative evidence of how vulnerability shifted is limited. Using a nationally representative sample of 45,674 U.S. students aged 13-18, this study examined pre- and post-pandemic changes in suicidal ideation probability. A Protective Factor Index (PFI) was calculated for each student, integrating mental health indicators, substance use, and social stressors; lower PFI values indicate higher vulnerability. Logistic regression modeled suicidal ideation as a function of PFI, pandemic period, and their interaction. Pre-pandemic, students with the lowest PFI (highest vulnerability) had a 37.5% baseline probability of suicidal ideation, with a slope of 0.103 across PFI, indicating decreasing probability with increasing protective factors. Post-pandemic, the baseline probability increased to 50%, and the slope steepened to 0.308, reflecting a 199% amplification of risk trends. The curves intersected at a PFI of 5, showing that previously moderately protected adolescents experienced disproportionate increases in vulnerability. Odds ratios reveal that post-COVID, adolescents in the lowest PFI tertile were 2.03 times more likely to report suicidal ideation compared with pre-pandemic levels, while moderate- and high-PFI groups showed smaller relative increases (OR = 1.57-1.33). These findings indicate that COVID-19 did not uniformly increase adolescent suicide risk but reshaped the vulnerability distribution, with previously moderately protected and low-protection students becoming significantly more susceptible.`,
    paperPath: "/HOSAposter.png",
    metrics: [
      { label: "Study Population", value: "45,674" },
      { label: "Risk Amplification", value: "199%" },
      { label: "Baseline OR (low PFI)", value: "2.03x" },
    ],
  },
  {
    title: "Momentum",
    venue: "Product Launch",
    category: "systems",
    summary:
      "AI-powered habit tracking and goal execution platform. Combines gamification (XP, levels, streaks), LLM-based coaching, and behavioral analytics into a full-stack productivity system built for sustained behavior change.",
    link: "https://momentum-frontend-b1je.onrender.com/",
    techStack: ["React", "TypeScript", "Node.js", "Tailwind CSS", "REST APIs", "LLM Integration"],
  },
];

const techCategories = [
  { label: "Data", items: ["Python", "Pandas", "NumPy", "R", "SQL"] },
  { label: "Machine Learning", items: ["PyTorch", "Scikit-learn", "Stable Diffusion", "DenseNet", "Hugging Face"] },
  { label: "Research Datasets", items: ["NHANES", "YRBS", "Pooled Cohort Equations", "Epidemiology", "Statistical Modeling"] },
  { label: "Infrastructure", items: ["Next.js", "Node.js", "REST APIs", "Cloud Deployment", "Git"] },
];

const pipelineSteps = [
  { label: "Dataset Acquisition", detail: "NHANES ingestion" },
  { label: "Data Cleaning", detail: "Clinical variable extraction" },
  { label: "Feature Engineering", detail: "Risk factor modeling" },
  { label: "Model Training", detail: "Regression / ML pipeline" },
  { label: "Validation", detail: "Survey-weighted analysis" },
  { label: "Publication", detail: "Peer review" },
];

function EcgViz() {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-6">
      <div className="absolute top-4 left-4">
        <span className={`text-xs text-blue-400/60 ${firaCode.className}`}>ASCVD RISK MODEL</span>
      </div>
      <div className="absolute bottom-4 right-4">
        <span className={`text-xs text-blue-400/60 ${firaCode.className}`}>n = 23,506</span>
      </div>
      <svg viewBox="0 0 400 160" className="w-full max-w-md">
        {[0, 1, 2, 3].map((i) => (
          <line key={i} x1="0" y1={i * 53} x2="400" y2={i * 53} stroke="#1e3a8a" strokeWidth="0.5" strokeDasharray="4 6" />
        ))}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <line key={i} x1={i * 57} y1="0" x2={i * 57} y2="160" stroke="#1e3a8a" strokeWidth="0.5" strokeDasharray="4 6" />
        ))}
        <path
          d="M 0,80 L 35,80 L 50,30 L 65,130 L 80,80 L 110,80 L 125,50 L 140,110 L 155,80 L 195,80 L 210,30 L 225,130 L 240,80 L 270,80 L 285,50 L 300,110 L 315,80 L 355,80 L 370,30 L 385,130 L 400,80"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="ecg-path"
        />
        <path
          d="M 0,80 L 35,80 L 50,30 L 65,130 L 80,80 L 110,80 L 125,50 L 140,110 L 155,80 L 195,80 L 210,30 L 225,130 L 240,80 L 270,80 L 285,50 L 300,110 L 315,80 L 355,80 L 370,30 L 385,130 L 400,80"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.12"
          className="ecg-path"
          style={{ animationDelay: "0.04s" }}
        />
      </svg>
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<"research" | "systems">("research");

  return (
    <main className={`min-h-screen text-[#e5e7eb] ${inter.className}`} style={{ background: "#05070f" }}>
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(#3b82f618 1px, transparent 1px)", backgroundSize: "40px 40px" }}
      />

      <nav
        className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{ background: "#05070fcc", borderColor: "#1e3a8a55", backdropFilter: "blur(12px)" }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className={`text-blue-400 tracking-widest text-sm ${firaCode.className}`}>AYAN MISHRA</span>
          <div className={`flex gap-6 text-sm text-slate-400 ${firaCode.className}`}>
            <a href="#research" className="hover:text-blue-400 transition">Research</a>
            <a href="#pipeline" className="hover:text-blue-400 transition">Pipeline</a>
            <a href="#systems" className="hover:text-blue-400 transition">Systems</a>
          </div>
        </div>
      </nav>

      <section className="relative min-h-screen flex items-center pt-20 px-6">
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-3">
              <p className={`text-blue-400 text-xs uppercase tracking-[0.3em] ${firaCode.className}`}>Computational Health Research</p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight text-white leading-[1.08]">
                Ayan<br />
                <span className="font-semibold" style={{ color: "#3b82f6" }}>Mishra</span>
              </h1>
              <p className="text-slate-400 text-base font-light">AI &amp; Biomedical Data Science</p>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-lg">
              Developing machine learning systems for clinical risk prediction using large-scale health datasets. Research focuses on cardiovascular outcomes in underrepresented populations using NHANES.
            </p>
            <div className="flex gap-4 flex-wrap">
              <a
                href="#research"
                className="px-5 py-2.5 text-sm font-medium rounded transition"
                style={{ background: "#3b82f6", color: "#fff" }}
              >
                View Research
              </a>
              <a
                href="#systems"
                className="px-5 py-2.5 text-sm font-medium rounded border transition hover:border-blue-500 hover:text-blue-200"
                style={{ borderColor: "#1e3a8a", color: "#93c5fd" }}
              >
                View Systems
              </a>
            </div>
          </div>

          <div
            className="relative h-[280px] lg:h-[340px] rounded-2xl overflow-hidden border"
            style={{ background: "#0b0f1a", borderColor: "#1e3a8a55" }}
          >
            <EcgViz />
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <p className={`text-blue-400 text-xs uppercase tracking-[0.3em] ${firaCode.className}`}>Research Statement</p>
          <p className="text-xl sm:text-2xl font-light text-slate-300 leading-relaxed">
            My work focuses on applying machine learning to large-scale biomedical datasets to identify predictors of cardiovascular disease. I am particularly interested in improving risk prediction for underrepresented clinical populations.
          </p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <p className={`text-blue-400 text-xs uppercase tracking-[0.3em] mb-8 ${firaCode.className}`}>Primary Research Dataset</p>
          <div
            className="rounded-2xl border p-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
            style={{ background: "#0b0f1a", borderColor: "#1e3a8a55" }}
          >
            <div className="space-y-5">
              <div>
                <h3 className="text-2xl font-semibold text-white">NHANES Dataset</h3>
                <p className="text-blue-400 text-sm mt-1">National Health and Nutrition Examination Survey · CDC</p>
              </div>
              <p className="text-slate-400 leading-relaxed text-sm">
                National longitudinal health dataset used to model cardiovascular risk across disability status in U.S. adults aged 40–79 across four survey cycles (2005–2018).
              </p>
              <ul className="space-y-2">
                {[
                  "23,506 participants analyzed",
                  "Four survey cycles: 2005–2018",
                  "Clinical, laboratory & questionnaire data",
                  "CDC-backed nationally representative sample",
                  "Pooled Cohort Equations applied for ASCVD estimation",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#3b82f6" }} />
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#research" className={`text-blue-400 text-sm hover:text-blue-300 transition ${firaCode.className}`}>
                View Research Project →
              </a>
            </div>

            <div
              className="rounded-xl border p-5 space-y-4"
              style={{ background: "#05070f", borderColor: "#1e3a8a44" }}
            >
              <p className={`text-xs text-blue-400/70 ${firaCode.className}`}>ASCVD RISK DISTRIBUTION</p>
              {[
                { label: "Disabled — mean 10yr risk", value: 14.98, max: 40, color: "#3b82f6" },
                { label: "Non-disabled — mean 10yr risk", value: 7.66, max: 40, color: "#1d4ed8" },
                { label: "ASCVD ≥7.5% — disabled", value: 33.2, max: 100, color: "#60a5fa" },
                { label: "ASCVD ≥7.5% — non-disabled", value: 17.6, max: 100, color: "#93c5fd" },
              ].map(({ label, value, max, color }) => (
                <div key={label} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">{label}</span>
                    <span style={{ color }}>{value}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full" style={{ background: "#1e3a8a33" }}>
                    <div className="h-1.5 rounded-full transition-all" style={{ width: `${(value / max) * 100}%`, background: color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="pipeline" className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <p className={`text-blue-400 text-xs uppercase tracking-[0.3em] mb-12 ${firaCode.className}`}>Research Pipeline</p>
          <div className="relative">
            <div
              className="hidden md:block absolute top-5 left-[8.33%] right-[8.33%] h-px"
              style={{ background: "linear-gradient(90deg, #1e3a8a, #3b82f6, #1e3a8a)" }}
            />
            <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
              {pipelineSteps.map((step, i) => (
                <div key={step.label} className="flex flex-col items-center text-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-semibold relative z-10"
                    style={{ background: "#0b0f1a", borderColor: "#3b82f6", color: "#3b82f6" }}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-200">{step.label}</p>
                    <p className={`text-xs mt-1 ${firaCode.className}`} style={{ color: "#60a5fa88" }}>{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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
              .filter((item) => item.category === activeTab)
              .map((item) => (
                <article
                  key={item.title}
                  className="rounded-xl border p-6 sm:p-8 transition-all duration-300"
                  style={{ background: "#0b0f1a", borderColor: "#1e3a8a" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#3b82f6";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(59,130,246,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#1e3a8a";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <div className="flex flex-col gap-5">
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
                          className="text-sm text-blue-400 hover:text-blue-300 transition shrink-0"
                        >
                          Visit →
                        </a>
                      )}
                    </div>

                    <p className="text-slate-400 text-sm leading-relaxed">{item.summary}</p>

                    {item.metrics && (
                      <div className="flex gap-8 flex-wrap">
                        {item.metrics.map((m) => (
                          <div key={m.label}>
                            <p className="text-2xl font-semibold text-white">{m.value}</p>
                            <p className={`text-xs text-slate-500 mt-0.5 ${firaCode.className}`}>{m.label}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {item.techStack && (
                      <div className="flex flex-wrap gap-2">
                        {item.techStack.map((t) => (
                          <span
                            key={t}
                            className={`text-xs px-2.5 py-1 rounded ${firaCode.className}`}
                            style={{ background: "#1e3a8a33", color: "#93c5fd" }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    {item.abstract && (
                      <details className="rounded-lg border border-blue-900/30 px-4 py-3">
                        <summary className="cursor-pointer text-sm font-medium text-blue-400 list-none flex justify-between items-center">
                          Abstract
                          <span>›</span>
                        </summary>
                        <div className="mt-3 text-sm text-slate-400 leading-relaxed space-y-3">
                          {item.abstract.split("\n").map((para, i) => (
                            <p key={i}>{para.trim()}</p>
                          ))}
                        </div>
                      </details>
                    )}

                    {item.paperPath && (
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
                    )}
                  </div>
                </article>
              ))}
          </div>
        </div>
      </section>

      <section id="systems" className="py-16 px-6">
        <div className="max-w-6xl mx-auto space-y-8">
          <p className={`text-blue-400 text-xs uppercase tracking-[0.3em] ${firaCode.className}`}>Tools &amp; Technology</p>
          <div className="space-y-6">
            {techCategories.map(({ label, items }) => (
              <div key={label}>
                <p className={`text-xs text-slate-500 mb-3 uppercase tracking-widest ${firaCode.className}`}>{label}</p>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span
                      key={item}
                      className={`text-sm px-3 py-1.5 rounded-full border transition-all duration-200 cursor-default ${firaCode.className}`}
                      style={{ background: "#0b0f1a", borderColor: "#1e3a8a", color: "#93c5fd" }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "#3b82f6";
                        (e.currentTarget as HTMLElement).style.boxShadow = "0 0 12px rgba(59,130,246,0.3)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "#1e3a8a";
                        (e.currentTarget as HTMLElement).style.boxShadow = "none";
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t" style={{ borderColor: "#1e3a8a33" }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <span className={`text-sm text-slate-600 ${firaCode.className}`}>Ayan Mishra · Computational Health Research</span>
          <a href="mailto:mishra.ayan1@gmail.com" className="text-sm text-blue-400 hover:text-blue-300 transition">
            mishra.ayan1@gmail.com
          </a>
        </div>
      </footer>
    </main>
  );
}
