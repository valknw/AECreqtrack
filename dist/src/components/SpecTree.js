"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecTree = SpecTree;
const sampleData_1 = require("../sampleData");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
function SpecTree({ requirements, selected, onSelect, onDelete, logoColor, }) {
    const sectionRequirements = selected
        ? requirements.filter((r) => r.spec_section === selected)
        : [];
    return (React.createElement("div", { className: "flex gap-4" },
        React.createElement("div", { className: "w-1/4 bg-white p-4 rounded-lg shadow-sm" },
            React.createElement("h2", { className: "font-semibold mb-4 text-logo" }, "Spec Tree"),
            sampleData_1.SPEC_TREE.map((node) => (React.createElement("div", { key: node.section, className: "mb-2" },
                React.createElement("div", { className: "font-medium text-logo" }, node.section),
                React.createElement("ul", { className: "ml-4 list-disc" }, node.children.map((child) => (React.createElement("li", { key: child, className: "text-sm cursor-pointer hover:text-logo", onClick: () => onSelect(child) },
                    "Section ",
                    child)))))))),
        React.createElement("div", { className: "flex-1 bg-white p-4 rounded-lg shadow-sm" }, selected ? (React.createElement(React.Fragment, null,
            React.createElement("h3", { className: "text-xl font-semibold mb-2 text-logo" },
                "Requirements in Section ",
                selected),
            React.createElement("ul", { className: "list-disc ml-4" },
                sectionRequirements.map((r) => (React.createElement("li", { key: r.req_id, className: "text-sm mb-1 flex justify-between items-center" },
                    React.createElement("span", null,
                        React.createElement("span", { className: "font-mono text-xs text-logo" }, r.req_id),
                        ": ",
                        React.createElement("span", { className: "text-logo" }, r.title),
                        " (",
                        React.createElement("span", { className: "text-logo" }, r.status),
                        ")"),
                    React.createElement(button_1.Button, { variant: "ghost", size: "sm", onClick: () => onDelete(r.req_id) },
                        React.createElement(lucide_react_1.Trash, { className: "h-4 w-4", style: { color: logoColor } }))))),
                sectionRequirements.length === 0 && (React.createElement("li", { className: "text-logo" }, "No requirements in this section."))))) : (React.createElement("p", { className: "text-logo" }, "Click a section to view requirements.")))));
}
