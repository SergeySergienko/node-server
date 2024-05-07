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
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
class ProductsController {
    findProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, limit } = req.query;
            try {
                const products = yield services_1.productService.findProducts({ title, limit });
                return res.json(products);
            }
            catch (error) {
                next(error);
            }
        });
    }
    findProductById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield services_1.productService.findProductById(req.params.id);
                return res.json(product);
            }
            catch (error) {
                next(error);
            }
        });
    }
    createProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield services_1.productService.createProduct(req.body);
                return res.status(201).json(product);
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield services_1.productService.updateProduct(req.body);
                return res.json(product);
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = yield services_1.productService.deleteProduct(req.params.id);
                return res.json({ id, message: 'Product was deleted successfully' });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new ProductsController();
//# sourceMappingURL=products-controller.js.map