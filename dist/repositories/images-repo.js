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
exports.imagesRepo = void 0;
const mongodb_1 = require("mongodb");
const _1 = require(".");
exports.imagesRepo = {
    findImages() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield _1.imageCollection.find({}).toArray();
        });
    },
    findImageByName(filename) {
        return __awaiter(this, void 0, void 0, function* () {
            const imageBucket = new mongodb_1.GridFSBucket(_1.uploadsDB, {
                bucketName: 'images',
            });
            const downloadStream = imageBucket.openDownloadStreamByName(filename);
            return downloadStream;
        });
    },
};
//# sourceMappingURL=images-repo.js.map