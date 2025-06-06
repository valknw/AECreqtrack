"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRequirements = useRequirements;
const react_1 = require("react");
const types_1 = require("../types");
const csv_1 = require("../utils/csv");
const KEY_PREFIX = "requirements_";
function useRequirements(initial, project) {
    const storageKey = `${KEY_PREFIX}${project}`;
    const [requirements, setRequirements] = (0, react_1.useState)(() => {
        if (typeof window === "undefined")
            return initial;
        try {
            const stored = localStorage.getItem(storageKey);
            if (stored) {
                const parsed = JSON.parse(stored);
                return parsed.map((r) => ({ verification: "", ...r }));
            }
        }
        catch (_a) {
            // ignore corrupt data
        }
        return initial;
    });
    // reload when project changes
    (0, react_1.useEffect)(() => {
        if (typeof window === "undefined")
            return;
        try {
            const stored = localStorage.getItem(storageKey);
            if (stored) {
                const parsed = JSON.parse(stored);
                setRequirements(parsed.map((r) => ({ verification: "", ...r })));
            }
            else {
                setRequirements(initial);
            }
        }
        catch (_a) {
            setRequirements(initial);
        }
    }, [storageKey]);
    (0, react_1.useEffect)(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem(storageKey, JSON.stringify(requirements));
        }
    }, [requirements, storageKey]);
    function generateId(reqs) {
        const max = reqs.reduce((m, r) => {
            const n = parseInt(r.req_id.replace(/^REQ-/, ""));
            return isNaN(n) ? m : Math.max(m, n);
        }, 0);
        const next = max + 1;
        return `REQ-${next.toString().padStart(3, "0")}`;
    }
    const createRequirement = (0, react_1.useCallback)((data) => {
        const id = generateId(requirements);
        const newItem = {
            req_id: id,
            status: types_1.DEFAULT_STATUSES[0],
            comment: "",
            verification: "",
            ...data,
        };
        setRequirements([...requirements, newItem]);
    }, [requirements]);
    const updateRequirement = (0, react_1.useCallback)((id, patch) => {
        setRequirements(requirements.map((r) => (r.req_id === id ? { ...r, ...patch } : r)));
    }, [requirements]);
    const deleteRequirement = (0, react_1.useCallback)((id) => {
        setRequirements(requirements.filter((r) => r.req_id !== id));
    }, [requirements]);
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
    const importCSVFile = (0, react_1.useCallback)((file, merge = false) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                try {
                    const text = reader.result;
                    const newReqs = (0, csv_1.parseCSV)(text);
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
                    }
                    else {
                        setRequirements(newReqs);
                    }
                    resolve();
                }
                catch (err) {
                    reject(err);
                }
            };
            reader.onerror = () => reject(reader.error);
            reader.readAsText(file);
        });
    }, [requirements]);
    const exportStatusPDF = (0, react_1.useCallback)(async () => {
        if (typeof window === "undefined")
            return;
        const win = window;
        if (!win.jspdf) {
            await new Promise((resolve, reject) => {
                const script = document.createElement("script");
                script.src =
                    "https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js";
                script.onload = () => resolve();
                script.onerror = () => reject(new Error("Failed to load jsPDF"));
                document.body.appendChild(script);
            });
        }
        const { jsPDF } = window.jspdf;
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
    };
}
