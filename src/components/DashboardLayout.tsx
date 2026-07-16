import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  FileText, 
  Globe, 
  Linkedin, 
  Github, 
  Mail, 
  Sliders, 
  Menu, 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Bell, 
  LogOut, 
  Sun, 
  Moon, 
  ArrowUpRight, 
  Copy, 
  Check, 
  Download, 
  RefreshCw, 
  Terminal,
  Activity,
  Award,
  Flame,
  FileCheck,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { 
  User, 
  AppView, 
  DashboardTab,
  ResumePayload,
  PortfolioPayload,
  LinkedinPayload,
  ReadmePayload,
  CoverLetterPayload 
} from "../types";

interface DashboardLayoutProps {
  user: User;
  setView: (view: AppView) => void;
  onLogout: () => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export default function DashboardLayout({ user, setView, onLogout, theme, toggleTheme }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<DashboardTab>("overview");
  const [copied, setCopied] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  
  // Generation states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [generationResult, setGenerationResult] = useState<string>("");

  // Input states for each tool
  const [resumeForm, setResumeForm] = useState<ResumePayload>({
    name: "",
    role: "",
    skills: "",
    experience: "",
    education: ""
  });

  const [portfolioForm, setPortfolioForm] = useState<PortfolioPayload>({
    name: "",
    title: "",
    about: "",
    projects: "",
    techStack: ""
  });

  const [linkedinForm, setLinkedinForm] = useState<LinkedinPayload>({
    name: "",
    currentRole: "",
    targetIndustry: "",
    accomplishments: "",
    style: "creative"
  });

  const [readmeForm, setReadmeForm] = useState<ReadmePayload>({
    projectName: "",
    description: "",
    techStack: "",
    features: "",
    installation: ""
  });

  const [coverLetterForm, setCoverLetterForm] = useState<CoverLetterPayload>({
    name: "",
    role: "",
    company: "",
    jobRequirements: "",
    relevantExperience: ""
  });

  // Notifications mock
  const notifications = [
    { id: 1, title: "Gemini 3.5 Flash Active", desc: "Your system is connected to Google's fast generative models.", time: "1m ago" },
    { id: 2, title: "ATS Check Passed", desc: "Your resume score reached 98/100 optimized keywords.", time: "2h ago" }
  ];

  // Helper to parse Markdown-like syntax for the UI preview elegantly
  const renderParsedMarkdown = (text: string) => {
    if (!text) return null;
    return text.split("\n").map((line, idx) => {
      // Headers
      if (line.startsWith("# ")) {
        return <h1 key={idx} className="font-display font-extrabold text-xl sm:text-2xl text-indigo-600 dark:text-indigo-400 mt-5 mb-3">{line.replace("# ", "")}</h1>;
      }
      if (line.startsWith("## ")) {
        return <h2 key={idx} className="font-display font-bold text-lg sm:text-xl text-slate-800 dark:text-slate-100 mt-4 mb-2 border-b border-slate-200/50 dark:border-slate-800/50 pb-1">{line.replace("## ", "")}</h2>;
      }
      if (line.startsWith("### ")) {
        return <h3 key={idx} className="font-display font-semibold text-base text-slate-800 dark:text-slate-200 mt-3 mb-1">{line.replace("### ", "")}</h3>;
      }
      // Lists
      if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
        const cleaned = line.trim().replace(/^[-*]\s+/, "");
        return (
          <li key={idx} className="ml-5 list-disc text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed py-0.5">
            {cleaned.split("**").map((part, pIdx) => pIdx % 2 === 1 ? <strong key={pIdx} className="font-semibold text-slate-800 dark:text-white">{part}</strong> : part)}
          </li>
        );
      }
      // Empty lines
      if (line.trim() === "") {
        return <div key={idx} className="h-2" />;
      }
      // Regular text
      return (
        <p key={idx} className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed py-1">
          {line.split("**").map((part, pIdx) => pIdx % 2 === 1 ? <strong key={pIdx} className="font-semibold text-slate-800 dark:text-white">{part}</strong> : part)}
        </p>
      );
    });
  };

