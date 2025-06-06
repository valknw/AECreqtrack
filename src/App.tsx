import { useMemo, useRef, useState, useEffect } from "react";
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
import { Select, SelectItem } from "./components/ui/select";
import {
  Plus,
  Save,
  Search,
  Upload,
  Download,
  Moon,
  Sun,
  X,
} from "lucide-react";
import type { Requirement, Status } from "./types";
import { useStatuses } from "./hooks/useStatuses";
import { SAMPLE_REQUIREMENTS } from "./sampleData";
import { useRequirements } from "./hooks/useRequirements";
import { useProjects } from "./hooks/useProjects";
import { RequirementList } from "./components/RequirementList";
import { SpecTree } from "./components/SpecTree";
import { TraceMatrix } from "./components/TraceMatrix";
import { Dashboard } from "./components/Dashboard";
import { VerificationTab } from "./components/VerificationTab";
import "./styles.css";

const LOGO_BLUE = "#0097D5";
const DEFAULT_PROJECT = "Default";

export default function App() {
  const {
    projects,
    currentProject,
    createProject,
    deleteProject,
    switchProject,
    renameProject,
  } = useProjects([
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
  const { statuses, setFromString } = useStatuses();

  const [search, setSearch] = useState("");
  const [filterStatuses, setFilterStatuses] = useState<string[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newReq, setNewReq] = useState({ title: "", description: "", spec_section: "" });
  const [view, setView] = useState<
    | "list"
    | "tree"
    | "matrix"
    | "dashboard"
    | "verification"
  >("list");
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [newProjectDialogOpen, setNewProjectDialogOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [renameProjectName, setRenameProjectName] = useState("");
  const [deleteProjectDialogOpen, setDeleteProjectDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("darkMode") === "true";
    }
    return false;
  });

  const filteredRequirements = useMemo(() => {
    const q = search.toLowerCase();
    return requirements.filter((r) => {
      const matchesText =
        r.title.toLowerCase().includes(q) ||
        r.req_id.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.spec_section.toLowerCase().includes(q) ||
        r.comment.toLowerCase().includes(q);
      const matchesStatus =
        filterStatuses.length === 0 || filterStatuses.includes(r.status);
      return matchesText && matchesStatus;
    });
  }, [requirements, search, filterStatuses]);


  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) root.classList.add("dark");
    else root.classList.remove("dark");
    if (typeof window !== "undefined") {
      localStorage.setItem("darkMode", String(darkMode));
    }
  }, [darkMode]);

  const ALL_VALUE = "all";
  const selectValue = filterStatuses.length === 0 ? [ALL_VALUE] : filterStatuses;

  return (
    <div className="min-h-screen bg-gray-50 p-8 fade-in">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="Requirement Tracker logo" className="h-8 w-8" />
            <h1 className="text-3xl font-semibold tracking-tight text-logo">
              Requirement Tracker
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Select
              value={currentProject}
              onValueChange={switchProject}
              className="w-40 border-logo text-logo"
            >
              {projects.map((p) => (
                <SelectItem key={p} value={p} className="text-logo">
                  {p}
                </SelectItem>
              ))}
            </Select>
            <Button
              size="sm"
              variant="outline"
              className="border-logo text-logo"
              onClick={() => {
                setNewProjectName("");
                setNewProjectDialogOpen(true);
              }}
            >
              New Project
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-logo text-logo"
              onClick={() => {
                setRenameProjectName(currentProject);
                setRenameDialogOpen(true);
              }}
            >
              Rename
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-logo text-logo"
              onClick={() => {
                setDeleteProjectDialogOpen(true);
              }}
            >
              Delete Project
            </Button>
          </div>
          <div className="space-x-2 flex items-center">
            {(
              ["list", "tree", "matrix", "dashboard", "verification"] as const
            ).map((v) => (
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
            <Button
              size="sm"
              variant="outline"
              className="border-logo text-logo"
              onClick={() => {
                const input = prompt(
                  "Comma separated statuses",
                  statuses.join(", ")
                );
                if (input) setFromString(input);
              }}
            >
              Statuses
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-logo text-logo"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
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
                    placeholder="Short summary"
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
                    placeholder="Detailed description"
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
                    placeholder="e.g. 1.1"
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
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="text-logo"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

          <Select
            multiple
            value={selectValue}
            onValueChange={(v) =>
              setFilterStatuses(
                Array.isArray(v)
                  ? v.filter((val) => val !== ALL_VALUE)
                  : []
              )
            }
            className="w-40 border-logo text-logo capitalize"
          >
            <SelectItem value={ALL_VALUE} className="capitalize text-logo">
              All
            </SelectItem>
            {statuses.map((s) => (
              <SelectItem key={s} value={s} className="capitalize text-logo">
                {s}
              </SelectItem>
            ))}
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
              const merge = confirm("Merge with existing requirements?");
              importCSVFile(f, merge).catch((err) => alert(err.message));
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
            statuses={statuses}
            search={search}
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
            statuses={statuses}
          />
        )}

        {view === "dashboard" && (
          <Dashboard requirements={requirements} statuses={statuses} />
        )}

        {view === "verification" && (
          <VerificationTab
            requirements={requirements}
            onUpdate={updateRequirement}
            logoColor={LOGO_BLUE}
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

      <Dialog open={newProjectDialogOpen} onOpenChange={setNewProjectDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-logo">New Project</DialogTitle>
            <DialogDescription className="text-[#333]">
              Enter a project name.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-2">
            <Input
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              className="border-logo focus:ring-logo w-full"
            />
          </div>
          <DialogFooter className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setNewProjectDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              className="bg-logo text-white"
              onClick={() => {
                createProject(newProjectName);
                setNewProjectDialogOpen(false);
                setNewProjectName("");
              }}
              disabled={!newProjectName.trim()}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={renameDialogOpen} onOpenChange={setRenameDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-logo">Rename Project</DialogTitle>
          </DialogHeader>
          <div className="mt-2">
            <Input
              value={renameProjectName}
              onChange={(e) => setRenameProjectName(e.target.value)}
              className="border-logo focus:ring-logo w-full"
            />
          </div>
          <DialogFooter className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setRenameDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              className="bg-logo text-white"
              onClick={() => {
                renameProject(currentProject, renameProjectName);
                setRenameDialogOpen(false);
              }}
              disabled={!renameProjectName.trim()}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={deleteProjectDialogOpen}
        onOpenChange={setDeleteProjectDialogOpen}
      >
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-logo">Delete Project</DialogTitle>
            <DialogDescription className="text-[#333]">
              Are you sure you want to delete project&nbsp;
              <span className="text-logo">{currentProject}</span>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDeleteProjectDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              className="bg-red-600 text-white hover:bg-red-700"
              onClick={() => {
                deleteProject(currentProject);
                setDeleteProjectDialogOpen(false);
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
