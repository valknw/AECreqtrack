"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRequirements = useRequirements;
const react_1 = require("react");
const types_1 = require("../types");
const csv_1 = require("../utils/csv");
const STORAGE_KEY = "requirements";
function useRequirements(initial) {
    const [requirements, setRequirements] = (0, react_1.useState)(() => {
        if (typeof window === "undefined")
            return initial;
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                return JSON.parse(stored);
            }
        }
        catch (_a) {
            // ignore corrupt data
        }
        return initial;
    });
    (0, react_1.useEffect)(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(requirements));
        }
    }, [requirements]);
    const createRequirement = (0, react_1.useCallback)((data) => {
        const newItem = {
            req_id: `REQ-${(requirements.length + 1)
                .toString()
                .padStart(3, "0")}`,
            status: types_1.Status.Draft,
            comment: "",
            ...data,
        };
        setRequirements((prev) => [...prev, newItem]);
    }, [requirements]);
    const updateRequirement = (0, react_1.useCallback)((id, patch) => {
        setRequirements((prev) => prev.map((r) => (r.req_id === id ? { ...r, ...patch } : r)));
    }, []);
    const deleteRequirement = (0, react_1.useCallback)((id) => {
        setRequirements((prev) => prev.filter((r) => r.req_id !== id));
    }, []);
    const exportCSVFile = (0, react_1.useCallback)(() => {
        const csvContent = (0, csv_1.requirementsToCSV)(requirements);
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
    const importCSVFile = (0, react_1.useCallback)((file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                try {
                    const text = reader.result;
                    const newReqs = (0, csv_1.parseCSV)(text);
                    setRequirements(newReqs);
                    resolve();
                }
                catch (err) {
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
    };
}
