import { Requirement, Status, STATUSES } from "../types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Trash } from "lucide-react";

interface Props {
  requirements: Requirement[];
  onUpdate: (id: string, patch: Partial<Requirement>) => void;
  onDelete: (id: string) => void;
  filteredRequirements: Requirement[];
  logoColor: string;
}

export function RequirementList({
  requirements,
  onUpdate,
  onDelete,
  filteredRequirements,
  logoColor,
}: Props) {
  return (
    <Card className="overflow-x-auto">
      <CardHeader>
        <CardTitle className="text-logo">Requirements List</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-left font-medium">
            <tr>
              <th className="px-4 py-2 text-logo">ID</th>
              <th className="px-4 py-2 text-logo">Title</th>
              <th className="px-4 py-2 text-logo">Spec Section</th>
              <th className="px-4 py-2 text-logo">Status</th>
              <th className="px-4 py-2 text-logo">Comment</th>
              <th className="px-4 py-2 text-logo">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequirements.map((r) => (
              <tr key={r.req_id} className="border-b last:border-0">
                <td className="px-4 py-2 font-mono text-xs text-logo">
                  {r.req_id}
                </td>
                <td className="px-4 py-2 text-logo">{r.title}</td>
                <td className="px-4 py-2 text-logo">{r.spec_section}</td>
                <td className="px-4 py-2">
                  <Select
                    value={r.status}
                    onValueChange={(v) =>
                      onUpdate(r.req_id, { status: v as Status })
                    }
                  >
                    <SelectTrigger className="w-32 capitalize border-logo">
                      <SelectValue className="text-logo" />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUSES.map((s) => (
                        <SelectItem
                          key={s}
                          value={s}
                          className="capitalize text-logo"
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
                    onChange={(e) => onUpdate(r.req_id, { comment: e.target.value })}
                    className="w-full border-logo focus:ring-logo text-logo"
                  />
                </td>
                <td className="px-4 py-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(r.req_id)}
                  >
                    <Trash className="h-4 w-4" style={{ color: logoColor }} />
                  </Button>
                </td>
              </tr>
            ))}
            {filteredRequirements.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-logo">
                  No requirements match the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
