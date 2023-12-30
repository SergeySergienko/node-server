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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const api_error_1 = require("../exceptions/api-error");
const repositories_1 = require("../repositories");
exports.userService = {
    findUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield repositories_1.usersRepo.findUsers();
            if (!users) {
                throw api_error_1.ApiError.ServerError('Internal Server Error');
            }
            const usersForView = users.map((user) => {
                const { password } = user, rest = __rest(user, ["password"]);
                return rest;
            });
            return usersForView;
        });
    },
    updateUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield repositories_1.usersRepo.updateUser(user);
            if (result.matchedCount !== 1) {
                throw api_error_1.ApiError.NotFound(`Product with id: ${user._id} wasn't found`);
            }
            return user;
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