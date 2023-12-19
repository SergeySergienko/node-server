"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const middlewares_1 = require("./middlewares");
const routes_1 = require("./routes");
exports.app = (0, express_1.default)();
const queryValidator = (0, express_validator_1.check)('token')
    .if((value, { req }) => req.url.includes('token'))
    .notEmpty()
    .withMessage('Token is required')
    .isNumeric()
    .withMessage('Token should be numeric');
exports.app
    .use(express_1.default.json())
    .use('/auth', (0, routes_1.getAuthRouter)())
    .use('/users', (0, routes_1.getUsersRouter)())
    .use('/products', (0, routes_1.getProductsRouter)())
    .use('/__test__', (0, routes_1.getTestsRouter)());
exports.app.get('/', queryValidator, middlewares_1.getValidationResult, (req, res) => {
    res.send(`<h1>Hello NodeJS</h1>`);
});
//# sourceMappingURL=app.js.map