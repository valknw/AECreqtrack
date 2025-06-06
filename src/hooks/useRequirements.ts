import { useCallback, useEffect, useState } from "react";
import type { Requirement } from "../types";
import { DEFAULT_STATUSES, Status } from "../types";
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

  function generateId(reqs: Requirement[]): string {
    const max = reqs.reduce((m, r) => {
      const n = parseInt(r.req_id.replace(/^REQ-/, ""));
      return isNaN(n) ? m : Math.max(m, n);
    }, 0);
    const next = max + 1;
    return `REQ-${next.toString().padStart(3, "0")}`;
  }

  const createRequirement = useCallback(
    (data: NewReq) => {
      const id = generateId(requirements);
      const newItem: Requirement = {
        req_id: id,
        status: DEFAULT_STATUSES[0],
        comment: "",
        ...data,
      };
      setRequirements([...requirements, newItem]);
    },
    [requirements]
  );

  const updateRequirement = useCallback(
    (id: string, patch: Partial<Requirement>) => {
      setRequirements(
        requirements.map((r) => (r.req_id === id ? { ...r, ...patch } : r))
      );
    },
    [requirements]
  );

  const deleteRequirement = useCallback(
    (id: string) => {
      setRequirements(requirements.filter((r) => r.req_id !== id));
    },
    [requirements]
  );

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

  const importCSVFile = useCallback((file: File, merge = false) => {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const text = reader.result as string;
          const newReqs = parseCSV(text);
          if (merge) {
            const existing = [...requirements];
            let current = existing;
            newReqs.forEach((r) => {
              if (current.some((e) => e.req_id === r.req_id)) {
                r.req_id = generateId(current);
              }
              current = [...current, r];
            });
            setRequirements(current);
          } else {
            setRequirements(newReqs);
          }
          resolve();
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsText(file);
    });
  }, [requirements]);

  const exportStatusPDF = useCallback(async () => {
    if (typeof window === "undefined") return;
    const win = window as any;
    if (!win.jspdf) {
      await new Promise<void>((resolve, reject) => {
        const script = document.createElement("script");
        script.src =
          "https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js";
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Failed to load jsPDF"));
        document.body.appendChild(script);
      });
    }
    const { jsPDF } = (window as any).jspdf;
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Requirement Status Summary", 10, 10);
    let y = 20;
    requirements.forEach((r) => {
      doc.text(`${r.req_id} - ${r.status} - ${r.comment}`, 10, y);
      y += 8;
    });
    doc.save("status-summary.pdf");
  }, [requirements]);

  return {
    requirements,
    addRequirement: createRequirement,
    createRequirement,
    updateRequirement,
    deleteRequirement,
    exportCSVFile,
    exportStatusPDF,
    importCSVFile,
  } as const;
}
