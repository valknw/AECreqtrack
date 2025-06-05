"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const csv_1 = require("../src/utils/csv");
const types_1 = require("../src/types");
const assert = require("assert");
const sample = [
    { req_id: "R1", title: "t", description: "d", spec_section: "s", status: types_1.Status.Draft, comment: "c" },
];
const csv = (0, csv_1.requirementsToCSV)(sample);
assert(csv.includes("req_id"));
const parsed = (0, csv_1.parseCSV)(csv);
assert.equal(parsed.length, 1);
assert.equal(parsed[0].req_id, "R1");
console.log("CSV utils test passed");
