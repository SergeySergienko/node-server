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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const api_error_1 = require("../exceptions/api-error");
const repositories_1 = require("../repositories");
const utils_1 = require("../utils");
const mail_service_1 = __importDefault(require("./mail-service"));
const token_service_1 = __importDefault(require("./token-service"));
const auth_repo_1 = require("../repositories/auth-repo");
class AuthService {
    signup({ email, password: userPassword }) {
        return __awaiter(this, void 0, void 0, function* () {
            const candidate = yield repositories_1.usersRepo.findUser('email', email);
            if (candidate) {
                throw api_error_1.ApiError.BadRequest(409, `User with email ${email} already exists`, [
                    {
                        type: 'field',
                        value: email,
                        msg: 'email address must be unique',
                        path: 'email',
                        location: 'body',
                    },
                ]);
            }
            const userRole = yield repositories_1.usersRepo.findRole('ADMIN');
            if (!userRole)
                throw api_error_1.ApiError.NotFound('User role not found');
            const hashPassword = yield bcrypt_1.default.hash(userPassword, 7);
            const identifier = (0, uuid_1.v4)();
            const newUser = {
                email,
                password: hashPassword,
                roles: [userRole.value],
                activationLink: identifier,
                isActivated: false,
            };
            const { insertedId } = yield auth_repo_1.authRepo.createUser(newUser);
            if (!insertedId)
                throw api_error_1.ApiError.ServerError('User was not inserted');
            yield mail_service_1.default.sendActivationMail(email, identifier);
            return (0, utils_1.userModelMapper)(Object.assign(Object.assign({}, newUser), { _id: insertedId }));
        });
    }
    login({ email, password: userPassword }) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = yield repositories_1.usersRepo.findUser('email', email);
            if (!currentUser) {
                throw api_error_1.ApiError.BadRequest(404, 'Incorrect username or password');
            }
            const isPasswordValid = yield bcrypt_1.default.compare(userPassword, currentUser.password);
            if (!isPasswordValid) {
                throw api_error_1.ApiError.BadRequest(404, 'Incorrect username or password');
            }
            if (!currentUser.isActivated || currentUser.activationLink) {
                throw api_error_1.ApiError.ForbiddenError('Account has not yet been activated');
            }
            return (0, utils_1.getUserWithTokens)(currentUser);
        });
    }
    logout(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const { deletedCount } = yield token_service_1.default.removeToken(refreshToken);
            if (deletedCount !== 1) {
                throw api_error_1.ApiError.NotFound('Logout Error');
            }
        });
    }
    activate(activationLink) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = yield repositories_1.usersRepo.findUser('activationLink', activationLink);
            if (!currentUser) {
                throw api_error_1.ApiError.BadRequest(400, 'Activation link is incorrect');
            }
            const result = yield auth_repo_1.authRepo.activateUser(activationLink);
            if (!result.value) {
                throw api_error_1.ApiError.ServerError('User was not activated');
            }
            return (0, utils_1.getUserWithTokens)(result.value);
        });
    }
    refresh(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!refreshToken) {
                throw api_error_1.ApiError.UnauthorizedError();
            }
            const userData = token_service_1.default.validateRefreshToken(refreshToken);
            const tokenFromDb = yield token_service_1.default.findToken(refreshToken);
            if (!userData || !tokenFromDb) {
                throw api_error_1.ApiError.UnauthorizedError();
            }
            const currentUser = yield repositories_1.usersRepo.findUser('email', userData.email);
            if (!currentUser) {
                throw api_error_1.ApiError.UnauthorizedError();
            }
            return (0, utils_1.getUserWithTokens)(currentUser);
        });
    }
}
exports.default = new AuthService();
//# sourceMappingURL=auth-service.js.map