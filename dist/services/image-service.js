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
exports.imageService = void 0;
const api_error_1 = require("../exceptions/api-error");
const repositories_1 = require("../repositories");
exports.imageService = {
    findImages(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const images = yield repositories_1.imagesRepo.findImages();
            if (!images) {
                throw api_error_1.ApiError.ServerError('Internal Server Error');
            }
            return images;
        });
    },
    findImageByName(filename) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield repositories_1.imagesRepo.findImageByName(filename);
        });
    },
};
//# sourceMappingURL=image-service.js.map