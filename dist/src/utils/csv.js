"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requirementsToCSV = requirementsToCSV;
exports.parseCSV = parseCSV;
const types_1 = require("../types");
function requirementsToCSV(reqs) {
    const headers = [
        "req_id",
        "title",
        "description",
        "spec_section",
        "status",
        "comment",
        "verification",
    ];
    const rows = reqs.map((r) => [
        r.req_id,
        r.title,
        r.description,
        r.spec_section,
        r.status,
        r.comment,
        r.verification,
    ]);
    return [headers, ...rows]
        .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
        .join("\n");
}
function parseCSV(text) {
    const lines = text.split(/\r?\n/).filter(Boolean);
    if (lines.length === 0)
        return [];
    const [headerLine, ...dataLines] = lines;
    const headers = headerLine.split(",").map((h) => h.replace(/"/g, "").trim());
    const requiredHeaders = [
        "req_id",
        "title",
        "description",
        "spec_section",
        "status",
        "comment",
        "verification",
    ];
    for (const h of requiredHeaders) {
        if (!headers.includes(h)) {
            throw new Error(`Missing column: ${h}`);
        }
    }
    return dataLines.map((line, idx) => {
        const values = line
            .split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/)
            .map((v) => v.trim().replace(/^\"|\"$/g, "").replace(/\"\"/g, "\""));
        if (values.length !== headers.length) {
            throw new Error(`Row ${idx + 1} has ${values.length} columns, expected ${headers.length}`);
        }
        const record = {};
        headers.forEach((h, i) => {
            record[h] = values[i] || "";
        });
        if (!record.status) {
            record.status = types_1.DEFAULT_STATUSES[0];
        }
        return record;
    });
}
