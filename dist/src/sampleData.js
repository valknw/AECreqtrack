"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SPEC_TREE = exports.SAMPLE_REQUIREMENTS = void 0;
exports.SAMPLE_REQUIREMENTS = [
    {
        req_id: "REQ-001",
        title: "User Authentication",
        description: "The system shall allow users to log in using email and password.",
        spec_section: "1.1",
        status: "approved",
        comment: "Reviewed by QA",
    },
    {
        req_id: "REQ-002",
        title: "Data Encryption",
        description: "All sensitive data must be encrypted at rest.",
        spec_section: "1.2",
        status: "draft",
        comment: "Pending security review",
    },
    {
        req_id: "REQ-003",
        title: "Audit Logging",
        description: "The system shall log all user actions for audit purposes.",
        spec_section: "2.1",
        status: "implemented",
        comment: "Logs available in /var/logs",
    },
    {
        req_id: "REQ-004",
        title: "Password Complexity",
        description: "Passwords must be at least 12 characters, include a number and symbol.",
        spec_section: "1.1",
        status: "verified",
        comment: "Tested",
    },
    {
        req_id: "REQ-005",
        title: "Session Timeout",
        description: "User session times out after 15 minutes of inactivity.",
        spec_section: "1.1",
        status: "closed",
        comment: "Deployed",
    },
];
exports.SPEC_TREE = [
    { section: "1. Authentication", children: ["1.1", "1.2"] },
    { section: "2. Logging", children: ["2.1"] },
];
