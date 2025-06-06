import { useCallback, useEffect, useState } from "react";
import type { Requirement } from "../types";
import { Status } from "../types";
import { parseCSV, requirementsToCSV } from "../utils/csv";

const KEY_PREFIX = "requirements_";

type NewReq = Omit<Requirement, "req_id" | "status" | "comment">;

export function useRequirements(initial: Requirement[], project: string) {
  const storageKey = `${KEY_PREFIX}${project}`;

  const [requirements, setRequirements] = useState<Requirement[]>(() => {
    if (typeof window === "undefined") return initial;
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        return JSON.parse(stored) as Requirement[];
      }
    } catch {
      // ignore corrupt data
    }
    return initial;
  });

  // reload when project changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        setRequirements(JSON.parse(stored) as Requirement[]);
      } else {
        setRequirements(initial);
      }
    } catch {
      setRequirements(initial);
    }
  }, [storageKey]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(storageKey, JSON.stringify(requirements));
    }
  }, [requirements, storageKey]);

  const createRequirement = useCallback(
    (data: NewReq) => {
      const newItem: Requirement = {
        req_id: `REQ-${(requirements.length + 1)
          .toString()
          .padStart(3, "0")}`,
        status: Status.Draft,
        comment: "",
        ...data,
      };
      setRequirements((prev) => [...prev, newItem]);
    },
    [requirements]
  );

  const updateRequirement = useCallback((id: string, patch: Partial<Requirement>) => {
    setRequirements((prev) =>
      prev.map((r) => (r.req_id === id ? { ...r, ...patch } : r))
    );
  }, []);

  const deleteRequirement = useCallback((id: string) => {
    setRequirements((prev) => prev.filter((r) => r.req_id !== id));
  }, []);

  const exportCSVFile = useCallback(() => {
    const csvContent = requirementsToCSV(requirements);
    const encoded = encodeURIComponent(csvContent);
    const url = `data:text/csv;charset=utf-8,${encoded}`;
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "requirements.csv");
    link.setAttribute("target", "_blank");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [requirements]);

  const importCSVFile = useCallback((file: File) => {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const text = reader.result as string;
          const newReqs = parseCSV(text);
          setRequirements(newReqs);
          resolve();
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsText(file);
    });
  }, []);

  return {
    requirements,
    createRequirement,
    updateRequirement,
    deleteRequirement,
    exportCSVFile,
    importCSVFile,
  } as const;
}
