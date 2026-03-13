'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { Antic, Fira_Code } from "next/font/google";

const antic = Antic({ weight: "400", subsets: ["latin"] });
const firaCode = Fira_Code({ weight: "700", subsets: ["latin"] });

type Project = {
  title: string;
  venue?: string;
  status?: string;
  summary: string;
  abstract?: string;
  paperPath?: string;
  link?: string;
  techStack?: string[];
};

const stacks = [
  { title: "Languages", items: "Python • TypeScript • JavaScript • SQL • R" },
  { title: "Machine Learning", items: "PyTorch • Diffusion Models • Stable Diffusion • DenseNet • Hugging Face" },
  { title: "Data Science", items: "Logistic Regression • Statistical Modeling • Epidemiology • NHANES / YRBS" },
  { title: "Web Development", items: "React • TypeScript • Tailwind • REST APIs" },
  { title: "Infrastructure", items: "Node.js • Render • Cloud Deployment • Scalable Architecture" },
  { title: "Research Tools", items: "Jupyter • Colab A100 GPUs • Git • Scientific Computing" },
];

const projects: Project[] = [
  {
    title: "Disability and Predicted 10-Year ASCVD Risk in U.S. Adults: Evidence from NHANES 2005-2018",
    venue: "American Journal of Preventive Medicine",
    status: "Pending Publication",
    summary:
      "This work explores how mobility-related disability is linked to higher predicted cardiovascular risk in U.S. adults, highlighting the need for inclusive prevention strategies in research and clinical care.",
    abstract: `Introduction: Adults with disabilities experience a disproportionate burden of cardiometabolic risk factors, yet disability status remains underreported in cardiovascular research. Population-level estimates of predicted atherosclerotic cardiovascular disease (ASCVD) risk in this group are limited.
Methods: We analyzed data from 23,506 adults aged 40-79 years with complete Pooled Cohort Equation (PCE) data in the 2005-2018 National Health and Nutrition Examination Survey (NHANES). Disability was defined as the presence of at least one self-reported mobility-related limitation (use of walking equipment, difficulty climbing ten steps, or difficulty stooping, crouching, or kneeling). Predicted 10-year ASCVD risk was calculated using the 2013 ACC/AHA PCEs. Survey-weighted analyses generated nationally representative estimates. Linear regression models adjusted for age, sex, and race/ethnicity.
Results: Among participants, 7,928 (33.7% unweighted) were classified as having a disability. Adults with disability were older and had higher prevalence of diabetes, current smoking, and antihypertensive medication use. Mean predicted 10-year ASCVD risk was higher among disabled compared with non-disabled adults (14.98% vs 7.66%, p<0.001). In linear models adjusting for age, sex, and race/ethnicity, disability remained associated with higher predicted 10-year ASCVD risk (beta = 1.75%, 95% CI: 1.30-2.19%, p<0.001). In models including disability x sex x age interactions, disability was associated with an increased risk that varied by sex and age, with disabled males showing a smaller age-related increase in risk. Disability also predicted higher odds of ASCVD >= 7.5% (OR 2.33; 95% CI: 1.79-3.02) and >= 20% (OR 4.22; 95% CI: 1.57-11.37). At the mean sample age (60 years), the predicted probability of ASCVD risk >= 7.5% was 33.2% for adults with disability compared with 17.6% for those without.
Conclusions: Adults with disability have substantially higher predicted ASCVD risk as estimated by standard risk prediction models. Disability also predicts higher odds of clinically meaningful ASCVD thresholds (>=7.5% and >=20%), with predicted probabilities at age 60 of 33.2% versus 17.6%. These findings highlight disability as an underrecognized marker of elevated cardiovascular risk and underscore the importance of inclusive prevention strategies.`,
  },
  {
    title: "Improving Pediatric Pneumonia Detection with Synthetic X-ray Augmentation",
    venue: "Research project",
    summary:
      "This project explores how generative AI can address data scarcity in medical imaging. By fine-tuning latent diffusion models to create synthetic pediatric chest X-rays, the study augmented an imbalanced dataset to improve machine learning classification of pneumonia versus healthy lungs. The optimal model, combining real data with 50% synthetic images, improved overall accuracy from 88% to 90.2%, primarily by enhancing detection of healthy cases without compromising pneumonia identification. These results highlight the potential of synthetic data to strengthen medical AI models while respecting privacy and reducing reliance on costly annotations.",
    paperPath: "/WRSEF_Entire_Project.pdf",
  },
  {
    title: "From Low Risk to High Alarm: How COVID-19 Shifted Adolescent Suicide Vulnerability",
    venue: "Research project",
    summary:
      "This study investigates how the COVID-19 pandemic reshaped adolescent suicidal ideation across the United States. Using a nationally representative sample of over 45,000 students aged 13-18, the research quantified shifts in vulnerability by integrating mental health indicators, substance use, and social stressors into a Protective Factor Index (PFI). Findings show that while students with the lowest protective factors remained at high risk, those with previously moderate protection experienced the largest relative increases in suicidal ideation post-pandemic. These results highlight that traditional high-risk screening alone may miss newly vulnerable groups and underscore the need for adaptive, population-level mental health strategies in schools and communities.",
    abstract: `The COVID-19 pandemic significantly altered patterns of adolescent suicidal ideation, yet quantitative evidence of how vulnerability shifted is limited. Using a nationally representative sample of 45,674 U.S. students aged 13-18, this study examined pre- and post-pandemic changes in suicidal ideation probability. A Protective Factor Index (PFI) was calculated for each student, integrating mental health indicators, substance use, and social stressors; lower PFI values indicate higher vulnerability. Logistic regression modeled suicidal ideation as a function of PFI, pandemic period, and their interaction. Pre-pandemic, students with the lowest PFI (highest vulnerability) had a 37.5% baseline probability of suicidal ideation, with a slope of 0.103 across PFI, indicating decreasing probability with increasing protective factors. Post-pandemic, the baseline probability increased to 50%, and the slope steepened to 0.308, reflecting a 199% amplification of risk trends. The curves intersected at a PFI of 5, showing that previously moderately protected adolescents experienced disproportionate increases in vulnerability. Odds ratios reveal that post-COVID, adolescents in the lowest PFI tertile were 2.03 times more likely to report suicidal ideation compared with pre-pandemic levels, while moderate- and high-PFI groups showed smaller relative increases (OR = 1.57-1.33). These findings indicate that COVID-19 did not uniformly increase adolescent suicide risk but reshaped the vulnerability distribution, with previously moderately protected and low-protection students becoming significantly more susceptible. This highlights the urgent need for expanded screening and intervention strategies that target not only traditionally high-risk adolescents but also emergent vulnerable populations exposed to systemic stressors.`,
    paperPath: "/HOSAposter.png",
  },
  {
    title: "Momentum",
    venue: "Product launch",
    summary:
      "AI-powered habit tracking and goal execution platform. Momentum turns long-term goals into consistent daily progress by combining habit tracking, gamification (XP, levels, streaks, achievements), and AI coaching. Users set multi-horizon goals, log activities, and track growth through dashboards that emphasize feedback loops, visible progress, and structured accountability. The system is designed for simplicity, fast goal creation, and low-friction logging while maintaining analytics for sustained motivation.",
    link: "https://momentum-frontend-b1je.onrender.com/",
    techStack: [
      "Frontend: React, TypeScript, Tailwind CSS, Vite/modern bundler",
      "Backend/APIs: Node.js, RESTful APIs, JSON data exchange",
      "Data & State: client-side state for real-time goal updates; persistent storage for goals/activities; progress engine for streaks, XP, completion metrics",
      "AI Features: LLM-based goal coach, prompt-driven feedback, architecture for behavioral analytics/recommendations",
      "Deployment: Cloud hosting on Render with continuous deployment; scalable modular architecture",
      "Development: Git/GitHub, component-driven workflow, modular code for maintainability",
    ],
  },
];

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const sortedProjects = projects;

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <main className={`min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50 ${antic.className}`}>
      <section className="relative min-h-screen flex flex-col justify-center px-6 sm:px-10 pb-24">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.08),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(99,102,241,0.08),transparent_30%)]" />
        <header className="flex items-center justify-between w-full max-w-6xl mx-auto pt-6">
          <div className={`text-2xl tracking-[0.35em] text-slate-300 ${firaCode.className}`}>AYAN</div>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="relative w-16 h-8 rounded-full transition hover:opacity-85 border border-white/10 bg-white/10 backdrop-blur"
          >
            <div
              className="absolute top-1 left-1 w-6 h-6 rounded-full transition-transform duration-300"
              style={{
                transform: isDark ? "translateX(2rem)" : "translateX(0)",
                background: isDark ? "linear-gradient(135deg,#e2e8f0,#cbd5e1)" : "linear-gradient(135deg,#0f172a,#1e293b)",
              }}
            />
          </button>
        </header>
        <div className="relative z-10 max-w-6xl mx-auto text-center mt-10">
          <p className={`text-sm uppercase tracking-[0.35em] text-slate-400 ${firaCode.className}`}>Researcher • Engineer • Builder</p>
          <h1 className="mt-6 leading-[0.85] font-bold text-[72px] sm:text-[110px] md:text-[140px] lg:text-[170px] tracking-tighter text-cyan-200">
            Ayan <span className="text-slate-50">Mishra</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-200 max-w-3xl mx-auto">
            Exploring the intersection of computation, biology, and medicine—building systems that turn data into actionable insight.
          </p>
        </div>
      </section>

      <div className="px-6 sm:px-10 pb-16">
        <div className="max-w-5xl mx-auto space-y-10">
          <header className="space-y-3">
            <p className={`text-sm uppercase tracking-[0.35em] text-slate-400 ${firaCode.className}`}>Projects</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-slate-100">Research & Applied Work</h2>
            <p className="text-base sm:text-lg text-slate-300 max-w-3xl">
              Selected projects spanning clinical prediction, digital phenotyping, and inclusive cardiometabolic prevention.
            </p>
          </header>

          <section className="space-y-4">
            <div>
              <p className={`text-sm uppercase tracking-[0.25em] text-slate-400 ${firaCode.className}`}>Tech Stack & Skills</p>
              <h3 className="text-2xl sm:text-3xl font-semibold text-slate-50 mt-1">Systems that bridge engineering, ML, and research</h3>
              <p className="text-base text-slate-300 max-w-3xl mt-2">
                My work spans software engineering, machine learning, and data-driven research, with projects ranging from full-stack applications to large-scale statistical analyses and generative AI systems. I focus on building systems that combine technical depth with real-world impact, particularly in healthcare, public health, and productivity software.
              </p>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_10px_60px_rgba(0,0,0,0.35)]">
              <div
                className="flex gap-4 py-4 animate-[marquee_26s_linear_infinite] group-hover:[animation-play-state:paused]"
                aria-label="Tech stack carousel"
              >
                {[...stacks, ...stacks].map((stack, idx) => (
                  <div
                    key={`${stack.title}-${idx}`}
                    className="min-w-[220px] sm:min-w-[260px] rounded-xl border border-white/10 bg-black/20 px-4 py-3 shadow-md transition duration-300 hover:scale-105 hover:border-cyan-300/50"
                  >
                    <p className="text-xs uppercase tracking-[0.18em] text-cyan-100 mb-1">{stack.title}</p>
                    <p className="text-sm text-slate-100 leading-relaxed">{stack.items}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="grid gap-6">
            {sortedProjects.map((project) => (
              <article
                key={project.title}
                className="rounded-2xl border border-white/8 bg-white/5 backdrop-blur-md shadow-[0_10px_60px_rgba(0,0,0,0.35)] p-6 sm:p-8 transition hover:border-cyan-300/40 hover:shadow-[0_14px_80px_rgba(45,212,191,0.15)]"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-cyan-200/80">
                        {project.status && <span className={`font-semibold ${firaCode.className}`}>{project.status}</span>}
                        {project.venue && (
                          <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-wide text-slate-200">
                            {project.venue}
                          </span>
                        )}
                      </div>
                      <h2 className="text-xl sm:text-2xl font-semibold leading-tight text-slate-50">{project.title}</h2>
                    </div>
                    {project.link && (
                      <a
                        href={project.link}
                        className="text-sm text-cyan-200 hover:text-cyan-100 underline underline-offset-4"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Visit
                      </a>
                    )}
                  </div>

                  <p className="text-base text-slate-200/90 leading-relaxed">{project.summary}</p>

                  {project.abstract && (
                    <details className="group rounded-xl border border-white/10 bg-black/30 px-4 py-3 hover:border-cyan-300/30">
                      <summary className="cursor-pointer list-none flex items-center justify-between gap-2 text-sm font-semibold text-cyan-100">
                        Abstract
                        <span className="transition group-open:rotate-180">&gt;</span>
                      </summary>
                      <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-200">
                        {project.abstract.split("\n").map((para, i) => (
                          <p key={i}>{para.trim()}</p>
                        ))}
                      </div>
                    </details>
                  )}

                  {project.paperPath && (
                    <details className="group rounded-xl border border-cyan-200/20 bg-cyan-50/5 px-4 py-3 hover:border-cyan-300/40">
                      <summary className="cursor-pointer list-none flex items-center justify-between gap-2 text-sm font-semibold text-cyan-100">
                        Full Paper
                        <span className="transition group-open:rotate-180">&gt;</span>
                      </summary>
                      <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-200">
                        <p>
                          The complete manuscript is available below. Download if you prefer an external reader.
                        </p>
                        {project.paperPath.toLowerCase().endsWith(".pdf") ? (
                          <div className="w-full aspect-[4/5] rounded-lg border border-white/10 overflow-hidden bg-black/40">
                            <object
                              data={project.paperPath}
                              type="application/pdf"
                              className="w-full h-full"
                            >
                              <p className="p-4">
                                PDF preview unavailable.{" "}
                                <a className="underline text-cyan-100" href={project.paperPath} download>
                                  Download the paper
                                </a>
                                .
                              </p>
                            </object>
                          </div>
                        ) : (
                          <div className="relative w-full rounded-lg border border-white/10 overflow-hidden bg-black/40 min-h-[320px]">
                            <Image
                              src={project.paperPath}
                              alt={`${project.title} paper`}
                              fill
                              sizes="(min-width: 1024px) 800px, 100vw"
                              className="object-contain bg-slate-950"
                              priority={true}
                            />
                          </div>
                        )}
                        <div>
                          <a className="underline text-cyan-100" href={project.paperPath} download>
                            Download file
                          </a>
                        </div>
                      </div>
                    </details>
                  )}

                  {project.techStack && (
                    <div className="rounded-xl border border-white/8 bg-white/5 px-4 py-3">
                      <p className="text-sm font-semibold text-cyan-100 mb-2">Tech Stack</p>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-slate-200">
                        {project.techStack.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </section>
        </div>
      </div>
    </main>
  );
}
