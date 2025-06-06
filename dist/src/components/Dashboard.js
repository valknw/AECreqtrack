"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dashboard = Dashboard;
const jsx_runtime_1 = require("react/jsx-runtime");
const types_1 = require("../types");
const card_1 = require("./ui/card");
const recharts_1 = require("recharts");
const COLORS = ["#0097D5", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];
function Dashboard({ requirements, coveragePercent, isReady }) {
    const pieData = types_1.STATUSES.map((s) => ({
        name: s,
        value: requirements.filter((r) => r.status === s).length,
    }));
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-6", children: [(0, jsx_runtime_1.jsxs)(card_1.Card, { className: "flex-1 p-4 text-center", children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-logo", children: "Coverage" }) }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { children: [(0, jsx_runtime_1.jsx)("div", { className: "h-48 w-48 mx-auto", children: (0, jsx_runtime_1.jsx)(recharts_1.ResponsiveContainer, { children: (0, jsx_runtime_1.jsxs)(recharts_1.PieChart, { children: [(0, jsx_runtime_1.jsx)(recharts_1.Pie, { data: pieData, innerRadius: 60, outerRadius: 80, dataKey: "value", nameKey: "name", children: pieData.map((_, index) => ((0, jsx_runtime_1.jsx)(recharts_1.Cell, { fill: COLORS[index % COLORS.length] }, index))) }), (0, jsx_runtime_1.jsx)(recharts_1.Tooltip, { formatter: (value) => `${value}` })] }) }) }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-2 text-lg font-semibold text-logo", children: [coveragePercent, "% Verified"] })] })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { className: "flex-1 p-4 text-center", children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-logo", children: "Readiness" }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: isReady ? ((0, jsx_runtime_1.jsx)("div", { className: "text-logo font-semibold text-xl", children: "All items Verified/Closed" })) : ((0, jsx_runtime_1.jsx)("div", { className: "text-logo font-semibold text-xl", children: "Not Ready" })) })] })] }));
}
