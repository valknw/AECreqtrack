export enum Status {
  Draft = "draft",
  Approved = "approved",
  Implemented = "implemented",
  Verified = "verified",
  Closed = "closed",
}

export const STATUSES = [
  Status.Draft,
  Status.Approved,
  Status.Implemented,
  Status.Verified,
  Status.Closed,
] as const;

export interface Requirement {
  req_id: string;
  title: string;
  description: string;
  spec_section: string;
  status: Status;
  comment: string;
}
