import type { Requirement } from "./types";
import { Status } from "./types";

export const SAMPLE_REQUIREMENTS: Requirement[] = [
  {
    req_id: "REQ-001",
    title: "User Authentication",
    description: "The system shall allow users to log in using email and password.",
    spec_section: "1.1",
    status: Status.Approved,
    comment: "Reviewed by QA",
  },
  {
    req_id: "REQ-002",
    title: "Data Encryption",
    description: "All sensitive data must be encrypted at rest.",
    spec_section: "1.2",
    status: Status.Draft,
    comment: "Pending security review",
  },
  {
    req_id: "REQ-003",
    title: "Audit Logging",
    description: "The system shall log all user actions for audit purposes.",
    spec_section: "2.1",
    status: Status.Implemented,
    comment: "Logs available in /var/logs",
  },
  {
    req_id: "REQ-004",
    title: "Password Complexity",
    description:
      "Passwords must be at least 12 characters, include a number and symbol.",
    spec_section: "1.1",
    status: Status.Verified,
    comment: "Tested",
  },
  {
    req_id: "REQ-005",
    title: "Session Timeout",
    description: "User session times out after 15 minutes of inactivity.",
    spec_section: "1.1",
    status: Status.Closed,
    comment: "Deployed",
  },
];

export const SPEC_TREE = [
  { section: "1. Authentication", children: ["1.1", "1.2"] },
  { section: "2. Logging", children: ["2.1"] },
];
