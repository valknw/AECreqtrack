import { useState, useEffect, useCallback } from "react";
import { DEFAULT_STATUSES, Status } from "../types";

const STATUS_KEY = "req_statuses";

export function useStatuses() {
  const [statuses, setStatuses] = useState<Status[]>(() => {
    if (typeof window === "undefined") return [...DEFAULT_STATUSES];
    try {
      const stored = localStorage.getItem(STATUS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed as Status[];
        }
      }
    } catch {
      // ignore
    }
    return [...DEFAULT_STATUSES];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STATUS_KEY, JSON.stringify(statuses));
    }
  }, [statuses]);

  const setFromString = useCallback((input: string) => {
    const parts = input
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean);
    if (parts.length > 0) {
      setStatuses(parts);
    }
  }, []);

  return { statuses, setStatuses, setFromString } as const;
}
