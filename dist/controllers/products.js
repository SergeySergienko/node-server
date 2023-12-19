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
    createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.body.title) {
                res.sendStatus(400);
                return;
            }
            const product = yield services_1.productSevice.createProduct(req.body.title);
            if (!product) {
                res.sendStatus(500);
            }
            else if (product === '409') {
                res
                    .status(409)
                    .json({ errorMessage: 'Product with this title already exists' });
            }
            else {
                res.status(201).json(product);
            }
        });
    }
    updateProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, title, price } = req.body;
            if (!id || !title || !price) {
                res.sendStatus(400);
                return;
            }
            const product = yield services_1.productSevice.updateProduct(req.body);
            if (product) {
                res.status(200).json(product);
            }
            else {
                res.sendStatus(404);
            }
        });
    }
    deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const isDeleted = yield services_1.productSevice.deleteProduct(+req.params.id);
            if (isDeleted) {
                res.status(204).send(`Product with id: ${req.params.id} was deleted.`);
            }
            else {
                res.status(404).send(`Product with id: ${req.params.id} wasn't found.`);
            }
        });
    }
}
exports.default = new ProductsController();
//# sourceMappingURL=products.js.map