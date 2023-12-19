"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = exports.getProductViewModel = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
const getProductViewModel = ({ id, title, }) => ({
    id,
    title,
});
exports.getProductViewModel = getProductViewModel;
const generateAccessToken = (id, roles) => {
    const payload = { id, roles };
    return jsonwebtoken_1.default.sign(payload, config_1.SECRET_KEY, { expiresIn: '24h' });
};
exports.generateAccessToken = generateAccessToken;
//# sourceMappingURL=utils.js.map