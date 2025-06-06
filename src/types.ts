export type Status = string;

export const DEFAULT_STATUSES = [
  "draft",
  "approved",
  "implemented",
  "verified",
  "closed",
] as const;

export interface Requirement {
  req_id: string;
  title: string;
  description: string;
  spec_section: string;
  status: Status;
  comment: string;
}
