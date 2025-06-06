import { useMemo, useRef, useState } from "react";
import { Button } from "./components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";
import { Input } from "./components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { Plus, Save, Search, Upload, Download } from "lucide-react";
import type { Requirement } from "./types";
import { STATUSES, Status } from "./types";
import { SAMPLE_REQUIREMENTS } from "./sampleData";
import { useRequirements } from "./hooks/useRequirements";
import { useProjects } from "./hooks/useProjects";
import { RequirementList } from "./components/RequirementList";
import { SpecTree } from "./components/SpecTree";
import { TraceMatrix } from "./components/TraceMatrix";
import { Dashboard } from "./components/Dashboard";
import "./styles.css";

const LOGO_BLUE = "#0097D5";
const DEFAULT_PROJECT = "Default";

export default function App() {
  const { projects, currentProject, createProject, switchProject } = useProjects([
    DEFAULT_PROJECT,
  ]);
  const {
    requirements,
    createRequirement,
    updateRequirement,
    deleteRequirement,
    exportCSVFile,
    importCSVFile,
  } = useRequirements(SAMPLE_REQUIREMENTS, currentProject);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | undefined>(undefined);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newReq, setNewReq] = useState({ title: "", description: "", spec_section: "" });
  const [view, setView] = useState<"list" | "tree" | "matrix" | "dashboard">("list");
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredRequirements = useMemo(() => {
    const q = search.toLowerCase();
    return requirements.filter((r) => {
      const matchesText = r.title.toLowerCase().includes(q) || r.req_id.toLowerCase().includes(q);
      const matchesStatus = !filterStatus || r.status === filterStatus;
      return matchesText && matchesStatus;
    });
  }, [requirements, search, filterStatus]);

  const coveragePercent = useMemo(() => {
    if (requirements.length === 0) return 0;
    const verified = requirements.filter((r) => r.status === Status.Verified).length;
    return Math.round((verified / requirements.length) * 100);
  }, [requirements]);

  const isReady = useMemo(
    () => requirements.every((r) => r.status === Status.Verified || r.status === Status.Closed),
    [requirements]
  );

  const ALL_VALUE = "all";
  const selectValue = filterStatus ?? ALL_VALUE;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold tracking-tight text-logo">
            Requirement Tracker
          </h1>
          <div className="flex items-center gap-4">
            <Select value={currentProject} onValueChange={switchProject}>
              <SelectTrigger className="w-40 border-logo">
                <SelectValue placeholder="Select project" className="text-logo" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((p) => (
                  <SelectItem key={p} value={p} className="text-logo">
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              size="sm"
              variant="outline"
              className="border-logo text-logo"
              onClick={() => {
                const name = prompt("Project name?");
                if (name) createProject(name);
              }}
            >
              New Project
            </Button>
          </div>
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
                className={view === v ? "bg-logo text-white" : ""}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </Button>
            ))}
          </div>
        </header>

        <div className="flex flex-wrap items-end gap-4">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-logo text-white">
                <Plus className="h-4 w-4 mr-2" style={{ color: "#ffffff" }} />
                Add Requirement
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="text-logo">New Requirement</DialogTitle>
                <DialogDescription>Enter details below.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <label className="block">
                  <span className="text-logo">Title *</span>
                  <Input
                    value={newReq.title}
                    onChange={(e) =>
                      setNewReq({
                        ...newReq,
                        title: e.target.value,
                      })
                    }
                    className="border-logo focus:ring-logo"
                  />
                </label>
                <label className="block">
                  <span className="text-logo">Description *</span>
                  <Input
                    value={newReq.description}
                    onChange={(e) =>
                      setNewReq({
                        ...newReq,
                        description: e.target.value,
                      })
                    }
                    className="border-logo focus:ring-logo"
                  />
                </label>
                <label className="block">
                  <span className="text-logo">Specification Section</span>
                  <Input
                    value={newReq.spec_section}
                    onChange={(e) =>
                      setNewReq({
                        ...newReq,
                        spec_section: e.target.value,
                      })
                    }
                    className="border-logo focus:ring-logo"
                  />
                </label>
              </div>
              <DialogFooter>
                <Button
                  onClick={() => {
                    createRequirement(newReq);
                    setDialogOpen(false);
                    setNewReq({ title: "", description: "", spec_section: "" });
                  }}
                  disabled={!newReq.title || !newReq.description}
                  className="bg-logo text-white"
                >
                  <Save className="h-4 w-4 mr-2" style={{ color: "#ffffff" }} />
                  Save
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <div className="flex grow items-center gap-2 max-w-xs">
            <Search className="h-4 w-4" style={{ color: LOGO_BLUE }} />
            <Input
              placeholder="Search by ID or title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-logo focus:ring-logo"
            />
          </div>

          <Select value={selectValue} onValueChange={(v) => setFilterStatus(v === ALL_VALUE ? undefined : v)}>
            <SelectTrigger className="w-40 border-logo">
              <SelectValue placeholder="All statuses" className="text-logo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_VALUE} className="capitalize text-logo">
                All
              </SelectItem>
              {STATUSES.map((s) => (
                <SelectItem key={s} value={s} className="capitalize text-logo">
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button type="button" onClick={exportCSVFile} variant="outline" size="sm" className="border-logo text-logo">
            <Download className="h-4 w-4 mr-2" style={{ color: LOGO_BLUE }} />
            Export CSV
          </Button>
          <input
            type="file"
            accept=".csv"
            ref={fileInputRef}
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              importCSVFile(f).catch((err) => alert(err.message));
              if (fileInputRef.current) fileInputRef.current.value = "";
            }}
          />
          <Button type="button" onClick={() => fileInputRef.current?.click()} variant="outline" size="sm" className="border-logo text-logo">
            <Upload className="h-4 w-4 mr-2" style={{ color: LOGO_BLUE }} />
            Import CSV
          </Button>
        </div>

        {view === "list" && (
          <RequirementList
            requirements={requirements}
            filteredRequirements={filteredRequirements}
            onUpdate={updateRequirement}
            onDelete={(id) => {
              setDeleteTarget(id);
              setDeleteDialogOpen(true);
            }}
            logoColor={LOGO_BLUE}
          />
        )}

        {view === "tree" && (
          <SpecTree
            requirements={requirements}
            selected={selectedSection}
            onSelect={setSelectedSection}
            onDelete={(id) => {
              setDeleteTarget(id);
              setDeleteDialogOpen(true);
            }}
            logoColor={LOGO_BLUE}
          />
        )}

        {view === "matrix" && (
          <TraceMatrix
            requirements={filteredRequirements}
            onDelete={(id) => {
              setDeleteTarget(id);
              setDeleteDialogOpen(true);
            }}
            logoColor={LOGO_BLUE}
          />
        )}

        {view === "dashboard" && (
          <Dashboard
            requirements={requirements}
            coveragePercent={coveragePercent}
            isReady={isReady}
          />
        )}
      </div>

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
            <DialogTitle className="text-logo">Confirm Deletion</DialogTitle>
            <DialogDescription className="text-[#333]">
              Are you sure you want to delete requirement&nbsp;
              <span className="font-mono text-logo">{deleteTarget}</span>? This action cannot be undone.
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
              className="bg-red-600 text-white hover:bg-red-700"
              onClick={() => {
                if (deleteTarget) deleteRequirement(deleteTarget);
                setDeleteDialogOpen(false);
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
