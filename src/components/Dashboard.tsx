import { Requirement, STATUSES } from "../types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#0097D5", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

interface Props {
  requirements: Requirement[];
  coveragePercent: number;
  isReady: boolean;
}

export function Dashboard({ requirements, coveragePercent, isReady }: Props) {
  const pieData = STATUSES.map((s) => ({
    name: s,
    value: requirements.filter((r) => r.status === s).length,
  }));

  return (
    <div className="flex gap-6">
      <Card className="flex-1 p-4 text-center">
        <CardHeader>
          <CardTitle className="text-logo">Coverage</CardTitle>
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
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `${value}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 text-lg font-semibold text-logo">
            {coveragePercent}% Verified
          </div>
        </CardContent>
      </Card>
      <Card className="flex-1 p-4 text-center">
        <CardHeader>
          <CardTitle className="text-logo">Readiness</CardTitle>
        </CardHeader>
        <CardContent>
          {isReady ? (
            <div className="text-logo font-semibold text-xl">
              All items Verified/Closed
            </div>
          ) : (
            <div className="text-logo font-semibold text-xl">Not Ready</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
