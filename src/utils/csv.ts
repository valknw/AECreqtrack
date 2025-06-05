import { Requirement, STATUSES, Status } from "../types";

export function requirementsToCSV(reqs: Requirement[]): string {
  const headers = [
    "req_id",
    "title",
    "description",
    "spec_section",
    "status",
    "comment",
  ];
  const rows = reqs.map((r) => [
    r.req_id,
    r.title,
    r.description,
    r.spec_section,
    r.status,
    r.comment,
  ]);
  return [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    .join("\n");
}

export function parseCSV(text: string): Requirement[] {
  const lines = text.split(/\r?\n/).filter(Boolean);
  if (lines.length === 0) return [];
  const [headerLine, ...dataLines] = lines;
  const headers = headerLine.split(",").map((h) => h.replace(/"/g, "").trim());
  const requiredHeaders = [
    "req_id",
    "title",
    "description",
    "spec_section",
    "status",
    "comment",
  ];
  for (const h of requiredHeaders) {
    if (!headers.includes(h)) {
      throw new Error(`Missing column: ${h}`);
    }
  }
  return dataLines.map((line, idx) => {
    const values = line
      .split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/)
      .map((v) =>
        v.trim().replace(/^\"|\"$/g, "").replace(/\"\"/g, "\"")
      );
    if (values.length !== headers.length) {
      throw new Error(
        `Row ${idx + 1} has ${values.length} columns, expected ${headers.length}`
      );
    }
    const record: any = {};
    headers.forEach((h, i) => {
      record[h] = values[i] || "";
    });
    if (!STATUSES.includes(record.status as Status)) {
      record.status = Status.Draft;
    }
    return record as Requirement;
  });
}
