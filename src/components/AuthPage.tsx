import React, { useState } from "react";
import { Sparkles, ArrowLeft, Mail, Lock, CheckCircle2, AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import { AppView, User } from "../types";

interface AuthPageProps {
  setView: (view: AppView) => void;
  onLoginSuccess: (user: User) => void;
}

export default function AuthPage({ setView, onLoginSuccess }: AuthPageProps) {
  // Pre-populate with user email from workspace metadata for delightful quick-testing!
  const [email, setEmail] = useState("patidaryuvraj431@gmail.com");
  const [password, setPassword] = useState("••••••••");
  const [name, setName] = useState("Yuvraj");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email) {
      setError("Please enter an email address.");
      setLoading(false);
      return;
    }

    setTimeout(() => {
      onLoginSuccess({
        name: isSignUp ? name : "Yuvraj",
        email: email,
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256",
      });
      setView("dashboard");
      setLoading(false);
    }, 850);
  };

  const handleGoogleSignIn = () => {
    setLoading(true);
    setTimeout(() => {
      onLoginSuccess({
        name: "Yuvraj",
        email: "patidaryuvraj431@gmail.com",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256",
      });
      setView("dashboard");
      setLoading(false);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-slate-950 grid grid-cols-1 lg:grid-cols-12 overflow-hidden select-none font-sans text-slate-200">
      
      {/* LEFT SIDE: BRANDING & VALUE PROP */}
      <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-950 p-12 flex-col justify-between relative overflow-hidden border-r border-white/10">
        
        {/* Ambient floating circles */}
        <div className="absolute top-[-20%] left-[-20%] w-[350px] h-[350px] rounded-full bg-indigo-500/10 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[120px]" />

        {/* Logo and Back Button */}
        <div className="flex items-center justify-between z-10">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setView("landing")}>
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-violet-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="font-display font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 tracking-tight">
              CareerForge AI
            </span>
          </div>

          <button 
            onClick={() => setView("landing")}
            className="flex items-center space-x-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to site</span>
          </button>
        </div>

        {/* Testimonials / Benefits cards */}
        <div className="space-y-8 my-auto z-10">
          <div className="space-y-3">
            <h2 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-white">
              Build Your Career.<br/>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 italic font-serif">Build Your Brand.</span>
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed font-light">
              Generate ATS resumes, portfolios, LinkedIn profiles, and Cover Letters in seconds using advanced LLMs.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3 bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-xl shadow-2xl relative group">
              <CheckCircle2 className="w-5 h-5 text-indigo-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-semibold text-white text-xs">ATS-Scored Optimization</h4>
                <p className="text-[11px] text-slate-400 leading-normal mt-0.5">
                  Resumes designed precisely to beat algorithmic resume scanners and highlight your core tech accomplishments.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-xl shadow-2xl relative group">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-semibold text-white text-xs">Custom Developer Integrations</h4>
                <p className="text-[11px] text-slate-400 leading-normal mt-0.5">
                  Generate stellar GitHub README layouts, portfolios, and tech bio highlights optimized for engineers.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Micro footer */}
        <div className="text-[10px] text-slate-500 z-10 font-mono tracking-widest uppercase">
          Secure Access AES-256 JWT
        </div>
      </div>

      {/* RIGHT SIDE: AUTH FORM */}
      <div className="col-span-1 lg:col-span-7 flex flex-col justify-center p-8 sm:p-16 relative z-10">
        
        {/* Small Back Button on Mobile */}
        <button 
          onClick={() => setView("landing")}
          className="lg:hidden absolute top-6 left-6 flex items-center space-x-1 text-xs font-semibold text-slate-500"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="max-w-md w-full mx-auto space-y-8 bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-2xl relative group">
          <div className="absolute -top-3 left-6 px-2 py-0.5 bg-slate-950 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Secure Access</div>
          
          <div className="space-y-2">
            <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {isSignUp ? "Create account" : "Welcome back!"}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              {isSignUp ? (
                <span>Already have an account? <button onClick={() => setIsSignUp(false)} className="text-indigo-400 hover:underline font-semibold">Sign In</button></span>
              ) : (
                <span>New to CareerForge? <button onClick={() => setIsSignUp(true)} className="text-indigo-400 hover:underline font-semibold">Start building free</button></span>
              )}
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-900/30 text-rose-400 text-xs flex items-start space-x-2 animate-shake">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {isSignUp && (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-tighter">Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Yuvraj"
                  className="w-full h-11 px-3.5 rounded-lg border border-white/5 bg-slate-900/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 text-white text-sm transition-all"
                  required
                />
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-tighter">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="yuvraj@developer.io"
                  className="w-full h-11 pl-10 pr-3.5 rounded-lg border border-white/5 bg-slate-900/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 text-white text-sm transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-tighter">Password</label>
                {!isSignUp && (
                  <span className="text-[11px] font-medium text-slate-400 hover:text-white cursor-pointer">
                    Forgot?
                  </span>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-11 pl-10 pr-3.5 rounded-lg border border-white/5 bg-slate-900/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 text-white text-sm transition-all"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full h-11 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center space-x-2 cursor-pointer"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <span>{isSignUp ? "Continue" : "Continue"}</span>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="flex-shrink mx-4 text-slate-500 text-xs bg-slate-950 font-mono px-2 tracking-widest">OR</span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>

          {/* Google Button */}
          <button 
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full h-11 rounded-full bg-white text-slate-950 hover:bg-slate-200 transition-colors flex items-center justify-center space-x-2.5 font-bold text-sm cursor-pointer"
          >
            {/* Google Icon Vector */}
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="currentColor"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="currentColor"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="currentColor"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="currentColor"/>
            </svg>
            <span>Google</span>
          </button>

          <div className="text-[11px] text-slate-500 text-center leading-normal">
            By signing in, you agree to our <span className="underline cursor-pointer">Terms</span> and <span className="underline cursor-pointer">Privacy</span>.
          </div>

        </div>

      </div>

    </div>
  );
}
