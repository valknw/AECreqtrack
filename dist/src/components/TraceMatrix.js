"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TraceMatrix = TraceMatrix;
const jsx_runtime_1 = require("react/jsx-runtime");
const card_1 = require("./ui/card");
const button_1 = require("./ui/button");
const lucide_react_1 = require("lucide-react");
function TraceMatrix({ requirements, onDelete, logoColor, statuses }) {
    return ((0, jsx_runtime_1.jsxs)(card_1.Card, { className: "overflow-x-auto", children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-logo", children: "Traceability Matrix (Req \u00D7 Status)" }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "p-0", children: (0, jsx_runtime_1.jsxs)("table", { className: "min-w-full text-sm border", children: [(0, jsx_runtime_1.jsx)("thead", { className: "bg-gray-100 text-left font-medium", children: (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { className: "px-4 py-2 text-logo", children: "Req ID" }), statuses.map((s) => ((0, jsx_runtime_1.jsx)("th", { className: "px-4 py-2 capitalize text-logo", children: s }, s))), (0, jsx_runtime_1.jsx)("th", { className: "px-4 py-2 text-logo", children: "Delete" })] }) }), (0, jsx_runtime_1.jsx)("tbody", { children: requirements.map((r) => ((0, jsx_runtime_1.jsxs)("tr", { className: "border-b", children: [(0, jsx_runtime_1.jsx)("td", { className: "px-4 py-2 font-mono text-xs text-logo", children: r.req_id }), statuses.map((s) => ((0, jsx_runtime_1.jsx)("td", { className: "px-4 py-2 text-center text-logo", children: r.status === s ? "✔️" : "" }, s))), (0, jsx_runtime_1.jsx)("td", { className: "px-4 py-2 text-center", children: (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", size: "sm", onClick: () => onDelete(r.req_id), children: (0, jsx_runtime_1.jsx)(lucide_react_1.Trash, { className: "h-4 w-4", style: { color: logoColor } }) }) })] }, r.req_id))) })] }) })] }));
}
