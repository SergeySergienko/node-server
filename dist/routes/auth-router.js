"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("../controllers/auth-controller"));
const validators_1 = require("../validators");
const middlewares_1 = require("../middlewares");
const getAuthRouter = () => {
    const router = express_1.default.Router();
    router.post('/signup', validators_1.authValidator, middlewares_1.getValidationResult, auth_controller_1.default.signup);
    router.post('/login', auth_controller_1.default.login);
    router.post('/logout', auth_controller_1.default.logout);
    router.put('/activate/:link', auth_controller_1.default.activate);
    router.get('/refresh', auth_controller_1.default.refresh);
    return router;
};
exports.getAuthRouter = getAuthRouter;
//# sourceMappingURL=auth-router.js.map