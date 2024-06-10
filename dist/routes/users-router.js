"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersRouter = void 0;
const express_1 = __importDefault(require("express"));
const users_controller_1 = __importDefault(require("../controllers/users-controller"));
const middlewares_1 = require("../middlewares");
const validators_1 = require("../validators");
const getUsersRouter = () => {
    const router = express_1.default.Router();
    router.get('/', (0, middlewares_1.authMiddleware)(['OWNER', 'ADMIN']), users_controller_1.default.findUsers);
    router.put('/', (0, middlewares_1.authMiddleware)(['OWNER']), validators_1.updateUserValidator, middlewares_1.getValidationResult, middlewares_1.checkUserUpdateMiddleware, users_controller_1.default.updateUser);
    router.delete('/:id', (0, middlewares_1.authMiddleware)(['OWNER']), validators_1.deleteUserValidator, middlewares_1.getValidationResult, users_controller_1.default.deleteUser);
    return router;
};
exports.getUsersRouter = getUsersRouter;
//# sourceMappingURL=users-router.js.map