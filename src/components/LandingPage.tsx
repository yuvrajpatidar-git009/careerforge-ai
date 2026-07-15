import React, { useState } from "react";
import { 
  FileText, 
  Globe, 
  Linkedin, 
  Github, 
  Mail, 
  ArrowRight, 
  Sparkles, 
  Menu, 
  X, 
  ShieldCheck, 
  Zap, 
  Briefcase,
  GraduationCap
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { AppView } from "../types";

interface LandingPageProps {
  setView: (view: AppView) => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export default function LandingPage({ setView, theme, toggleTheme }: LandingPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Bento features list
  const bentoFeatures = [
    {
      id: "resume",
      title: "AI Resume Builder",
      description: "Instantly build ATS-friendly resumes tailored to specific roles with smart phrasing recommendations and industry keyword injection.",
      icon: FileText,
      color: "from-indigo-500 to-blue-600",
      accent: "text-indigo-500",
      size: "md:col-span-3",
    },
    {
      id: "portfolio",
      title: "Portfolio Generator",
      description: "Convert your profile and projects into an elegant, responsive portfolio layout and bio guide in seconds.",
      icon: Globe,
      color: "from-violet-500 to-purple-600",
      accent: "text-violet-500",
      size: "md:col-span-3",
    },
    {
      id: "linkedin",
      title: "LinkedIn Optimizer",
      description: "Transform your profile summary and headline into a magnetic recruiter trap that highlights your top achievements.",
      icon: Linkedin,
      color: "from-blue-600 to-cyan-500",
      accent: "text-blue-500",
      size: "md:col-span-2",
    },
    {
      id: "readme",
      title: "GitHub README Builder",
      description: "Create stunning open-source project READMEs containing beautiful badges, architecture maps, and usage guides.",
      icon: Github,
      color: "from-slate-800 to-slate-900",
      accent: "text-slate-400",
      size: "md:col-span-2",
    },
    {
      id: "coverletter",
      title: "Cover Letter Creator",
      description: "Generate highly persuasive, custom-tailored cover letters for your dream companies in seconds.",
      icon: Mail,
      color: "from-rose-500 to-orange-500",
      accent: "text-rose-500",
      size: "md:col-span-2",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      
      {/* BACKGROUND DECORATIONS */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none overflow-hidden z-0 opacity-40">
        <div className="absolute top-[-20%] left-[10%] w-[350px] h-[350px] rounded-full bg-indigo-400/30 blur-[100px] dark:bg-indigo-600/20" />
        <div className="absolute top-[10%] right-[10%] w-[400px] h-[400px] rounded-full bg-cyan-400/20 blur-[120px] dark:bg-cyan-500/10" />
      </div>

      {/* HEADER NAVBAR */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/75 dark:bg-slate-950/50 border-b border-slate-200/80 dark:border-white/10 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setView("landing")} id="logo-container">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-violet-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
              CareerForge AI
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <a href="#features" className="text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-white transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-white transition-colors">
              How It Works
            </a>
            <a href="#pricing" className="text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-white transition-colors">
              Pricing
            </a>
          </nav>

          {/* CTAs and Toggle */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/5 border border-slate-200/55 dark:border-white/10 transition-colors"
              aria-label="Toggle Theme"
              id="theme-toggle-landing"
            >
              {theme === "light" ? (
                <span className="text-sm font-medium">🌙 Dark</span>
              ) : (
                <span className="text-sm font-medium">☀️ Light</span>
              )}
            </button>
            <button 
              onClick={() => setView("auth")}
              className="hidden md:block text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors px-4 py-2"
              id="landing-signin-btn"
            >
              Login
            </button>
            <button 
              onClick={() => setView("auth")}
              className="px-4 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white rounded-full transition-all shadow-lg shadow-indigo-500/20"
              id="landing-getstarted-btn"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Hamburguer Button */}
          <div className="flex items-center md:hidden space-x-2">
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-full text-slate-500 dark:text-slate-400 border border-slate-200/60 dark:border-white/10"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE NAV PANEL */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-slate-200 dark:border-white/10 bg-white dark:bg-slate-950/95 overflow-hidden backdrop-blur-md"
          >
            <div className="px-4 pt-2 pb-6 space-y-3">
              <a 
                href="#features" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-full text-base font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5"
              >
                Features
              </a>
              <a 
                href="#how-it-works" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-full text-base font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5"
              >
                How It Works
              </a>
              <a 
                href="#pricing" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-full text-base font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5"
              >
                Pricing
              </a>
              <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex flex-col space-y-2">
                <button 
                  onClick={() => { setMobileMenuOpen(false); setView("auth"); }}
                  className="w-full text-center py-2 text-base font-medium text-slate-700 dark:text-slate-400"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => { setMobileMenuOpen(false); setView("auth"); }}
                  className="w-full text-center py-2.5 rounded-full text-base font-medium text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-500/20"
                >
                  Get Started
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 px-4 sm:px-6 lg:px-8 z-10 max-w-7xl mx-auto">
        <div className="text-center space-y-6 max-w-4xl mx-auto mb-16">
          
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-400 tracking-wider uppercase"
          >
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>Next-Gen Career Intelligence</span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-6.5xl font-bold leading-[1.1] tracking-tight text-slate-900 dark:text-white"
          >
            Build Your Career. <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 italic font-serif">
              Build Your Brand.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto font-normal leading-relaxed"
          >
            Generate ATS resumes, portfolios, LinkedIn profiles, and Cover Letters in seconds using advanced LLMs.
          </motion.p>

          {/* Hero CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <button 
              onClick={() => setView("auth")}
              className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full text-sm font-semibold transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center space-x-2 cursor-pointer group"
              id="hero-primary-cta"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a 
              href="#features"
              className="w-full sm:w-auto px-6 py-3 rounded-full text-sm font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200/80 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10 dark:border-white/10 flex items-center justify-center transition-all"
            >
              Explore Tools
            </a>
          </motion.div>
          
          {/* Quick Stats Badges */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 pt-6 text-xs text-slate-500 dark:text-slate-400"
          >
            <div className="flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>ATS-Scored Optimization</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Vite-Powered Generation</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <GraduationCap className="w-4 h-4 text-violet-500" />
              <span>Built for Developers & Students</span>
            </div>
          </motion.div>
        </div>

        {/* HERO VISUAL MOCKUP */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 50 }}
          className="relative max-w-5xl mx-auto"
          id="hero-mockup-wrapper"
        >
          {/* Glowing aura */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 blur-3xl -z-10 rounded-2xl" />

          {/* Mockup Frame */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-slate-950/60 p-4 shadow-2xl backdrop-blur-md">
            
            {/* Top Toolbar */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-white/10 mb-4 text-slate-400 text-xs">
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-400" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <div className="px-4 py-1 rounded-md bg-slate-100 dark:bg-slate-900 max-w-sm w-44 sm:w-64 text-center truncate">
                careerforge.ai/dashboard
              </div>
              <div className="w-8" />
            </div>

            {/* Dashboard Mock Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-[300px] sm:h-[420px] overflow-hidden text-left">
              
              {/* Sidebar Rail */}
              <div className="hidden md:block md:col-span-3 space-y-4 border-r border-slate-200/60 dark:border-white/10 pr-4">
                <div className="flex items-center space-x-2 p-2 rounded-xl bg-indigo-50/50 dark:bg-white/5 border dark:border-white/10">
                  <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-white text-xs">
                    Y
                  </div>
                  <div className="truncate">
                    <div className="font-semibold text-slate-800 dark:text-slate-200 text-xs">Yuvraj Patidar</div>
                    <div className="text-[10px] text-slate-500 truncate">patidaryuvraj431@gmail.com</div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="h-7 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center px-2.5 text-[11px] font-medium">
                    <Sparkles className="w-3.5 h-3.5 mr-2" />
                    AI Resume
                  </div>
                  <div className="h-7 rounded-lg text-slate-500 dark:text-slate-400 flex items-center px-2.5 text-[11px]">
                    <Globe className="w-3.5 h-3.5 mr-2" />
                    Portfolio Generator
                  </div>
                  <div className="h-7 rounded-lg text-slate-500 dark:text-slate-400 flex items-center px-2.5 text-[11px]">
                    <Linkedin className="w-3.5 h-3.5 mr-2" />
                    LinkedIn Optimizer
                  </div>
                  <div className="h-7 rounded-lg text-slate-500 dark:text-slate-400 flex items-center px-2.5 text-[11px]">
                    <Github className="w-3.5 h-3.5 mr-2" />
                    GitHub README
                  </div>
                </div>
              </div>

              {/* Main Content Preview */}
              <div className="col-span-1 md:col-span-9 flex flex-col space-y-4 pl-0 md:pl-2">
                <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-500/15 via-violet-500/10 to-transparent border border-indigo-100/50 dark:border-indigo-900/30">
                  <h3 className="font-display font-semibold text-sm sm:text-base text-slate-800 dark:text-white flex items-center">
                    <Sparkles className="w-4 h-4 text-indigo-500 mr-2" />
                    Generate ATS-Scored Resume in 1-Click
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Enter your skills, experience, and the role you are targeting to forge a customized resume.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                  
                  {/* Left Column: Input Form Mock */}
                  <div className="border border-slate-200/80 dark:border-slate-800/80 rounded-xl p-3 bg-white/50 dark:bg-slate-900/50 space-y-2.5 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div>
                        <span className="text-[10px] font-semibold text-slate-500">Target Role</span>
                        <div className="h-8 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200/50 dark:border-slate-700/50 flex items-center px-2.5 text-xs text-slate-400">
                          Full-Stack Software Engineer
                        </div>
                      </div>
                      <div>
                        <span className="text-[10px] font-semibold text-slate-500">Key Skills (Comma Separated)</span>
                        <div className="h-8 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200/50 dark:border-slate-700/50 flex items-center px-2.5 text-xs text-slate-400 truncate">
                          React, TypeScript, Node.js, Tailwind, Docker, PostgreSQL
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => setView("auth")}
                      className="w-full h-8 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-[11px] font-medium text-white flex items-center justify-center space-x-1 shadow-md shadow-indigo-500/10"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Forge Resume</span>
                    </button>
                  </div>

                  {/* Right Column: Dynamic Preview Mock */}
                  <div className="border border-slate-200/80 dark:border-slate-800/80 rounded-xl p-3 bg-slate-900 text-slate-100 font-mono text-[10px] leading-relaxed flex flex-col justify-between">
                    <div className="space-y-1 overflow-hidden opacity-90">
                      <div className="text-indigo-400 font-semibold"># Yuvraj Patidar</div>
                      <div className="text-slate-400">Full-Stack Software Engineer</div>
                      <div className="h-[1px] bg-slate-800 my-1" />
                      <div className="text-slate-300 font-semibold">## Professional Summary</div>
                      <div className="text-slate-400 text-[9px] line-clamp-4 leading-tight">
                        Highly collaborative software engineer with solid experience in TypeScript, React 19, and full-stack API optimization...
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[9px] text-slate-500 pt-1 border-t border-slate-800/80">
                      <span>ATS Score: 98/100</span>
                      <span className="text-emerald-400">✓ Optimized</span>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </section>

      {/* BENTO BOX FEATURES SECTION */}
      <section id="features" className="py-20 bg-slate-100/50 dark:bg-slate-900/30 border-y border-slate-200/50 dark:border-slate-800/50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              AI Tools Customized for the Tech Industry
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Each component is fine-tuned to help you stand out to recruiting systems, engineering managers, and technical founders alike.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            {bentoFeatures.map((feat, index) => {
              const IconComp = feat.icon;
              return (
                <motion.div
                  key={feat.id}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                  className={`relative overflow-hidden rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/85 dark:bg-white/5 p-6 sm:p-8 flex flex-col justify-between group shadow-md hover:shadow-lg transition-all backdrop-blur-xl ${feat.size}`}
                >
                  {/* Glowing background gradient inside the card on hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/0 via-violet-500/0 to-cyan-500/0 group-hover:from-indigo-500/5 group-hover:to-cyan-500/5 transition-all duration-300 pointer-events-none" />

                  <div className="space-y-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${feat.color} flex items-center justify-center text-white shadow-md`}>
                      <IconComp className="w-6 h-6" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center">
                        {feat.title}
                        <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-indigo-500" />
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {feat.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 mt-auto">
                    <button 
                      onClick={() => setView("auth")}
                      className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:underline flex items-center"
                    >
                      <span>Try {feat.title} now</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="font-display text-3xl font-extrabold text-slate-900 dark:text-white">
            Three Steps to Career Accelerations
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Skip hours of tedious drafting and formatting. Forge your brand efficiently and scientifically.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="space-y-4 p-6">
            <div className="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-lg mx-auto border border-indigo-200 dark:border-indigo-900">
              1
            </div>
            <h3 className="font-display font-bold text-lg text-slate-800 dark:text-white">Choose Your Tool</h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Select AI Resume Builder, Portfolio layout guide, LinkedIn bio developer, or Cover Letter generation.
            </p>
          </div>

          <div className="space-y-4 p-6">
            <div className="w-12 h-12 rounded-full bg-violet-50 dark:bg-violet-950 text-violet-600 dark:text-violet-400 flex items-center justify-center font-bold text-lg mx-auto border border-violet-200 dark:border-violet-900">
              2
            </div>
            <h3 className="font-display font-bold text-lg text-slate-800 dark:text-white">Enter Core Profile</h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Provide brief input: past projects, technical stack, or your target company goals.
            </p>
          </div>

          <div className="space-y-4 p-6">
            <div className="w-12 h-12 rounded-full bg-cyan-50 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold text-lg mx-auto border border-cyan-200 dark:border-cyan-900">
              3
            </div>
            <h3 className="font-display font-bold text-lg text-slate-800 dark:text-white">Forge & Deploy</h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Generate ATS-optimized resumes and high-converting cover letters, copy them instantly, or download in Markdown.
            </p>
          </div>

        </div>
      </section>

      {/* PRICING PLANS SECTION */}
      <section id="pricing" className="py-20 bg-slate-100/50 dark:bg-slate-900/30 border-t border-slate-200/50 dark:border-slate-800/50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="font-display text-3xl font-extrabold text-slate-900 dark:text-white">
              SaaS Pricing For Everyone
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Start with our powerful free tools, then unlock advanced features as you launch your job applications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Free Plan */}
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur-xl p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Free Tier</span>
                <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Student Builder</h3>
                <p className="text-xs text-slate-500">Perfect for exploring the platform and crafting initial materials.</p>
                <div className="flex items-baseline pt-2">
                  <span className="text-4xl font-extrabold text-slate-900 dark:text-white">$0</span>
                  <span className="text-xs text-slate-400 ml-2">/ forever</span>
                </div>
                <div className="h-[1px] bg-slate-200 dark:bg-white/10 my-4" />
                <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
                  <li className="flex items-center space-x-2">
                    <span className="text-indigo-500">✓</span>
                    <span>3 AI Resume Generations per month</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-indigo-500">✓</span>
                    <span>1 Portfolio configuration guide</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-indigo-500">✓</span>
                    <span>Standard LinkedIn Headline optimization</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-indigo-500">✓</span>
                    <span>Export to Markdown format</span>
                  </li>
                </ul>
              </div>
              <button 
                onClick={() => setView("auth")}
                className="w-full py-2.5 rounded-full border border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-xs font-semibold transition-colors"
              >
                Get Started Free
              </button>
            </div>

            {/* Pro Plan */}
            <div className="rounded-2xl border-2 border-indigo-600 dark:border-indigo-500/50 bg-white dark:bg-white/5 backdrop-blur-xl p-8 flex flex-col justify-between space-y-6 relative shadow-lg shadow-indigo-500/15">
              <div className="absolute top-0 right-6 -translate-y-1/2 px-3 py-1 bg-gradient-to-r from-indigo-600 to-violet-500 text-white rounded-full text-[10px] font-semibold tracking-wider uppercase shadow-md shadow-indigo-500/20">
                Most Popular
              </div>
              <div className="space-y-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Pro Access</span>
                <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Career Accelerator</h3>
                <p className="text-xs text-slate-500">Fully powered suite for active job seekers sending multi-company applications.</p>
                <div className="flex items-baseline pt-2">
                  <span className="text-4xl font-extrabold text-slate-900 dark:text-white">$15</span>
                  <span className="text-xs text-slate-400 ml-2">/ month</span>
                </div>
                <div className="h-[1px] bg-slate-200 dark:bg-white/10 my-4" />
                <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
                  <li className="flex items-center space-x-2">
                    <span className="text-indigo-500">✓</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">Unlimited AI Generations</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-indigo-500">✓</span>
                    <span>Comprehensive ATS score diagnostics</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-indigo-500">✓</span>
                    <span>10+ Custom Premium Portfolio layouts</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-indigo-500">✓</span>
                    <span>Full recruiter-grade LinkedIn bio writer</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-indigo-500">✓</span>
                    <span>Customizable cover letter templates</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-indigo-500">✓</span>
                    <span>Priority Server Resources</span>
                  </li>
                </ul>
              </div>
              <button 
                onClick={() => setView("auth")}
                className="w-full py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all shadow-md shadow-indigo-500/10"
              >
                Forge Your Success Now
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-white/10 text-slate-500 text-xs py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-base text-slate-900 dark:text-white">
                CareerForge AI
              </span>
            </div>
            <p className="text-slate-400 text-xs max-w-sm">
              We leverage safe, state-of-the-art server-side Gemini models to compile ATS resumes and technical portfolios for the software industry.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-xs tracking-wider uppercase">Product</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="hover:text-indigo-500 transition-colors">AI Resume Builder</a></li>
              <li><a href="#features" className="hover:text-indigo-500 transition-colors">Portfolio Guide</a></li>
              <li><a href="#features" className="hover:text-indigo-500 transition-colors">LinkedIn Optimizer</a></li>
              <li><a href="#features" className="hover:text-indigo-500 transition-colors">GitHub README</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-xs tracking-wider uppercase">Platform</h4>
            <ul className="space-y-2">
              <li><span className="hover:text-indigo-500 cursor-pointer">Privacy Policy</span></li>
              <li><span className="hover:text-indigo-500 cursor-pointer">Terms of Service</span></li>
              <li><span className="hover:text-indigo-500 cursor-pointer">Support Desk</span></li>
              <li><span className="hover:text-indigo-500 cursor-pointer">AI Studio Workspace</span></li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-8 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <span>System Operational</span>
          </div>
          <div>
            &copy; 2026 CareerForge AI Platform
          </div>
          <div className="flex gap-4">
            <span className="hover:text-indigo-400 cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-indigo-400 cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-indigo-400 cursor-pointer transition-colors">Security</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
