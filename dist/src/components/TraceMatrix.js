"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TraceMatrix = TraceMatrix;
const types_1 = require("../types");
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
function TraceMatrix({ requirements, onDelete, logoColor }) {
    return (React.createElement(card_1.Card, { className: "overflow-x-auto" },
        React.createElement(card_1.CardHeader, null,
            React.createElement(card_1.CardTitle, { className: "text-logo" }, "Traceability Matrix (Req \u00D7 Status)")),
        React.createElement(card_1.CardContent, { className: "p-0" },
            React.createElement("table", { className: "min-w-full text-sm border" },
                React.createElement("thead", { className: "bg-gray-100 text-left font-medium" },
                    React.createElement("tr", null,
                        React.createElement("th", { className: "px-4 py-2 text-logo" }, "Req ID"),
                        types_1.STATUSES.map((s) => (React.createElement("th", { key: s, className: "px-4 py-2 capitalize text-logo" }, s))),
                        React.createElement("th", { className: "px-4 py-2 text-logo" }, "Delete"))),
                React.createElement("tbody", null, requirements.map((r) => (React.createElement("tr", { key: r.req_id, className: "border-b" },
                    React.createElement("td", { className: "px-4 py-2 font-mono text-xs text-logo" }, r.req_id),
                    types_1.STATUSES.map((s) => (React.createElement("td", { key: s, className: "px-4 py-2 text-center text-logo" }, r.status === s ? "✔️" : ""))),
                    React.createElement("td", { className: "px-4 py-2 text-center" },
                        React.createElement(button_1.Button, { variant: "ghost", size: "sm", onClick: () => onDelete(r.req_id) },
                            React.createElement(lucide_react_1.Trash, { className: "h-4 w-4", style: { color: logoColor } })))))))))));
}
