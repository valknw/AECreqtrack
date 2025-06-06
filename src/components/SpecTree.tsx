import { Requirement } from "../types";
import { SPEC_TREE } from "../sampleData";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";

interface Props {
  requirements: Requirement[];
  selected: string | null;
  onSelect: (section: string) => void;
  onDelete: (id: string) => void;
  logoColor: string;
}

export function SpecTree({
  requirements,
  selected,
  onSelect,
  onDelete,
  logoColor,
}: Props) {
  const sectionRequirements = selected
    ? requirements.filter((r) => r.spec_section === selected)
    : [];

  return (
    <div className="flex gap-4">
      <div className="w-1/4 bg-white p-4 rounded-lg shadow-sm">
        <h2 className="font-semibold mb-4 text-logo">Spec Tree</h2>
        {SPEC_TREE.map((node) => (
          <div key={node.section} className="mb-2">
            <div className="font-medium text-logo">{node.section}</div>
            <ul className="ml-4 list-disc">
              {node.children.map((child) => (
                <li
                  key={child}
                  className="text-sm cursor-pointer hover:text-logo"
                  onClick={() => onSelect(child)}
                >
                  Section {child}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex-1 bg-white p-4 rounded-lg shadow-sm">
        {selected ? (
          <>
            <h3 className="text-xl font-semibold mb-2 text-logo">
              Requirements in Section {selected}
            </h3>
            <ul className="list-disc ml-4">
              {sectionRequirements.map((r) => (
                <li
                  key={r.req_id}
                  className="text-sm mb-1 flex justify-between items-center"
                >
                  <span>
                    <span className="font-mono text-xs text-logo">{r.req_id}</span>
                    : <span className="text-logo">{r.title}</span> (
                    <span className="text-logo">{r.status}</span>)
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(r.req_id)}
                  >
                    <Trash className="h-4 w-4" style={{ color: logoColor }} />
                  </Button>
                </li>
              ))}
              {sectionRequirements.length === 0 && (
                <li className="text-logo">No requirements in this section.</li>
              )}
            </ul>
          </>
        ) : (
          <p className="text-logo">Click a section to view requirements.</p>
        )}
      </div>
    </div>
  );
}
