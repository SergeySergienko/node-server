"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsRouter = void 0;
const express_1 = __importDefault(require("express"));
const utils_1 = require("../utils");
const getProductsRouter = (db) => {
    const router = express_1.default.Router();
    router.get('/', (req, res) => {
        let foundProducts = db.products;
        if (req.query.title) {
            foundProducts = db.products.filter((p) => p.title.includes(req.query.title));
        }
        res.json(foundProducts.map(utils_1.getProductViewModel));
    });
    router.get('/:id', (req, res) => {
        const foundProduct = db.products.find((p) => p.id === +req.params.id);
        if (foundProduct) {
            res.json((0, utils_1.getProductViewModel)(foundProduct));
        }
        else {
            res.sendStatus(404);
        }
    });
    router.post('/', (req, res) => {
        if (!req.body.title) {
            res.sendStatus(400);
            return;
        }
        const newProduct = {
            id: +new Date(),
            title: req.body.title,
            price: 0,
        };
        db.products.push(newProduct);
        res.status(201).json((0, utils_1.getProductViewModel)(newProduct));
    });
    return router;
};
exports.getProductsRouter = getProductsRouter;
//# sourceMappingURL=products.js.map