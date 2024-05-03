"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImagesRouter = void 0;
const express_1 = __importDefault(require("express"));
const images_controller_1 = __importDefault(require("../controllers/images-controller"));
const getImagesRouter = () => {
    const router = express_1.default.Router();
    router.get('/', images_controller_1.default.findImages);
    router.get('/download/:filename', images_controller_1.default.findImageByName);
    return router;
};
exports.getImagesRouter = getImagesRouter;
//# sourceMappingURL=images-router.js.map