"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = require("./db/db");
const routes_1 = require("./routes");
exports.app = (0, express_1.default)();
exports.app
    .use(express_1.default.json())
    .use('/products', (0, routes_1.getProductsRouter)(db_1.db))
    .use('/__test__', (0, routes_1.getTestsRouter)(db_1.db));
//# sourceMappingURL=app.js.map