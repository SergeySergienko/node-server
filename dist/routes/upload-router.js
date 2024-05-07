"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUploadRouter = void 0;
const express_1 = __importDefault(require("express"));
const upload_controller_1 = __importDefault(require("../controllers/upload-controller"));
const middlewares_1 = require("../middlewares");
const getUploadRouter = () => {
    const router = express_1.default.Router();
    router.post('/', 
    // authMiddleware,
    (0, middlewares_1.uploadMiddleware)(), upload_controller_1.default.uploadFiles);
    return router;
};
exports.getUploadRouter = getUploadRouter;
//# sourceMappingURL=upload-router.js.map