"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dashboard = Dashboard;
const types_1 = require("../types");
const card_1 = require("@/components/ui/card");
const recharts_1 = require("recharts");
const COLORS = ["#0097D5", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];
function Dashboard({ requirements, coveragePercent, isReady }) {
    const pieData = types_1.STATUSES.map((s) => ({
        name: s,
        value: requirements.filter((r) => r.status === s).length,
    }));
    return (React.createElement("div", { className: "flex gap-6" },
        React.createElement(card_1.Card, { className: "flex-1 p-4 text-center" },
            React.createElement(card_1.CardHeader, null,
                React.createElement(card_1.CardTitle, { className: "text-logo" }, "Coverage")),
            React.createElement(card_1.CardContent, null,
                React.createElement("div", { className: "h-48 w-48 mx-auto" },
                    React.createElement(recharts_1.ResponsiveContainer, null,
                        React.createElement(recharts_1.PieChart, null,
                            React.createElement(recharts_1.Pie, { data: requirements.map((r) => ({ name: r.status, value: 1 })), innerRadius: 60, outerRadius: 80, dataKey: "value", nameKey: "name" }, requirements.map((_, index) => (React.createElement(recharts_1.Cell, { key: index, fill: COLORS[index % COLORS.length] })))),
                            React.createElement(recharts_1.Tooltip, { formatter: (value) => `${value}` })))),
                React.createElement("div", { className: "mt-2 text-lg font-semibold text-logo" },
                    coveragePercent,
                    "% Verified"))),
        React.createElement(card_1.Card, { className: "flex-1 p-4 text-center" },
            React.createElement(card_1.CardHeader, null,
                React.createElement(card_1.CardTitle, { className: "text-logo" }, "Readiness")),
            React.createElement(card_1.CardContent, null, isReady ? (React.createElement("div", { className: "text-logo font-semibold text-xl" }, "All items Verified/Closed")) : (React.createElement("div", { className: "text-logo font-semibold text-xl" }, "Not Ready"))))));
}
