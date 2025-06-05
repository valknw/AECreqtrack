// reqtrack.tsx
import { useMemo, useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Save, Search, Trash, Upload, Download } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export const SAMPLE_REQUIREMENTS = [
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

export const STATUSES = [
  "draft",
  "approved",
  "implemented",
  "verified",
  "closed",
] as const;

type Status = (typeof STATUSES)[number];
export interface Requirement {
  req_id: string;
  title: string;
  description: string;
  spec_section: string;
  status: Status;
  comment: string;
}

const SPEC_TREE = [
  { section: "1. Authentication", children: ["1.1", "1.2"] },
  { section: "2. Logging", children: ["2.1"] },
];

// Define LOGO_BLUE so it can be used throughout
const LOGO_BLUE = "#0097D5";

const COLORS = [
  LOGO_BLUE,    // for draft
  "#00C49F",    // for approved
  "#FFBB28",    // for implemented
  "#FF8042",    // for verified
  "#8884D8",    // for closed
];

export default function App() {
  const [requirements, setRequirements] = useState<Requirement[]>(SAMPLE_REQUIREMENTS);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | undefined>(undefined);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newReq, setNewReq] = useState({ title: "", description: "", spec_section: "" });
  const [view, setView] = useState<"list" | "tree" | "matrix" | "dashboard">("list");
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State for delete‐confirmation dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  /** Filtered list based on search text + status filter */
  const filteredRequirements = useMemo(() => {
    const q = search.toLowerCase();
    return requirements.filter((r) => {
      const matchesText =
        r.title.toLowerCase().includes(q) || r.req_id.toLowerCase().includes(q);
      const matchesStatus = !filterStatus || r.status === filterStatus;
      return matchesText && matchesStatus;
    });
  }, [requirements, search, filterStatus]);

  /** Requirements under currently selected spec section */
  const sectionRequirements = useMemo(() => {
    if (!selectedSection) return [];
    return requirements.filter((r) => r.spec_section === selectedSection);
  }, [requirements, selectedSection]);

  /** Create a new requirement locally and reset dialog fields */
  const createRequirement = () => {
    const newItem: Requirement = {
      req_id: `REQ-${(requirements.length + 1).toString().padStart(3, "0")}`,
      title: newReq.title,
      description: newReq.description,
      spec_section: newReq.spec_section || "-",
      status: "draft",
      comment: "",
    };
    setRequirements((prev) => [...prev, newItem]);
    setDialogOpen(false);
    setNewReq({ title: "", description: "", spec_section: "" });
  };

  /** Update fields of an existing requirement by ID */
  const updateRequirement = (id: string, patch: Partial<Requirement>) => {
    setRequirements((prev) =>
      prev.map((r) => (r.req_id === id ? { ...r, ...patch } : r))
    );
  };

  /**
   * ACTUAL deletion logic (no built-in prompt here)
   * We’ll call this only after the user clicks “Delete” in our custom dialog.
   */
  const confirmDelete = () => {
    if (!deleteTarget) return;
    setRequirements((prev) =>
      prev.filter((r) => r.req_id !== deleteTarget)
    );
    setDeleteTarget(null);
    setDeleteDialogOpen(false);
  };

  // Sentinel value for “all statuses” in the dropdown
  const ALL_VALUE = "all";
  const selectValue = filterStatus ?? ALL_VALUE;

  /** Calculate coverage % = (verified / total) */
  const coveragePercent = useMemo(() => {
    if (requirements.length === 0) return 0;
    const verifiedCount = requirements.filter((r) => r.status === "verified").length;
    return Math.round((verifiedCount / requirements.length) * 100);
  }, [requirements]);

  /** App is “ready” if every requirement is either verified or closed */
  const isReady = useMemo(
    () => requirements.every((r) => r.status === "verified" || r.status === "closed"),
    [requirements]
  );

  /** Data for pie chart: one slice per status */
  const pieData = useMemo(
    () =>
      STATUSES.map((s) => {
        const count = requirements.filter((r) => r.status === s).length;
        return { name: s, value: count };
      }),
    [requirements]
  );

  /** Export current requirements list to CSV and prompt download */
  const exportCSV = () => {
    console.log("Export CSV clicked");
    const headers = ["req_id", "title", "description", "spec_section", "status", "comment"];
    const rows = requirements.map((r) => [
      r.req_id,
      r.title,
      r.description,
      r.spec_section,
      r.status,
      r.comment,
    ]);
    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const encoded = encodeURIComponent(csvContent);
    const url = `data:text/csv;charset=utf-8,${encoded}`;
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "requirements.csv");
    link.setAttribute("target", "_blank");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /** Import requirements from a CSV file, replacing the list */
  const importCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target?.result as string;
      const lines = text.split(/\r?\n/).filter((line) => line.trim());
      const [headerLine, ...dataLines] = lines;
      const headers = headerLine.split(",").map((h) => h.replace(/"/g, "").trim());
      const newReqs: Requirement[] = dataLines.map((line) => {
        const values = line
          .split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/)
          .map((v) => v.replace(/^"|"$/g, "").trim());
        const entry: any = {};
        headers.forEach((h, idx) => {
          entry[h] = values[idx] || "";
        });
        return {
          req_id: entry["req_id"],
          title: entry["title"],
          description: entry["description"],
          spec_section: entry["spec_section"],
          status: entry["status"] as Status,
          comment: entry["comment"],
        };
      });
      setRequirements(newReqs);
      if (fileInputRef.current) fileInputRef.current.value = "";
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        {/* HEADER: Title + View Tabs */}
        <header className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold tracking-tight text-[#0097D5]">
            Requirement Tracker
          </h1>
          <div className="space-x-2">
            {(["list", "tree", "matrix", "dashboard"] as const).map((v) => (
              <Button
                key={v}
                variant={view === v ? "default" : "outline"}
                onClick={() => {
                  setView(v);
                  if (v !== "tree") setSelectedSection(null);
                }}
                size="sm"
                className={view === v ? "bg-[#0097D5] text-white" : ""}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </Button>
            ))}
          </div>
        </header>

        {/* CONTROLS: Add, Search, Filter, Import/Export */}
        <div className="flex flex-wrap items-end gap-4">
          {/* Add Requirement Dialog */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-[#0097D5] text-white">
                <Plus className="h-4 w-4 mr-2" style={{ color: "#ffffff" }} />
                Add Requirement
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="text-[#0097D5]">New Requirement</DialogTitle>
                <DialogDescription>Enter details below.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Title *"
                  value={newReq.title}
                  onChange={(e) =>
                    setNewReq((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="border-[#0097D5] focus:ring-[#0097D5]"
                />
                <Input
                  placeholder="Description *"
                  value={newReq.description}
                  onChange={(e) =>
                    setNewReq((prev) => ({ ...prev, description: e.target.value }))
                  }
                  className="border-[#0097D5] focus:ring-[#0097D5]"
                />
                <Input
                  placeholder="Specification Section"
                  value={newReq.spec_section}
                  onChange={(e) =>
                    setNewReq((prev) => ({ ...prev, spec_section: e.target.value }))
                  }
                  className="border-[#0097D5] focus:ring-[#0097D5]"
                />
              </div>
              <DialogFooter>
                <Button
                  onClick={createRequirement}
                  disabled={!newReq.title || !newReq.description}
                  className="bg-[#0097D5] text-white"
                >
                  <Save className="h-4 w-4 mr-2" style={{ color: "#ffffff" }} />
                  Save
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Search Input */}
          <div className="flex grow items-center gap-2 max-w-xs">
            <Search className="h-4 w-4" style={{ color: LOGO_BLUE }} />
            <Input
              placeholder="Search by ID or title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-[#0097D5] focus:ring-[#0097D5]"
            />
          </div>

          {/* Status Filter Dropdown */}
          <Select
            value={selectValue}
            onValueChange={(v) => setFilterStatus(v === ALL_VALUE ? undefined : v)}
          >
            <SelectTrigger className="w-40 border-[#0097D5]">
              <SelectValue placeholder="All statuses" className="text-[#0097D5]" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_VALUE} className="capitalize text-[#0097D5]">
                All
              </SelectItem>
              {STATUSES.map((s) => (
                <SelectItem key={s} value={s} className="capitalize text-[#0097D5]">
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Export CSV Button */}
          <Button
            type="button"
            onClick={exportCSV}
            variant="outline"
            size="sm"
            className="border-[#0097D5] text-[#0097D5]"
          >
            <Download className="h-4 w-4 mr-2" style={{ color: LOGO_BLUE }} />
            Export CSV
          </Button>
          <input
            type="file"
            accept=".csv"
            ref={fileInputRef}
            className="hidden"
            onChange={importCSV}
          />
          {/* Import CSV Button */}
          <Button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
            size="sm"
            className="border-[#0097D5] text-[#0097D5]"
          >
            <Upload className="h-4 w-4 mr-2" style={{ color: LOGO_BLUE }} />
            Import CSV
          </Button>
        </div>

        {/* MAIN CONTENT: Renders different views based on `view` */}
        {view === "list" && (
          <Card className="overflow-x-auto">
            <CardHeader>
              <CardTitle className="text-[#0097D5]">Requirements List</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100 text-left font-medium">
                  <tr>
                    <th className="px-4 py-2 text-[#0097D5]">ID</th>
                    <th className="px-4 py-2 text-[#0097D5]">Title</th>
                    <th className="px-4 py-2 text-[#0097D5]">Spec Section</th>
                    <th className="px-4 py-2 text-[#0097D5]">Status</th>
                    <th className="px-4 py-2 text-[#0097D5]">Comment</th>
                    <th className="px-4 py-2 text-[#0097D5]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequirements.map((r) => (
                    <tr key={r.req_id} className="border-b last:border-0">
                      <td className="px-4 py-2 font-mono text-xs text-[#0097D5]">
                        {r.req_id}
                      </td>
                      <td className="px-4 py-2 text-[#0097D5]">{r.title}</td>
                      <td className="px-4 py-2 text-[#0097D5]">{r.spec_section}</td>
                      <td className="px-4 py-2">
                        <Select
                          value={r.status}
                          onValueChange={(v) =>
                            updateRequirement(r.req_id, { status: v as Status })
                          }
                        >
                          <SelectTrigger className="w-32 capitalize border-[#0097D5]">
                            <SelectValue className="text-[#0097D5]" />
                          </SelectTrigger>
                          <SelectContent>
                            {STATUSES.map((s) => (
                              <SelectItem
                                key={s}
                                value={s}
                                className="capitalize text-[#0097D5]"
                              >
                                {s}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="px-4 py-2">
                        <Input
                          value={r.comment}
                          onChange={(e) =>
                            updateRequirement(r.req_id, { comment: e.target.value })
                          }
                          className="w-full border-[#0097D5] focus:ring-[#0097D5] text-[#0097D5]"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setDeleteTarget(r.req_id);
                            setDeleteDialogOpen(true);
                          }}
                        >
                          <Trash className="h-4 w-4" style={{ color: LOGO_BLUE }} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {filteredRequirements.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-[#0097D5]">
                        No requirements match the current filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card>
        )}

        {view === "tree" && (
          <div className="flex gap-4">
            {/* Spec Tree on left */}
            <div className="w-1/4 bg-white p-4 rounded-lg shadow-sm">
              <h2 className="font-semibold mb-4 text-[#0097D5]">Spec Tree</h2>
              {SPEC_TREE.map((node) => (
                <div key={node.section} className="mb-2">
                  <div className="font-medium text-[#0097D5]">{node.section}</div>
                  <ul className="ml-4 list-disc">
                    {node.children.map((child) => (
                      <li
                        key={child}
                        className="text-sm cursor-pointer hover:text-[#0097D5]"
                        onClick={() => setSelectedSection(child)}
                      >
                        Section {child}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {/* Details for selected section on right */}
            <div className="flex-1 bg-white p-4 rounded-lg shadow-sm">
              {selectedSection ? (
                <>
                  <h3 className="text-xl font-semibold mb-2 text-[#0097D5]">
                    Requirements in Section {selectedSection}
                  </h3>
                  <ul className="list-disc ml-4">
                    {sectionRequirements.map((r) => (
                      <li
                        key={r.req_id}
                        className="text-sm mb-1 flex justify-between items-center"
                      >
                        <span>
                          <span className="font-mono text-xs text-[#0097D5]">
                            {r.req_id}
                          </span>
                          : <span className="text-[#0097D5]">{r.title}</span> (
                          <span className="text-[#0097D5]">{r.status}</span>)
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setDeleteTarget(r.req_id);
                            setDeleteDialogOpen(true);
                          }}
                        >
                          <Trash className="h-4 w-4" style={{ color: LOGO_BLUE }} />
                        </Button>
                      </li>
                    ))}
                    {sectionRequirements.length === 0 && (
                      <li className="text-[#0097D5]">No requirements in this section.</li>
                    )}
                  </ul>
                </>
              ) : (
                <p className="text-[#0097D5]">Click a section to view requirements.</p>
              )}
            </div>
          </div>
        )}

        {view === "matrix" && (
          <Card className="overflow-x-auto">
            <CardHeader>
              <CardTitle className="text-[#0097D5]">Traceability Matrix (Req × Status)</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <table className="min-w-full text-sm border">
                <thead className="bg-gray-100 text-left font-medium">
                  <tr>
                    <th className="px-4 py-2 text-[#0097D5]">Req ID</th>
                    {STATUSES.map((s) => (
                      <th key={s} className="px-4 py-2 capitalize text-[#0097D5]">{s}</th>
                    ))}
                    <th className="px-4 py-2 text-[#0097D5]">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequirements.map((r) => (
                    <tr key={r.req_id} className="border-b">
                      <td className="px-4 py-2 font-mono text-xs text-[#0097D5]">{r.req_id}</td>
                      {STATUSES.map((s) => (
                        <td key={s} className="px-4 py-2 text-center text-[#0097D5]">
                          {r.status === s ? "✔️" : ""}
                        </td>
                      ))}
                      <td className="px-4 py-2 text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setDeleteTarget(r.req_id);
                            setDeleteDialogOpen(true);
                          }}
                        >
                          <Trash className="h-4 w-4" style={{ color: LOGO_BLUE }} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        )}

        {view === "dashboard" && (
          <div className="flex gap-6">
            {/* Coverage Card */}
            <Card className="flex-1 p-4 text-center">
              <CardHeader>
                <CardTitle className="text-[#0097D5]">Coverage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 w-48 mx-auto">
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={pieData}
                        innerRadius={60}
                        outerRadius={80}
                        dataKey="value"
                        nameKey="name"
                      >
                        {pieData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => `${value}`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-2 text-lg font-semibold text-[#0097D5]">
                  {coveragePercent}% Verified
                </div>
              </CardContent>
            </Card>
            {/* Readiness Card */}
            <Card className="flex-1 p-4 text-center">
              <CardHeader>
                <CardTitle className="text-[#0097D5]">Readiness</CardTitle>
              </CardHeader>
              <CardContent>
                {isReady ? (
                  <div className="text-[#0097D5] font-semibold text-xl">
                    All items Verified/Closed
                  </div>
                ) : (
                  <div className="text-[#0097D5] font-semibold text-xl">Not Ready</div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* DELETE‐CONFIRMATION DIALOG (shared) */}
      <Dialog
        open={deleteDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteTarget(null);
          }
          setDeleteDialogOpen(open);
        }}
      >
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-[#0097D5]">Confirm Deletion</DialogTitle>
            <DialogDescription className="text-[#333]">
              Are you sure you want to delete requirement&nbsp;
              <span className="font-mono text-[#0097D5]">{deleteTarget}</span>
              ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setDeleteDialogOpen(false);
                setDeleteTarget(null);
              }}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              className="bg-[#DC2626] text-white hover:bg-red-700"
              onClick={confirmDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
