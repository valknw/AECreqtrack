"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStatuses = useStatuses;
const react_1 = require("react");
const types_1 = require("../types");
const STATUS_KEY = "req_statuses";
function useStatuses() {
    const [statuses, setStatuses] = (0, react_1.useState)(() => {
        if (typeof window === "undefined")
            return [...types_1.DEFAULT_STATUSES];
        try {
            const stored = localStorage.getItem(STATUS_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    return parsed;
                }
            }
        }
        catch (_a) {
            // ignore
        }
        return [...types_1.DEFAULT_STATUSES];
    });
    (0, react_1.useEffect)(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem(STATUS_KEY, JSON.stringify(statuses));
        }
    }, [statuses]);
    const setFromString = (0, react_1.useCallback)((input) => {
        const parts = input
            .split(",")
            .map((p) => p.trim())
            .filter(Boolean);
        if (parts.length > 0) {
            setStatuses(parts);
        }
    }, []);
    return { statuses, setStatuses, setFromString };
}
