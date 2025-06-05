import { Requirement, STATUSES } from "../types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

interface Props {
  requirements: Requirement[];
  onDelete: (id: string) => void;
  logoColor: string;
}

export function TraceMatrix({ requirements, onDelete, logoColor }: Props) {
  return (
    <Card className="overflow-x-auto">
      <CardHeader>
        <CardTitle className="text-logo">
          Traceability Matrix (Req × Status)
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <table className="min-w-full text-sm border">
          <thead className="bg-gray-100 text-left font-medium">
            <tr>
              <th className="px-4 py-2 text-logo">Req ID</th>
              {STATUSES.map((s) => (
                <th key={s} className="px-4 py-2 capitalize text-logo">
                  {s}
                </th>
              ))}
              <th className="px-4 py-2 text-logo">Delete</th>
            </tr>
          </thead>
          <tbody>
            {requirements.map((r) => (
              <tr key={r.req_id} className="border-b">
                <td className="px-4 py-2 font-mono text-xs text-logo">
                  {r.req_id}
                </td>
                {STATUSES.map((s) => (
                  <td key={s} className="px-4 py-2 text-center text-logo">
                    {r.status === s ? "✔️" : ""}
                  </td>
                ))}
                <td className="px-4 py-2 text-center">
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
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
