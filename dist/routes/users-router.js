"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersRouter = void 0;
const express_1 = __importDefault(require("express"));
const users_controller_1 = __importDefault(require("../controllers/users-controller"));
const middlewares_1 = require("../middlewares");
const getUsersRouter = () => {
    const router = express_1.default.Router();
    router.get('/', (0, middlewares_1.authMiddleware)(['ADMIN']), users_controller_1.default.findUsers);
    return router;
};
exports.getUsersRouter = getUsersRouter;
//# sourceMappingURL=users-router.js.map