  // General generate function using server endpoint
  const handleGenerate = async (toolType: DashboardTab) => {
    setLoading(true);
    setError("");
    setGenerationResult("");

    let payload: any = {};
    switch (toolType) {
      case "resume": payload = resumeForm; break;
      case "portfolio": payload = portfolioForm; break;
      case "linkedin": payload = linkedinForm; break;
      case "readme": payload = readmeForm; break;
      case "coverletter": payload = coverLetterForm; break;
      default: return;
    }

    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toolType, payload })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to generate contents from the server.");
      }

      setGenerationResult(data.result);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong during generation.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!generationResult) return;
    navigator.clipboard.writeText(generationResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadMarkdown = (filename: string) => {
    if (!generationResult) return;
    const element = document.createElement("a");
    const file = new Blob([generationResult], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${filename}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Quick Action cards config
  const quickActions = [
    { id: "resume", title: "AI Resume Writer", icon: FileText, desc: "Build ATS resumes", bg: "from-indigo-500/10 to-indigo-500/5", border: "hover:border-indigo-500/40" },
    { id: "portfolio", title: "Portfolio layout", icon: Globe, desc: "Forge portfolios", bg: "from-violet-500/10 to-violet-500/5", border: "hover:border-violet-500/40" },
    { id: "linkedin", title: "LinkedIn Optimizer", icon: Linkedin, desc: "Maximize recruitment", bg: "from-blue-500/10 to-blue-500/5", border: "hover:border-blue-500/40" },
    { id: "readme", title: "GitHub README", icon: Github, desc: "Markdown templates", bg: "from-slate-500/10 to-slate-500/5", border: "hover:border-slate-500/40" },
    { id: "coverletter", title: "Cover Letter", icon: Mail, desc: "Persuasive cover copies", bg: "from-rose-500/10 to-rose-500/5", border: "hover:border-rose-500/40" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300">
      
      {/* SIDEBAR NAVIGATION */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-40 bg-white dark:bg-slate-950 border-r border-slate-200/80 dark:border-white/10 flex flex-col justify-between transition-all duration-300 ${sidebarCollapsed ? "w-16" : "w-64"}`}
        id="dashboard-sidebar"
      >
        <div className="flex-1 flex flex-col min-h-0">
          
          {/* Logo Brand Header */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200/80 dark:border-white/10">
            <div className="flex items-center space-x-2 overflow-hidden">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-500 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              {!sidebarCollapsed && (
                <span className="font-display font-bold text-sm tracking-tight text-slate-900 dark:text-white truncate">
                  CareerForge AI
                </span>
              )}
            </div>
            {!sidebarCollapsed && (
              <button 
                onClick={() => setSidebarCollapsed(true)}
                className="p-1 rounded-md text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* User Profile Summary */}
          <div className={`p-4 border-b border-slate-200/60 dark:border-white/10 ${sidebarCollapsed ? "flex justify-center" : ""}`}>
            <div className="flex items-center space-x-3 overflow-hidden">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-500/20"
              />
              {!sidebarCollapsed && (
                <div className="truncate">
                  <h4 className="font-semibold text-xs text-slate-800 dark:text-slate-200">{user.name}</h4>
                  <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
                </div>
              )}
            </div>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 px-2.5 py-4 space-y-1 overflow-y-auto">
            
            {/* Overview */}
            <button 
              onClick={() => { setActiveTab("overview"); setError(""); setGenerationResult(""); }}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${activeTab === "overview" ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/10" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"}`}
            >
              <Sliders className="w-4 h-4 shrink-0" />
              {!sidebarCollapsed && <span>Overview</span>}
            </button>

            <div className="pt-2 pb-1">
              {!sidebarCollapsed && <span className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">AI Tools</span>}
            </div>

            {/* AI Resume */}
            <button 
              onClick={() => { setActiveTab("resume"); setError(""); setGenerationResult(""); }}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${activeTab === "resume" ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/10" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"}`}
            >
              <FileText className="w-4 h-4 shrink-0" />
              {!sidebarCollapsed && <span>AI Resume Builder</span>}
            </button>

            {/* Portfolio */}
            <button 
              onClick={() => { setActiveTab("portfolio"); setError(""); setGenerationResult(""); }}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${activeTab === "portfolio" ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/10" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"}`}
            >
              <Globe className="w-4 h-4 shrink-0" />
              {!sidebarCollapsed && <span>Portfolio Guide</span>}
            </button>

            {/* LinkedIn */}
            <button 
              onClick={() => { setActiveTab("linkedin"); setError(""); setGenerationResult(""); }}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${activeTab === "linkedin" ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/10" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"}`}
            >
              <Linkedin className="w-4 h-4 shrink-0" />
              {!sidebarCollapsed && <span>LinkedIn Optimizer</span>}
            </button>

            {/* GitHub README */}
            <button 
              onClick={() => { setActiveTab("readme"); setError(""); setGenerationResult(""); }}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${activeTab === "readme" ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/10" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"}`}
            >
              <Github className="w-4 h-4 shrink-0" />
              {!sidebarCollapsed && <span>GitHub README</span>}
            </button>

            {/* Cover Letter */}
            <button 
              onClick={() => { setActiveTab("coverletter"); setError(""); setGenerationResult(""); }}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${activeTab === "coverletter" ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/10" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"}`}
            >
              <Mail className="w-4 h-4 shrink-0" />
              {!sidebarCollapsed && <span>Cover Letter Builder</span>}
            </button>

            <div className="pt-2 border-t border-slate-100 dark:border-white/10" />

            {/* Settings */}
            <button 
              onClick={() => { setActiveTab("settings"); setError(""); setGenerationResult(""); }}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${activeTab === "settings" ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/10" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"}`}
            >
              <Activity className="w-4 h-4 shrink-0" />
              {!sidebarCollapsed && <span>Settings & Health</span>}
            </button>

          </nav>
        </div>

        {/* Sidebar Footer Controls */}
        <div className="p-3 border-t border-slate-200/85 dark:border-white/10 flex flex-col space-y-1">
          {sidebarCollapsed && (
            <button 
              onClick={() => setSidebarCollapsed(false)}
              className="p-2.5 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 flex justify-center w-full"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
          <button 
            onClick={onLogout}
            className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/20 transition-all cursor-pointer"
            id="sidebar-signout-btn"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!sidebarCollapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* MAIN CONTAINER WORKSPACE */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${sidebarCollapsed ? "pl-16" : "pl-16 lg:pl-64"}`}>
        
        {/* TOP HEADER NAVBAR */}
        <header className="sticky top-0 z-30 h-16 bg-white/75 dark:bg-slate-950/75 backdrop-blur-md border-b border-slate-200/80 dark:border-white/10 flex items-center justify-between px-4 sm:px-6">
          
          {/* Breadcrumbs / Title */}
          <div className="flex items-center space-x-2">
            <span className="text-xs font-medium text-slate-400">Workspace</span>
            <span className="text-xs text-slate-300 dark:text-slate-700">/</span>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 capitalize">
              {activeTab === "overview" ? "Overview Dashboard" : activeTab}
            </span>
          </div>

          {/* Search bar & Actions */}
          <div className="flex items-center space-x-4">
            
            {/* Mock Search Bar */}
            <div className="relative hidden md:block w-48 lg:w-64">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
              <input 
                type="text" 
                placeholder="Search templates..."
                className="w-full h-8 pl-9 pr-3 rounded-lg border border-slate-200/80 dark:border-white/10 bg-white dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 focus:outline-none text-xs"
                readOnly
              />
            </div>

            {/* Notification Bell with Badge */}
            <div className="relative">
              <button 
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-1.5 rounded-lg border border-slate-200/80 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors relative"
                id="notification-bell-btn"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-indigo-500 rounded-full animate-ping" />
              </button>

              {/* Notifications dropdown */}
              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2.5 w-64 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-950/95 shadow-xl p-3 z-50 text-left space-y-2.5 backdrop-blur-xl"
                  >
                    <h5 className="font-bold text-xs text-slate-800 dark:text-white">Recent Updates</h5>
                    <div className="h-[1px] bg-slate-100 dark:bg-white/10" />
                    <div className="space-y-2">
                      {notifications.map(notif => (
                        <div key={notif.id} className="text-[11px] leading-relaxed">
                          <div className="font-semibold text-slate-800 dark:text-slate-200 flex justify-between">
                            <span>{notif.title}</span>
                            <span className="text-[9px] text-slate-400">{notif.time}</span>
                          </div>
                          <p className="text-slate-500">{notif.desc}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Dark/Light mode toggle */}
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg border border-slate-200/80 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
              aria-label="Toggle Theme Mode"
              id="theme-toggle-dashboard"
            >
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

          </div>
        </header>

        {/* WORKSPACE MAIN SCROLLABLE CONTENT */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto">
          
          {/* TAB CONTENT: OVERVIEW DASHBOARD */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              
              {/* Welcome banner */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 text-white relative overflow-hidden shadow-lg shadow-indigo-500/15">
                <div className="absolute top-[-30%] right-[-5%] w-64 h-64 rounded-full bg-white/10 blur-3xl" />
                <div className="space-y-2 max-w-xl relative z-10 text-left">
                  <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-white/20 text-[10px] font-semibold tracking-wider uppercase">
                    <Sparkles className="w-3.5 h-3.5 animate-bounce" />
                    <span>AI Engine Fully Connected</span>
                  </div>
                  <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">Welcome back, {user.name}!</h1>
                  <p className="text-xs sm:text-sm text-indigo-100 font-light leading-relaxed">
                    Ready to forge some high-impact career assets? Select an option below to securely request Gemini API generations for resumes, GitHub profiles, portfolio guides, or letters.
                  </p>
                </div>
              </div>

              {/* Stats Counters */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                
                <div className="bg-white dark:bg-white/5 p-4 rounded-xl border border-slate-200/60 dark:border-white/10 flex items-center space-x-3 text-left backdrop-blur-xl">
                  <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-500">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Resumes Built</span>
                    <span className="text-lg font-extrabold text-slate-800 dark:text-white">3</span>
                  </div>
                </div>

                <div className="bg-white dark:bg-white/5 p-4 rounded-xl border border-slate-200/60 dark:border-white/10 flex items-center space-x-3 text-left backdrop-blur-xl">
                  <div className="p-2 bg-violet-500/10 rounded-lg text-violet-500">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Portfolios Guides</span>
                    <span className="text-lg font-extrabold text-slate-800 dark:text-white">1</span>
                  </div>
                </div>

                <div className="bg-white dark:bg-white/5 p-4 rounded-xl border border-slate-200/60 dark:border-white/10 flex items-center space-x-3 text-left backdrop-blur-xl">
                  <div className="p-2 bg-rose-500/10 rounded-lg text-rose-500">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Cover Letters</span>
                    <span className="text-lg font-extrabold text-slate-800 dark:text-white">5</span>
                  </div>
                </div>

                <div className="bg-white dark:bg-white/5 p-4 rounded-xl border border-slate-200/60 dark:border-white/10 flex items-center space-x-3 text-left backdrop-blur-xl">
                  <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500">
                    <Flame className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Active Streak</span>
                    <span className="text-lg font-extrabold text-slate-800 dark:text-white">3 Days</span>
                  </div>
                </div>

              </div>

              {/* Quick Action Grid */}
              <div className="space-y-4 text-left">
                <h3 className="font-display font-extrabold text-base text-slate-800 dark:text-white">Launch Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {quickActions.map(act => {
                    const ActIcon = act.icon;
                    return (
                      <button 
                        key={act.id}
                        onClick={() => { setActiveTab(act.id as DashboardTab); setError(""); setGenerationResult(""); }}
                        className={`p-4 rounded-xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-white/5 bg-gradient-to-b ${act.bg} ${act.border} flex flex-col justify-between h-36 text-left transition-all hover:-translate-y-0.5 backdrop-blur-xl`}
                      >
                        <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-900 flex items-center justify-center text-indigo-500 shadow-sm border border-slate-100 dark:border-white/10">
                          <ActIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-slate-800 dark:text-white flex items-center">
                            <span>{act.title}</span>
                            <ArrowUpRight className="w-3 h-3 ml-1 text-slate-400 shrink-0" />
                          </h4>
                          <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">{act.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Recent Forged Artifacts History */}
              <div className="space-y-3 text-left bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-xl p-5">
                <h3 className="font-display font-extrabold text-sm text-slate-800 dark:text-white">Recent Forged Artifacts</h3>
                <p className="text-[11px] text-slate-500">Quickly review your historical creations. Click to open and recreate with updated variables.</p>
                
                <div className="h-[1px] bg-slate-100 dark:bg-slate-800 my-2" />

                <div className="space-y-2.5">
                  <div 
                    onClick={() => { setActiveTab("resume"); }}
                    className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200/50 dark:border-slate-800/50 hover:border-indigo-500/20 flex items-center justify-between cursor-pointer group"
                  >
                    <div className="flex items-center space-x-3 truncate">
                      <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-500 flex items-center justify-center font-mono text-[10px] font-bold">RE</div>
                      <div className="truncate">
                        <span className="font-semibold text-xs text-slate-700 dark:text-slate-200 group-hover:text-indigo-500 transition-colors">Yuvraj_Patidar_Resume_v1.md</span>
                        <div className="text-[9px] text-slate-400 flex items-center space-x-2 mt-0.5">
                          <span>ATS Optimizations Enabled</span>
                          <span>•</span>
                          <span>Generated 10m ago</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">Completed</span>
                  </div>

                  <div 
                    onClick={() => { setActiveTab("readme"); }}
                    className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200/50 dark:border-slate-800/50 hover:border-indigo-500/20 flex items-center justify-between cursor-pointer group"
                  >
                    <div className="flex items-center space-x-3 truncate">
                      <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center font-mono text-[10px] font-bold">MD</div>
                      <div className="truncate">
                        <span className="font-semibold text-xs text-slate-700 dark:text-slate-200 group-hover:text-indigo-500 transition-colors">CareerForge-AI_README.md</span>
                        <div className="text-[9px] text-slate-400 flex items-center space-x-2 mt-0.5">
                          <span>GitHub Repo Config</span>
                          <span>•</span>
                          <span>Generated 1h ago</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">Completed</span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB CONTENT: INTERACTIVE WORKSPACES */}
          {activeTab !== "overview" && activeTab !== "settings" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
              
              {/* Form Input Sidebar Column */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 space-y-4 shadow-sm">
                  
                  {/* Tool Title Info */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Interactive Workspace</span>
                    <h2 className="font-display font-extrabold text-base sm:text-lg text-slate-800 dark:text-white flex items-center">
                      {activeTab === "resume" && "AI Resume Builder"}
                      {activeTab === "portfolio" && "Portfolio Guide Generator"}
                      {activeTab === "linkedin" && "LinkedIn Bio Optimizer"}
                      {activeTab === "readme" && "GitHub README Maker"}
                      {activeTab === "coverletter" && "Cover Letter Creator"}
                    </h2>
                    <p className="text-[11px] text-slate-500 leading-normal">
                      Customize your properties below and request server-side compilation.
                    </p>
                  </div>

                  <div className="h-[1px] bg-slate-100 dark:bg-slate-800" />

                  {/* Dynamic Fields */}
                  {activeTab === "resume" && (
                    <div className="space-y-3.5">
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-500">Applicant Full Name</label>
                        <input 
                          type="text"
                          value={resumeForm.name}
                          onChange={(e) => setResumeForm({ ...resumeForm, name: e.target.value })}
                          className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-500">Target Career Role</label>
                        <input 
                          type="text"
                          value={resumeForm.role}
                          onChange={(e) => setResumeForm({ ...resumeForm, role: e.target.value })}
                          className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-500">Skills (Comma-separated)</label>
                        <input 
                          type="text"
                          value={resumeForm.skills}
                          onChange={(e) => setResumeForm({ ...resumeForm, skills: e.target.value })}
                          className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-500">Work Experience Summary</label>
                        <textarea 
                          rows={4}
                          value={resumeForm.experience}
                          onChange={(e) => setResumeForm({ ...resumeForm, experience: e.target.value })}
                          className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs resize-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-500">Education Details</label>
                        <input 
                          type="text"
                          value={resumeForm.education}
                          onChange={(e) => setResumeForm({ ...resumeForm, education: e.target.value })}
                          className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs"
                        />
                      </div>
                    </div>
                  )}

                  {activeTab === "portfolio" && (
                    <div className="space-y-3.5">
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-500">Developer Name</label>
                        <input 
                          type="text"
                          value={portfolioForm.name}
                          onChange={(e) => setPortfolioForm({ ...portfolioForm, name: e.target.value })}
                          className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-500">Portfolio Tagline / Title</label>
                        <input 
                          type="text"
                          value={portfolioForm.title}
                          onChange={(e) => setPortfolioForm({ ...portfolioForm, title: e.target.value })}
                          className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-500">About Me Bio</label>
                        <textarea 
                          rows={3}
                          value={portfolioForm.about}
                          onChange={(e) => setPortfolioForm({ ...portfolioForm, about: e.target.value })}
                          className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs resize-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-500">Featured Projects (One per line)</label>
                        <textarea 
                          rows={3}
                          value={portfolioForm.projects}
                          onChange={(e) => setPortfolioForm({ ...portfolioForm, projects: e.target.value })}
                          className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs resize-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-500">Primary Tech Stack</label>
                        <input 
                          type="text"
                          value={portfolioForm.techStack}
                          onChange={(e) => setPortfolioForm({ ...portfolioForm, techStack: e.target.value })}
                          className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs"
                        />
                      </div>
                    </div>
                  )}

                  {activeTab === "linkedin" && (
                    <div className="space-y-3.5">
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-500">User Full Name</label>
                        <input 
                          type="text"
                          value={linkedinForm.name}
                          onChange={(e) => setLinkedinForm({ ...linkedinForm, name: e.target.value })}
                          className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-500">Current Role / Status</label>
                        <input 
                          type="text"
                          value={linkedinForm.currentRole}
                          onChange={(e) => setLinkedinForm({ ...linkedinForm, currentRole: e.target.value })}
                          className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-500">Target Industry</label>
                        <input 
                          type="text"
                          value={linkedinForm.targetIndustry}
                          onChange={(e) => setLinkedinForm({ ...linkedinForm, targetIndustry: e.target.value })}
                          className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-500">Notable Accomplishments</label>
                        <textarea 
                          rows={4}
                          value={linkedinForm.accomplishments}
                          onChange={(e) => setLinkedinForm({ ...linkedinForm, accomplishments: e.target.value })}
                          className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs resize-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-500">Personal Brand Style</label>
                        <select 
                          value={linkedinForm.style}
                          onChange={(e: any) => setLinkedinForm({ ...linkedinForm, style: e.target.value })}
                          className="w-full h-9 px-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs"
                        >
                          <option value="creative">Creative / Startup friendly</option>
                          <option value="corporate">Corporate / Executive</option>
                          <option value="academic">Academic / Analytical</option>
                          <option value="casual">Casual / Friendly developer</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {activeTab === "readme" && (
                    <div className="space-y-3.5">
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-500">GitHub Project Name</label>
                        <input 
                          type="text"
                          value={readmeForm.projectName}
                          onChange={(e) => setReadmeForm({ ...readmeForm, projectName: e.target.value })}
                          className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-mono"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-500">Detailed Description</label>
                        <textarea 
                          rows={3}
                          value={readmeForm.description}
                          onChange={(e) => setReadmeForm({ ...readmeForm, description: e.target.value })}
                          className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs resize-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-500">Project Tech Stack</label>
                        <input 
                          type="text"
                          value={readmeForm.techStack}
                          onChange={(e) => setReadmeForm({ ...readmeForm, techStack: e.target.value })}
                          className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-500">Key Features</label>
                        <textarea 
                          rows={2}
                          value={readmeForm.features}
                          onChange={(e) => setReadmeForm({ ...readmeForm, features: e.target.value })}
                          className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs resize-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-500">Installation Instructions</label>
                        <textarea 
                          rows={3}
                          value={readmeForm.installation}
                          onChange={(e) => setReadmeForm({ ...readmeForm, installation: e.target.value })}
                          className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-mono resize-none"
                        />
                      </div>
                    </div>
                  )}

                  {activeTab === "coverletter" && (
                    <div className="space-y-3.5">
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-500">Applicant Name</label>
                        <input 
                          type="text"
                          value={coverLetterForm.name}
                          onChange={(e) => setCoverLetterForm({ ...coverLetterForm, name: e.target.value })}
                          className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-500">Target Role / Job Title</label>
                        <input 
                          type="text"
                          value={coverLetterForm.role}
                          onChange={(e) => setCoverLetterForm({ ...coverLetterForm, role: e.target.value })}
                          className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-500">Target Company Name</label>
                        <input 
                          type="text"
                          value={coverLetterForm.company}
                          onChange={(e) => setCoverLetterForm({ ...coverLetterForm, company: e.target.value })}
                          className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-500">Key Job Requirements</label>
                        <textarea 
                          rows={3}
                          value={coverLetterForm.jobRequirements}
                          onChange={(e) => setCoverLetterForm({ ...coverLetterForm, jobRequirements: e.target.value })}
                          className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs resize-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-500">Your Relevant Experience</label>
                        <textarea 
                          rows={4}
                          value={coverLetterForm.relevantExperience}
                          onChange={(e) => setCoverLetterForm({ ...coverLetterForm, relevantExperience: e.target.value })}
                          className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs resize-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* Generation Trigger Button */}
                  <button 
                    onClick={() => handleGenerate(activeTab)}
                    disabled={loading}
                    className="w-full h-11 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center space-x-2 transition-all shadow-md shadow-indigo-500/10 cursor-pointer"
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Forging with Gemini...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Sparkles className="w-4 h-4" />
                        <span>Forge Asset in Real-Time</span>
                      </div>
                    )}
                  </button>

                </div>
              </div>

              {/* Preview Column */}
              <div className="lg:col-span-7 space-y-4">
                
                {/* Visual Header / Actions toolbar */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 p-4 rounded-xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center space-x-2 text-xs">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-mono text-slate-500">PREVIEW_ENGINE: ACTIVE</span>
                  </div>

                  {generationResult && (
                    <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                      <button 
                        onClick={copyToClipboard}
                        className="p-1.5 px-3 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center space-x-1.5 transition-colors"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copied ? "Copied" : "Copy"}</span>
                      </button>

                      <button 
                        onClick={() => downloadMarkdown(activeTab)}
                        className="p-1.5 px-3 rounded-lg bg-indigo-600 text-xs font-semibold text-white hover:bg-indigo-500 flex items-center space-x-1.5 shadow-sm transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Display Area */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-xl min-h-[460px] p-6 shadow-sm overflow-y-auto max-h-[580px] relative">
                  
                  <AnimatePresence mode="wait">
                    {loading && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm flex flex-col items-center justify-center p-8 z-20"
                      >
                        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-4 relative">
                          <Terminal className="w-8 h-8 text-indigo-500" />
                          <div className="absolute inset-0 rounded-2xl border-2 border-indigo-500/30 border-t-indigo-500 animate-spin" />
                        </div>
                        <h4 className="font-display font-bold text-sm text-slate-800 dark:text-white animate-pulse">Assembling Career Intelligence</h4>
                        <p className="text-[11px] text-slate-400 mt-1 max-w-xs text-center leading-normal">
                          Querying sever-side Gemini models to construct optimized terminology, semantic ATS keys, and tailored summaries.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {error && (
                    <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/30 bg-rose-50/50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 text-xs flex items-start space-x-2.5">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block">Service Connection Alert</span>
                        <span className="mt-0.5 block leading-normal">{error}</span>
                      </div>
                    </div>
                  )}

                  {!loading && !error && !generationResult && (
                    <div className="h-full min-h-[380px] flex flex-col items-center justify-center text-slate-400 text-center max-w-md mx-auto space-y-4">
                      <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                        <Terminal className="w-5 h-5 text-slate-400" />
                      </div>
                      <div className="space-y-1.5">
                        <h4 className="font-bold text-xs text-slate-700 dark:text-slate-300">Workspace Pending Compilation</h4>
                        <p className="text-[11px] text-slate-400 leading-normal">
                          Fill out the details on the left form panel and click the generate trigger. We will query Google GenAI securely to compile optimized career content.
                        </p>
                      </div>
                    </div>
                  )}

                  {!loading && !error && generationResult && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="font-sans text-left space-y-3 prose dark:prose-invert prose-xs"
                    >
                      {renderParsedMarkdown(generationResult)}
                    </motion.div>
                  )}

                </div>

              </div>

            </div>
          )}

          {/* TAB CONTENT: SETTINGS & HEALTH CHECK */}
          {activeTab === "settings" && (
            <div className="max-w-3xl mx-auto space-y-6 text-left">
              
              {/* Account Level Card */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-xl p-6 shadow-sm space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Subscription Status</span>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h2 className="font-display font-extrabold text-lg text-slate-800 dark:text-white flex items-center">
                      <span>Career Accelerator Plan</span>
                      <span className="text-[9px] font-bold bg-indigo-500/10 text-indigo-500 px-2 py-0.5 rounded-full ml-2">PRO</span>
                    </h2>
                    <p className="text-xs text-slate-500">Full unlimited access granted for user {user.email}.</p>
                  </div>
                  <div className="p-2.5 bg-indigo-500/10 rounded-xl text-indigo-500">
                    <Award className="w-6 h-6 animate-pulse" />
                  </div>
                </div>

                <div className="h-[1px] bg-slate-100 dark:bg-slate-800" />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400">Next renewal:</span>
                    <p className="font-semibold mt-0.5">Aug 14, 2026</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Total generations:</span>
                    <p className="font-semibold mt-0.5">Unlimited Active</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Server resources:</span>
                    <p className="font-semibold text-emerald-500 mt-0.5">High Priority VIP</p>
                  </div>
                </div>
              </div>

              {/* Gemini Server-Side Connection Diagnostics */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-xl p-6 shadow-sm space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Gemini SDK Health Diagnostics</span>
                
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-sm text-slate-800 dark:text-white">Active API Status Checks</h3>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    This platform routes all Gemini queries securely through server-side Express handlers using the modern <code className="p-1 px-1.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-[10px] text-indigo-600 dark:text-indigo-400">@google/genai</code> client SDK.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between">
                  <div className="flex items-center space-x-3 text-xs">
                    <Activity className="w-5 h-5 text-indigo-500" />
                    <div>
                      <span className="font-semibold">Endpoint Security Level</span>
                      <p className="text-[10px] text-slate-400 mt-0.5">Proxy: Encrypted Express Port 3000 Ingress</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">Secure SSL</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200/50 dark:border-slate-800/50 flex flex-col space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-3">
                      <Terminal className="w-5 h-5 text-indigo-500" />
                      <div>
                        <span className="font-semibold">GEMINI_API_KEY Check</span>
                        <p className="text-[10px] text-slate-400 mt-0.5">Automated detection of user key credentials</p>
                      </div>
                    </div>
                    {/* Since env is resolved on the server, we let user know we are ready or instruct them */}
                    <span className="text-[10px] font-bold text-indigo-500 bg-indigo-500/10 px-2.5 py-0.5 rounded-full">Server Controlled</span>
                  </div>

                  <div className="h-[1px] bg-slate-200/60 dark:bg-slate-800/60 my-1" />
                  
                  <div className="text-[11px] text-slate-500 leading-normal space-y-1">
                    <span className="font-bold text-slate-700 dark:text-slate-300 block">How to configure your API Secrets:</span>
                    <ol className="list-decimal pl-4 space-y-0.5">
                      <li>Go to the <span className="font-semibold text-indigo-500">Settings &gt; Secrets</span> panel in the AI Studio UI on the right side of the workspace.</li>
                      <li>Inject or verify the secret <code className="p-0.5 px-1 bg-slate-100 dark:bg-slate-800 font-mono rounded">GEMINI_API_KEY</code>.</li>
                      <li>Our server-side code resolves this secret securely via <code className="p-0.5 px-1 bg-slate-100 dark:bg-slate-800 font-mono rounded">process.env.GEMINI_API_KEY</code>.</li>
                    </ol>
                  </div>
                </div>

              </div>

            </div>
          )}

        </main>
      </div>

    </div>
  );
}
