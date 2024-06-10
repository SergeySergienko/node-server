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
exports.userService = void 0;
const api_error_1 = require("../exceptions/api-error");
const repositories_1 = require("../repositories");
const utils_1 = require("../utils");
exports.userService = {
    findUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield repositories_1.usersRepo.findUsers();
            if (!users) {
                throw api_error_1.ApiError.ServerError('Internal Server Error');
            }
            const usersForView = users.map(utils_1.userModelMapper);
            return usersForView;
        });
    },
    updateUser(userDataToUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedUser = yield repositories_1.usersRepo.updateUser(userDataToUpdate);
            if (!updatedUser) {
                throw api_error_1.ApiError.NotFound(`User with id: ${userDataToUpdate.id} wasn't found`);
            }
            return (0, utils_1.userModelMapper)(updatedUser);
        });
    },
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield repositories_1.usersRepo.deleteUser(id);
            if (result.deletedCount !== 1) {
                throw api_error_1.ApiError.NotFound(`User with id: ${id} wasn't found`);
            }
            return id;
        });
    },
};
//# sourceMappingURL=user-service.js.map