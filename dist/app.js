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
const addEntity = (entity = 'NodeJS!') => (req, res, next) => {
    //@ts-ignore
    req.entity = entity;
    next();
};
const AuthGuardMiddleware = (token = '123') => (req, res, next) => {
    req.query.token === token ? next() : res.sendStatus(401);
};
exports.app
    .use(express_1.default.json())
    // .use(AuthGuardMiddleware('000'))
    .use(addEntity())
    .use('/products', (0, routes_1.getProductsRouter)())
    .use('/__test__', (0, routes_1.getTestsRouter)());
exports.app.get('/', queryValidator, middlewares_1.getValidationResult, (req, res) => {
    //@ts-ignore
    res.send(`<h1>Hello ${req.entity}</h1>`);
});
//# sourceMappingURL=app.js.map