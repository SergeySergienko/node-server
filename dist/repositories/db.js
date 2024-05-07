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
exports.runDb = exports.imageCollection = exports.uploadsDB = exports.tokenCollection = exports.userCollection = exports.roleCollection = exports.productCollection = void 0;
const mongodb_1 = require("mongodb");
require("dotenv/config");
const user = process.env.mongodb_user;
const password = process.env.mongodb_passwort;
const uri = `mongodb+srv://${user}:${password}@cluster0.oqfu7vk.mongodb.net/?retryWrites=true&w=majority`;
const client = new mongodb_1.MongoClient(uri, {
    serverApi: {
        version: mongodb_1.ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});
exports.productCollection = client
    .db('shop')
    .collection('foods');
exports.roleCollection = client.db('shop').collection('roles');
exports.userCollection = client.db('shop').collection('users');
exports.tokenCollection = client
    .db('shop')
    .collection('tokens');
exports.uploadsDB = client.db('uploads');
exports.imageCollection = exports.uploadsDB.collection('images.files');
function runDb() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const doc = yield client.db('admin').command({ ping: 1 });
            console.log('\x1b[35m%s\x1b[0m', 'Pinged your deployment. You successfully connected to MongoDB!');
        }
        catch (error) {
            console.log(error);
            yield client.close();
        }
    });
}
exports.runDb = runDb;
//# sourceMappingURL=db.js.map