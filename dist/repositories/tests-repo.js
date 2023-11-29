"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testsRepo = void 0;
const db_1 = require("../db/db");
exports.testsRepo = {
    deleteProducts() {
        db_1.db.products = [];
    },
};
//# sourceMappingURL=tests-repo.js.map