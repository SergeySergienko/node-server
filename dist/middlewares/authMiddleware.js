"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const api_error_1 = require("../exceptions/api-error");
const token_service_1 = __importDefault(require("../services/token-service"));
const authMiddleware = (roles) => (req, res, next) => {
    var _a;
    if (req.method === 'OPTIONS') {
        next();
    }
    try {
        const { refreshToken } = req.cookies;
        if (!refreshToken) {
            throw api_error_1.ApiError.UnauthorizedError();
        }
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            throw api_error_1.ApiError.UnauthorizedError();
        }
        const userData = token_service_1.default.validateAccessToken(token);
        if (!userData) {
            throw api_error_1.ApiError.UnauthorizedError();
        }
        let hasRole = false;
        userData.roles.forEach((role) => {
            if (roles.includes(role)) {
                hasRole = true;
            }
        });
        if (!hasRole) {
            throw api_error_1.ApiError.ForbiddenError();
        }
        next();
    }
    catch (error) {
        return next(error);
    }
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=authMiddleware.js.map