import type { ReactNode } from "react";
import List from "lucide-react/dist/esm/icons/list";
import ListTree from "lucide-react/dist/esm/icons/list-tree";
import Table2 from "lucide-react/dist/esm/icons/table-2";
import PieChart from "lucide-react/dist/esm/icons/pie-chart";
import CheckSquare from "lucide-react/dist/esm/icons/check-square";

export type View = "list" | "tree" | "matrix" | "dashboard" | "verification";

interface Props {
  view: View;
  setView: (v: View) => void;
}

const items: { key: View; label: string; icon: ReactNode }[] = [
  { key: "list", label: "List", icon: <List className="h-5 w-5" /> },
  { key: "tree", label: "Tree", icon: <ListTree className="h-5 w-5" /> },
  { key: "matrix", label: "Matrix", icon: <Table2 className="h-5 w-5" /> },
  { key: "dashboard", label: "Dashboard", icon: <PieChart className="h-5 w-5" /> },
  { key: "verification", label: "Verification", icon: <CheckSquare className="h-5 w-5" /> },
];

export function Sidebar({ view, setView }: Props) {
  return (
    <nav className="w-48 bg-white border-r shadow-sm p-4 space-y-2">
      {items.map((item) => (
        <button
          key={item.key}
          onClick={() => setView(item.key)}
          className={
            "flex items-center gap-2 w-full px-3 py-2 rounded-md text-left " +
            (view === item.key
              ? "bg-logo text-white"
              : "text-logo hover:bg-gray-100")
          }
        >
          {item.icon}
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
