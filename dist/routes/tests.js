"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTestsRouter = void 0;
const express_1 = __importDefault(require("express"));
const getTestsRouter = (db) => {
    const router = express_1.default.Router();
    router.delete('/data', (req, res) => {
        db.products = [];
        res.sendStatus(204);
    });
    return router;
};
exports.getTestsRouter = getTestsRouter;
//# sourceMappingURL=tests.js.map