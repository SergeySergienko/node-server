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
const services_1 = require("../services");
const products_1 = __importDefault(require("../controllers/products"));
const middlewares_1 = require("../middlewares");
const getProductsRouter = () => {
    const router = express_1.default.Router();
    router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const products = yield services_1.productSevice.findProducts(req.query.title);
        res.json(products);
    }));
    router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield services_1.productSevice.findProductsById(+req.params.id);
        if (product) {
            res.status(200).json(product);
        }
        else {
            res.sendStatus(404);
        }
    }));
    router.post('/', (0, middlewares_1.roleMiddleware)(['ADMIN']), products_1.default.createProduct);
    router.put('/', (0, middlewares_1.roleMiddleware)(['ADMIN']), products_1.default.updateProduct);
    router.delete('/:id', (0, middlewares_1.roleMiddleware)(['ADMIN']), products_1.default.deleteProduct);
    return router;
};
exports.getProductsRouter = getProductsRouter;
//# sourceMappingURL=products-router.js.map