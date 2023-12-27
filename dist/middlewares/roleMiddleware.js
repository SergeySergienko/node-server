"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleMiddleware = void 0;
const api_error_1 = require("../exceptions/api-error");
const token_service_1 = __importDefault(require("../services/token-service"));
const roleMiddleware = (roles) => (req, res, next) => {
    var _a;
    if (req.method === 'OPTIONS') {
        next();
    }
    try {
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
        next(error);
    }
};
exports.roleMiddleware = roleMiddleware;
//# sourceMappingURL=roleMiddleware.js.map