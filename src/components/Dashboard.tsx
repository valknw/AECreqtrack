import { useMemo } from "react";
import type { Requirement } from "../types";

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
  statuses: string[];
}

export function Dashboard({ requirements, statuses }: Props) {
  const finalStatuses = useMemo(() => {
    // treat the last two statuses as "complete" states
    return statuses.slice(-2);
  }, [statuses]);

  const coveragePercent = useMemo(() => {
    if (requirements.length === 0) return 0;
    const done = requirements.filter((r) => finalStatuses.includes(r.status)).length;
    return Math.round((done / requirements.length) * 100);
  }, [requirements, finalStatuses]);

  const isReady = useMemo(
    () => requirements.every((r) => finalStatuses.includes(r.status)),
    [requirements, finalStatuses]
  );

  const pieData = statuses.map((s) => ({
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
            {coveragePercent}% Complete
          </div>
        </CardContent>
      </Card>
      <Card className="flex-1 p-4 text-center">
        <CardHeader>
          <CardTitle className="text-logo">Readiness</CardTitle>
        </CardHeader>
        <CardContent>
          {isReady ? (
            <div className="text-logo font-semibold text-xl">All items Complete</div>
          ) : (
            <div className="text-logo font-semibold text-xl">Not Ready</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
