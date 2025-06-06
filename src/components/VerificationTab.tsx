import type { Requirement } from "../types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";

interface Props {
  requirements: Requirement[];
  onUpdate: (id: string, patch: Partial<Requirement>) => void;
  logoColor: string;
}

export function VerificationTab({ requirements, onUpdate, logoColor }: Props) {
  return (
    <Card className="overflow-x-auto">
      <CardHeader>
        <CardTitle className="text-logo">Verification</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-left font-medium">
            <tr>
              <th className="px-4 py-2 text-logo">ID</th>
              <th className="px-4 py-2 text-logo">Title</th>
              <th className="px-4 py-2 text-logo">Verification</th>
            </tr>
          </thead>
          <tbody>
            {requirements.map((r) => (
              <tr key={r.req_id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="px-4 py-2 font-mono text-xs text-logo">{r.req_id}</td>
                <td className="px-4 py-2 text-logo">{r.title}</td>
                <td className="px-4 py-2">
                  <Input
                    value={r.verification}
                    onChange={(e) => onUpdate(r.req_id, { verification: e.target.value })}
                    className="w-full border-logo focus:ring-logo text-logo"
                  />
                </td>
              </tr>
            ))}
            {requirements.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-logo">
                  No requirements defined.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
