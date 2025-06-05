"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STATUSES = exports.Status = void 0;
var Status;
(function (Status) {
    Status["Draft"] = "draft";
    Status["Approved"] = "approved";
    Status["Implemented"] = "implemented";
    Status["Verified"] = "verified";
    Status["Closed"] = "closed";
})(Status || (exports.Status = Status = {}));
exports.STATUSES = [
    Status.Draft,
    Status.Approved,
    Status.Implemented,
    Status.Verified,
    Status.Closed,
];
