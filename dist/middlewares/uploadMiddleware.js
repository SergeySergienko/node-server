"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMiddleware = void 0;
const multer_1 = __importDefault(require("multer"));
const multer_gridfs_storage_1 = require("multer-gridfs-storage");
const constants_1 = require("../repositories/constants");
const uploadMiddleware = () => {
    const storage = new multer_gridfs_storage_1.GridFsStorage({
        url: constants_1.uploadUrl,
        file: (request, file) => {
            if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
                return {
                    bucketName: 'images',
                    // filename: `${Date.now()}_${file.originalname}`,
                    filename: file.originalname,
                };
            }
            else {
                return {
                    bucketName: 'others',
                    filename: `${Date.now()}_${file.originalname}`,
                };
            }
        },
    });
    const upload = (0, multer_1.default)({ storage });
    return upload.array('files');
};
exports.uploadMiddleware = uploadMiddleware;
//# sourceMappingURL=uploadMiddleware.js.map