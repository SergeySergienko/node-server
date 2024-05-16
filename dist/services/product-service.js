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
exports.productService = void 0;
const api_error_1 = require("../exceptions/api-error");
const products_repo_1 = require("../repositories/products-repo");
exports.productService = {
    findProducts({ title, limit }) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield products_repo_1.productsRepo.findProducts({ title, limit });
            if (limit && isNaN(+limit)) {
                throw api_error_1.ApiError.BadRequest(400, `Query parameter limit=${limit} is not a number`, [
                    {
                        type: 'field',
                        value: limit,
                        msg: 'query parameter limit must be a number',
                        path: 'limit',
                        location: 'query',
                    },
                ]);
            }
            if (!products) {
                throw api_error_1.ApiError.ServerError('Internal Server Error');
            }
            return products;
        });
    },
    findProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield products_repo_1.productsRepo.findProductById(id);
            if (!product) {
                throw api_error_1.ApiError.NotFound(`Product with id: ${id} wasn't found`);
            }
            return product;
        });
    },
    createProduct({ category, name, units, caloriesPer100g, kjPer100g, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const candidate = yield products_repo_1.productsRepo.findProductByTitle(name);
            if (candidate) {
                throw api_error_1.ApiError.BadRequest(409, `Product with title ${name} already exists`, [
                    {
                        type: 'field',
                        value: name,
                        msg: 'product title must be unique',
                        path: 'title',
                        location: 'body',
                    },
                ]);
            }
            const newProduct = {
                category,
                name,
                units,
                caloriesPer100g,
                kjPer100g,
            };
            const result = yield products_repo_1.productsRepo.createProduct(newProduct);
            if (!result.insertedId)
                throw api_error_1.ApiError.ServerError('Internal Server Error');
            return Object.assign(Object.assign({}, newProduct), { _id: result.insertedId });
        });
    },
    updateProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield products_repo_1.productsRepo.updateProduct(product);
            if (result.matchedCount !== 1) {
                throw api_error_1.ApiError.NotFound(`Product with id: ${product._id} wasn't found`);
            }
            return product;
        });
    },
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield products_repo_1.productsRepo.deleteProduct(id);
            if (result.deletedCount !== 1) {
                throw api_error_1.ApiError.NotFound(`Product with id: ${id} wasn't found`);
            }
            return id;
        });
    },
};
//# sourceMappingURL=product-service.js.map