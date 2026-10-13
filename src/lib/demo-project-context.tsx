"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

export type MaisonProject = {
  intention: string;
  address: string;
  city: string;
  propertyType: string;
  surface: string;
  rooms: string;
  condition: string;
  horizon: string;
  motivations: string[];
  availability: string;
  fullName: string;
  email: string;
  phone: string;
  resultConsent: boolean;
  contactConsent: boolean;
  marketingConsent: boolean;
  relationMode: string;
  submitted: boolean;
};

type ProjectContextValue = {
  project: MaisonProject;
  updateProject: <K extends keyof MaisonProject>(key: K, value: MaisonProject[K]) => void;
  resetProject: () => void;
};

const initialProject: MaisonProject = {
  intention: "",
  address: "",
  city: "",
  propertyType: "",
  surface: "",
  rooms: "",
  condition: "",
  horizon: "",
  motivations: [],
  availability: "",
  fullName: "",
  email: "",
  phone: "",
  resultConsent: false,
  contactConsent: false,
  marketingConsent: false,
  relationMode: "",
  submitted: false,
};

const ProjectContext = createContext<ProjectContextValue | null>(null);

export function DemoProjectProvider({ children }: { children: ReactNode }) {
  const [project, setProject] = useState<MaisonProject>(initialProject);
  const value = useMemo<ProjectContextValue>(() => ({
    project,
    updateProject: (key, value) => setProject((current) => ({ ...current, [key]: value })),
    resetProject: () => setProject(initialProject),
  }), [project]);

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
}

export function useDemoProject() {
  const context = useContext(ProjectContext);
  if (!context) throw new Error("useDemoProject doit être utilisé dans DemoProjectProvider.");
  return context;
}
