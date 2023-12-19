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
exports.productSevice = void 0;
const products_db_repo_1 = require("../repositories/products-db-repo");
const utils_1 = require("../utils");
exports.productSevice = {
    findProducts(title) {
        return __awaiter(this, void 0, void 0, function* () {
            return products_db_repo_1.productsRepo.findProducts(title);
        });
    },
    findProductsById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return products_db_repo_1.productsRepo.findProductsById(id);
        });
    },
    createProduct(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield this.findProducts();
            const isExist = products.some((p) => p.title === title);
            if (isExist) {
                return '409';
            }
            const newProduct = {
                id: +new Date(),
                title: title,
                price: 0,
            };
            const result = yield products_db_repo_1.productsRepo.createProduct(newProduct);
            return result && (0, utils_1.getProductViewModel)(result);
        });
    },
    updateProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield products_db_repo_1.productsRepo.updateProduct(product);
            return result && (0, utils_1.getProductViewModel)(product);
        });
    },
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield products_db_repo_1.productsRepo.deleteProduct(id);
            return result;
        });
    },
};
//# sourceMappingURL=product-service.js.map