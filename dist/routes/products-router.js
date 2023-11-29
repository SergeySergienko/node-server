"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsRouter = void 0;
const express_1 = __importDefault(require("express"));
const product_service_1 = require("../domain/product-service");
const getProductsRouter = () => {
    const router = express_1.default.Router();
    router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const products = yield product_service_1.productSevice.findProducts(req.query.title);
        res.json(products);
    }));
    router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield product_service_1.productSevice.findProductsById(+req.params.id);
        if (product) {
            res.status(200).json(product);
        }
        else {
            res.sendStatus(404);
        }
    }));
    router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.body.title) {
            res.sendStatus(400);
            return;
        }
        const product = yield product_service_1.productSevice.createProduct(req.body.title);
        if (product) {
            res.status(201).json(product);
        }
        else {
            res.sendStatus(500);
        }
    }));
    router.put('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id, title, price } = req.body;
        if (!id || !title || !price) {
            res.sendStatus(400);
            return;
        }
        const product = yield product_service_1.productSevice.updateProduct(req.body);
        if (product) {
            res.status(200).json(product);
        }
        else {
            res.sendStatus(404);
        }
    }));
    router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const isDeleted = yield product_service_1.productSevice.deleteProduct(+req.params.id);
        if (isDeleted) {
            res.status(204).send(`Product with id: ${req.params.id} was deleted.`);
        }
        else {
            res.status(404).send(`Product with id: ${req.params.id} wasn't found.`);
        }
    }));
    return router;
};
exports.getProductsRouter = getProductsRouter;
//# sourceMappingURL=products-router.js.map