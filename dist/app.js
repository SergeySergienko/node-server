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
const repositories_1 = require("./repositories");
exports.app = (0, express_1.default)();
exports.app
    .use(express_1.default.json())
    .use((0, cookie_parser_1.default)())
    .use((0, cors_1.default)({
    credentials: true,
    origin: process.env.CLIENT_URL,
}));
exports.app
    .use('/api/auth', (0, routes_1.getAuthRouter)())
    .use('/api/users', (0, routes_1.getUsersRouter)())
    .use('/api/products', (0, routes_1.getProductsRouter)());
exports.app.use(middlewares_1.errorMiddleware);
exports.app.get('/', (req, res) => {
    res.send(`<h1>Hello NodeJS</h1>`);
});
exports.app.post('/upload', repositories_1.upload.single('file'), (req, res) => {
    const file = req.file;
    return res.json({
        message: 'Uploaded',
        id: file === null || file === void 0 ? void 0 : file.id,
        name: file === null || file === void 0 ? void 0 : file.filename,
        contentType: file === null || file === void 0 ? void 0 : file.mimetype,
    });
});
//# sourceMappingURL=app.js.map