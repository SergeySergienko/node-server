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
exports.productsRepo = void 0;
const db_1 = require("../db/db");
const utils_1 = require("../utils");
const delay = (ms) => __awaiter(void 0, void 0, void 0, function* () {
    const start = performance.now();
    while (performance.now() - start < ms) { }
});
exports.productsRepo = {
    findProducts(title) {
        return __awaiter(this, void 0, void 0, function* () {
            let foundProducts = db_1.db.products;
            if (title) {
                yield delay(5000);
                foundProducts = db_1.db.products.filter((p) => p.title.includes(title));
            }
            return foundProducts.map(utils_1.getProductViewModel);
        });
    },
    findProductsById(id) {
        const product = db_1.db.products.find((p) => p.id === +id);
        if (!product)
            return;
        return (0, utils_1.getProductViewModel)(product);
    },
    createProduct(title) {
        const newProduct = {
            id: +new Date(),
            title: title,
            price: 0,
        };
        db_1.db.products.push(newProduct);
        return (0, utils_1.getProductViewModel)(newProduct);
    },
};
//# sourceMappingURL=products-repo.js.map