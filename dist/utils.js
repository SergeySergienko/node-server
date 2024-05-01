"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModelMapper = void 0;
const userModelMapper = (user) => ({
    id: user._id.toString(),
    email: user.email,
    roles: user.roles,
    isActivated: user.isActivated,
    activationLink: user.activationLink,
});
exports.userModelMapper = userModelMapper;
//# sourceMappingURL=utils.js.map