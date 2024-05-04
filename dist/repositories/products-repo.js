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
const mongodb_1 = require("mongodb");
const _1 = require(".");
exports.productsRepo = {
    findProducts(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = {};
            if (title) {
                filter.name = { $regex: title };
            }
            return yield _1.productCollection.find(filter).toArray();
        });
    },
    findProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield _1.productCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
        });
    },
    findProductByTitle(title) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield _1.productCollection.findOne({ name: title });
        });
    },
    createProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield _1.productCollection.insertOne(product);
        });
    },
    updateProduct({ _id, FoodCategory, FoodItem, per100grams, Cals_per100grams, KJ_per100grams, }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield _1.productCollection.updateOne({ _id: new mongodb_1.ObjectId(_id) }, {
                $set: {
                    FoodCategory,
                    FoodItem,
                    per100grams,
                    Cals_per100grams,
                    KJ_per100grams,
                },
            });
        });
    },
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield _1.productCollection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
        });
    },
};
//# sourceMappingURL=products-repo.js.map