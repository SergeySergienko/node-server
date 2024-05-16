"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsRouter = void 0;
const express_1 = __importDefault(require("express"));
const products_controller_1 = __importDefault(require("../controllers/products-controller"));
const middlewares_1 = require("../middlewares");
const validators_1 = require("../validators");
const getProductsRouter = () => {
    const router = express_1.default.Router();
    router.get('/', validators_1.findProductsValidator, middlewares_1.getValidationResult, products_controller_1.default.findProducts);
    router.get('/:id', products_controller_1.default.findProductById);
    router.post('/', (0, middlewares_1.authMiddleware)(['ADMIN', 'OWNER']), validators_1.createProductValidator, middlewares_1.getValidationResult, products_controller_1.default.createProduct);
    router.put('/', (0, middlewares_1.authMiddleware)(['ADMIN', 'OWNER']), validators_1.updateProductValidator, middlewares_1.getValidationResult, products_controller_1.default.updateProduct);
    router.delete('/:id', (0, middlewares_1.authMiddleware)(['ADMIN', 'OWNER']), validators_1.deleteProductValidator, middlewares_1.getValidationResult, products_controller_1.default.deleteProduct);
    return router;
};
exports.getProductsRouter = getProductsRouter;
//# sourceMappingURL=products-router.js.map