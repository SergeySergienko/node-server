"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const roleMiddleware = (roles) => (req, res, next) => {
    var _a, _b;
    if (req.method === 'OPTIONS') {
        next();
    }
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            return res
                .status(401)
                .json({ errorMessage: 'User is not authenticated' });
        }
        const payload = jsonwebtoken_1.default.verify(token, config_1.SECRET_KEY);
        let hasRole = false;
        (_b = payload.roles) === null || _b === void 0 ? void 0 : _b.forEach((role) => {
            if (roles.includes(role)) {
                hasRole = true;
            }
        });
        if (!hasRole) {
            return res.status(403).json({ errorMessage: 'No access to resource' });
        }
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ errorMessage: 'User is not authenticated' });
    }
};
exports.roleMiddleware = roleMiddleware;
//# sourceMappingURL=roleMiddleware.js.map