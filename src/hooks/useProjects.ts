import { useCallback, useEffect, useState } from "react";

const LIST_KEY = "projects-list";

export function useProjects(initialProjects: string[]) {
  const [projects, setProjects] = useState<string[]>(() => {
    if (typeof window === "undefined") return initialProjects;
    try {
      const stored = localStorage.getItem(LIST_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore corrupt data
    }
    return initialProjects;
  });

  const [currentProject, setCurrentProject] = useState(() =>
    projects[0] ?? ""
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(LIST_KEY, JSON.stringify(projects));
    }
  }, [projects]);

  const createProject = useCallback(
    (name: string) => {
      if (!name || projects.includes(name)) return;
      setProjects([...projects, name]);
      setCurrentProject(name);
    },
    [projects]
  );

  const deleteProject = useCallback(
    (name: string) => {
      setProjects(projects.filter((p) => p !== name));
      if (currentProject === name) {
        const remaining = projects.filter((p) => p !== name);
        setCurrentProject(remaining[0] ?? "");
      }
      if (typeof window !== "undefined") {
        localStorage.removeItem(`requirements_${name}`);
      }
    },
    [currentProject, projects]
  );

  const renameProject = useCallback(
    (oldName: string, newName: string) => {
      if (!newName || oldName === newName || projects.includes(newName)) return;
      setProjects(
        projects.map((p) => (p === oldName ? newName : p))
      );
      if (typeof window !== "undefined") {
        const data = localStorage.getItem(`requirements_${oldName}`);
        if (data) {
          localStorage.setItem(`requirements_${newName}`, data);
          localStorage.removeItem(`requirements_${oldName}`);
        }
      }
      if (currentProject === oldName) {
        setCurrentProject(newName);
      }
    },
    [projects, currentProject]
  );

  const switchProject = useCallback(
    (name: string) => {
      if (projects.includes(name)) setCurrentProject(name);
    },
    [projects]
  );

  return {
    projects,
    currentProject,
    createProject,
    deleteProject,
    renameProject,
    switchProject,
  } as const;
}
