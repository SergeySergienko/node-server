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
class UsersController {
    findUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield services_1.userService.findUsers();
                return res.json(users);
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { params: { id }, body: { roles }, } = req;
            try {
                const user = yield services_1.userService.updateUser({ id, roles });
                return res.json(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = yield services_1.userService.deleteUser(req.params.id);
                return res.json({ id, message: 'User was deleted successfully' });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new UsersController();
//# sourceMappingURL=users-controller.js.map