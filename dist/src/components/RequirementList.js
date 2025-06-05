"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequirementList = RequirementList;
const types_1 = require("../types");
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const select_1 = require("@/components/ui/select");
const lucide_react_1 = require("lucide-react");
function RequirementList({ requirements, onUpdate, onDelete, filteredRequirements, logoColor, }) {
    return (React.createElement(card_1.Card, { className: "overflow-x-auto" },
        React.createElement(card_1.CardHeader, null,
            React.createElement(card_1.CardTitle, { className: "text-logo" }, "Requirements List")),
        React.createElement(card_1.CardContent, { className: "p-0" },
            React.createElement("table", { className: "min-w-full text-sm" },
                React.createElement("thead", { className: "bg-gray-100 text-left font-medium" },
                    React.createElement("tr", null,
                        React.createElement("th", { className: "px-4 py-2 text-logo" }, "ID"),
                        React.createElement("th", { className: "px-4 py-2 text-logo" }, "Title"),
                        React.createElement("th", { className: "px-4 py-2 text-logo" }, "Spec Section"),
                        React.createElement("th", { className: "px-4 py-2 text-logo" }, "Status"),
                        React.createElement("th", { className: "px-4 py-2 text-logo" }, "Comment"),
                        React.createElement("th", { className: "px-4 py-2 text-logo" }, "Actions"))),
                React.createElement("tbody", null,
                    filteredRequirements.map((r) => (React.createElement("tr", { key: r.req_id, className: "border-b last:border-0" },
                        React.createElement("td", { className: "px-4 py-2 font-mono text-xs text-logo" }, r.req_id),
                        React.createElement("td", { className: "px-4 py-2 text-logo" }, r.title),
                        React.createElement("td", { className: "px-4 py-2 text-logo" }, r.spec_section),
                        React.createElement("td", { className: "px-4 py-2" },
                            React.createElement(select_1.Select, { value: r.status, onValueChange: (v) => onUpdate(r.req_id, { status: v }) },
                                React.createElement(select_1.SelectTrigger, { className: "w-32 capitalize border-logo" },
                                    React.createElement(select_1.SelectValue, { className: "text-logo" })),
                                React.createElement(select_1.SelectContent, null, types_1.STATUSES.map((s) => (React.createElement(select_1.SelectItem, { key: s, value: s, className: "capitalize text-logo" }, s)))))),
                        React.createElement("td", { className: "px-4 py-2" },
                            React.createElement(input_1.Input, { value: r.comment, onChange: (e) => onUpdate(r.req_id, { comment: e.target.value }), className: "w-full border-logo focus:ring-logo text-logo" })),
                        React.createElement("td", { className: "px-4 py-2" },
                            React.createElement(button_1.Button, { variant: "ghost", size: "sm", onClick: () => onDelete(r.req_id) },
                                React.createElement(lucide_react_1.Trash, { className: "h-4 w-4", style: { color: logoColor } })))))),
                    filteredRequirements.length === 0 && (React.createElement("tr", null,
                        React.createElement("td", { colSpan: 6, className: "px-4 py-8 text-center text-logo" }, "No requirements match the current filters."))))))));
}
