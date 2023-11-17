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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../src/app");
describe('/products', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app).delete('/__test__/data');
    }));
    it('should return 200 & empty array', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app).get('/products').expect(200, []);
    }));
    it('should return 404 for not existing product', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app).get('/products/1').expect(404);
    }));
    it('should NOT create product with incorrect input data', () => __awaiter(void 0, void 0, void 0, function* () {
        const data = { title: '' };
        yield (0, supertest_1.default)(app_1.app).post('/products').send(data).expect(400);
        yield (0, supertest_1.default)(app_1.app).get('/products').expect(200, []);
    }));
    it('should create product with correct input data', () => __awaiter(void 0, void 0, void 0, function* () {
        const data = { title: 'cucumber' };
        const response = yield (0, supertest_1.default)(app_1.app)
            .post('/products')
            .send(data)
            .expect(201);
        const createdCourse = response.body;
        expect(createdCourse).toEqual({
            id: expect.any(Number),
            title: data.title,
        });
        yield (0, supertest_1.default)(app_1.app).get('/products').expect(200, [createdCourse]);
        yield (0, supertest_1.default)(app_1.app)
            .get('/products/' + createdCourse.id)
            .expect(200, createdCourse);
    }));
});
// describe('/', () => {
//   it('should return 200 & text as header', async () => {
//     const response = await request(app).get('/').expect(200);
//     expect(response.text).toContain('<h1>');
//   });
// });
//# sourceMappingURL=products.api.test.js.map