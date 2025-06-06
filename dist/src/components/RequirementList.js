"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequirementList = RequirementList;
const jsx_runtime_1 = require("react/jsx-runtime");
const card_1 = require("./ui/card");
const button_1 = require("./ui/button");
const input_1 = require("./ui/input");
const select_1 = require("./ui/select");
const lucide_react_1 = require("lucide-react");
function highlight(text, query) {
    if (!query)
        return text;
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(`(${escaped})`, "gi");
    const parts = text.split(re);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: parts.map((p, i) => re.test(p) ? ((0, jsx_runtime_1.jsx)("mark", { className: "bg-yellow-200", children: p }, i)) : (p)) }));
}
function RequirementList({ requirements, onUpdate, onDelete, filteredRequirements, logoColor, statuses, search, }) {
    return ((0, jsx_runtime_1.jsxs)(card_1.Card, { className: "overflow-x-auto", children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-logo", children: "Requirements List" }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "p-0", children: (0, jsx_runtime_1.jsxs)("table", { className: "min-w-full text-sm", children: [(0, jsx_runtime_1.jsx)("thead", { className: "bg-gray-100 text-left font-medium", children: (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { className: "px-4 py-2 text-logo", children: "ID" }), (0, jsx_runtime_1.jsx)("th", { className: "px-4 py-2 text-logo", children: "Title" }), (0, jsx_runtime_1.jsx)("th", { className: "px-4 py-2 text-logo", children: "Spec Section" }), (0, jsx_runtime_1.jsx)("th", { className: "px-4 py-2 text-logo", children: "Status" }), (0, jsx_runtime_1.jsx)("th", { className: "px-4 py-2 text-logo", children: "Comment" }), (0, jsx_runtime_1.jsx)("th", { className: "px-4 py-2 text-logo", children: "Actions" })] }) }), (0, jsx_runtime_1.jsxs)("tbody", { children: [filteredRequirements.map((r) => ((0, jsx_runtime_1.jsxs)("tr", { className: "border-b last:border-0 hover:bg-gray-50", children: [(0, jsx_runtime_1.jsx)("td", { className: "px-4 py-2 font-mono text-xs text-logo", children: highlight(r.req_id, search) }), (0, jsx_runtime_1.jsx)("td", { className: "px-4 py-2 text-logo", children: highlight(r.title, search) }), (0, jsx_runtime_1.jsx)("td", { className: "px-4 py-2 text-logo", children: highlight(r.spec_section, search) }), (0, jsx_runtime_1.jsx)("td", { className: "px-4 py-2", children: (0, jsx_runtime_1.jsx)(select_1.Select, { value: r.status, onValueChange: (v) => onUpdate(r.req_id, { status: v }), className: "w-32 capitalize border-logo text-logo", children: statuses.map((s) => ((0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: s, className: "capitalize text-logo", children: s }, s))) }) }), (0, jsx_runtime_1.jsx)("td", { className: "px-4 py-2", children: (0, jsx_runtime_1.jsx)(input_1.Input, { value: r.comment, onChange: (e) => onUpdate(r.req_id, { comment: e.target.value }), className: "w-full border-logo focus:ring-logo text-logo" }) }), (0, jsx_runtime_1.jsx)("td", { className: "px-4 py-2", children: (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", size: "sm", onClick: () => onDelete(r.req_id), children: (0, jsx_runtime_1.jsx)(lucide_react_1.Trash, { className: "h-4 w-4", style: { color: logoColor } }) }) })] }, r.req_id))), filteredRequirements.length === 0 && ((0, jsx_runtime_1.jsx)("tr", { children: (0, jsx_runtime_1.jsx)("td", { colSpan: 6, className: "px-4 py-8 text-center text-logo", children: "No requirements match the current filters." }) }))] })] }) })] }));
}
