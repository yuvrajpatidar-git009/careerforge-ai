export type AppView = "landing" | "auth" | "dashboard";

export type DashboardTab = 
  | "overview" 
  | "resume" 
  | "portfolio" 
  | "linkedin" 
  | "readme" 
  | "coverletter" 
  | "settings";

export interface User {
  name: string;
  email: string;
  avatar: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

export type ThemeMode = "light" | "dark";

// Payloads for each tool type
export interface ResumePayload {
  name: string;
  role: string;
  skills: string;
  experience: string;
  education: string;
}

export interface PortfolioPayload {
  name: string;
  title: string;
  about: string;
  projects: string;
  techStack: string;
}

export interface LinkedinPayload {
  name: string;
  currentRole: string;
  targetIndustry: string;
  accomplishments: string;
  style: "creative" | "corporate" | "academic" | "casual";
}

export interface ReadmePayload {
  projectName: string;
  description: string;
  techStack: string;
  features: string;
  installation: string;
}

export interface CoverLetterPayload {
  name: string;
  role: string;
  company: string;
  jobRequirements: string;
  relevantExperience: string;
}
