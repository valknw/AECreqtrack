const { requirementsToCSV, parseCSV } = require("../dist/src/utils/csv.js");
const assert = require("assert");

const sample = [
  { req_id: "R1", title: "t", description: "d", spec_section: "s", status: "draft", comment: "c" },
];

const csv = requirementsToCSV(sample);
assert(csv.includes("req_id"));
const parsed = parseCSV(csv);
assert.equal(parsed.length, 1);
assert.equal(parsed[0].req_id, "R1");
console.log("CSV utils test passed");
