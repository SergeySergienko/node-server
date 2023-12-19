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
const db_1 = require("./db");
exports.productsRepo = {
    findProducts(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = {};
            if (title) {
                filter.title = { $regex: title };
            }
            return yield db_1.productCollection.find(filter).toArray();
        });
    },
    findProductsById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.productCollection.findOne({ id });
        });
    },
    createProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.productCollection.insertOne(product);
            return result.insertedId ? product : null;
        });
    },
    updateProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.productCollection.replaceOne({ id: product.id }, product);
            return result.matchedCount === 1;
        });
    },
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.productCollection.deleteOne({ id });
            return result.deletedCount === 1;
        });
    },
};
//# sourceMappingURL=products-db-repo.js.map