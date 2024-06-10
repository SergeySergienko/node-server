"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserUpdateMiddleware = void 0;
const api_error_1 = require("../exceptions/api-error");
const token_service_1 = __importDefault(require("../services/token-service"));
const checkUserUpdateMiddleware = (req, res, next) => {
    try {
        const { refreshToken } = req.cookies;
        const userData = token_service_1.default.validateRefreshToken(refreshToken);
        if (req.body.id === (userData === null || userData === void 0 ? void 0 : userData.id)) {
            throw api_error_1.ApiError.ForbiddenError('User is not allowed to update their roles');
        }
        next();
    }
    catch (error) {
        return next(error);
    }
};
exports.checkUserUpdateMiddleware = checkUserUpdateMiddleware;
//# sourceMappingURL=checkUserUpdateMiddleware.js.map