"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTestsRouter = void 0;
const express_1 = __importDefault(require("express"));
const repositories_1 = require("../repositories");
const getTestsRouter = () => {
    const router = express_1.default.Router();
    router.delete('/data', (req, res) => {
        repositories_1.testsRepo.deleteProducts();
        res.sendStatus(204);
    });
    return router;
};
exports.getTestsRouter = getTestsRouter;
//# sourceMappingURL=tests-router.js.map