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
const services_1 = require("../services");
class ImagesController {
    findImages(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const images = yield services_1.imageService.findImages();
                return res.json(images);
            }
            catch (error) {
                next(error);
            }
        });
    }
    downloadImageByName(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { filename } = req.params;
                const downloadStream = yield services_1.imageService.downloadImageByName(filename);
                downloadStream.on('data', function (data) {
                    return res.status(200).write(data);
                });
                downloadStream.on('error', function () {
                    return res
                        .status(404)
                        .send({ error: `Image with name: ${filename} not found` });
                });
                downloadStream.on('end', () => {
                    return res.end();
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new ImagesController();
//# sourceMappingURL=images-controller.js.map