import React, { useState, useEffect } from "react";
import LandingPage from "./components/LandingPage";
import AuthPage from "./components/AuthPage";
import DashboardLayout from "./components/DashboardLayout";
import { AppView, User } from "./types";

export default function App() {
  const [view, setView] = useState<AppView>("landing");
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [user, setUser] = useState<User | null>(null);

  // Apply dark mode theme class to document element on load & toggle
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const handleLoginSuccess = (signedInUser: User) => {
    setUser(signedInUser);
    setView("dashboard");
  };

  const handleLogout = () => {
    setUser(null);
    setView("landing");
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <>
      {view === "landing" && (
        <LandingPage 
          setView={setView} 
          theme={theme} 
          toggleTheme={toggleTheme} 
        />
      )}

      {view === "auth" && (
        <AuthPage 
          setView={setView} 
          onLoginSuccess={handleLoginSuccess} 
        />
      )}

      {view === "dashboard" && user && (
        <DashboardLayout 
          user={user} 
          setView={setView} 
          onLogout={handleLogout} 
          theme={theme} 
          toggleTheme={toggleTheme} 
        />
      )}
    </>
  );
}

