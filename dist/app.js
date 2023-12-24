"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = require("./routes");
const middlewares_1 = require("./middlewares");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json()).use((0, cookie_parser_1.default)()).use((0, cors_1.default)());
exports.app
    .use('/auth', (0, routes_1.getAuthRouter)())
    .use('/users', (0, routes_1.getUsersRouter)())
    .use('/products', (0, routes_1.getProductsRouter)())
    .use('/__test__', (0, routes_1.getTestsRouter)());
exports.app.use(middlewares_1.errorMiddleware);
exports.app.get('/', (req, res) => {
    res.send(`<h1>Hello NodeJS</h1>`);
});
//# sourceMappingURL=app.js.map