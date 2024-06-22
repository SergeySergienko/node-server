"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.database_url = exports.url = exports.uri = void 0;
require("dotenv/config");
const user = process.env.mongodb_user;
const password = process.env.mongodb_passwort;
exports.uri = `mongodb+srv://${user}:${password}@cluster0.oqfu7vk.mongodb.net/?retryWrites=true&w=majority`;
exports.url = `mongodb+srv://${user}:${password}@cluster0.oqfu7vk.mongodb.net/uploads?retryWrites=true&w=majority`;
exports.database_url = process.env.DATABASE_URL;
//# sourceMappingURL=constants.js.map