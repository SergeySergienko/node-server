"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Role = new mongoose_1.Schema({
    value: { type: String, unique: true, default: 'USER' },
});
exports.default = (0, mongoose_1.model)('Role', Role);
//# sourceMappingURL=Role.js.map