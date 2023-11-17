import request from 'supertest';
import { app } from '../../src/app';
import { CreateProductDto } from '../../src/models';

describe('/products', () => {
  beforeAll(async () => {
    await request(app).delete('/__test__/data');
  });

  it('should return 200 & empty array', async () => {
    await request(app).get('/products').expect(200, []);
  });

  it('should return 404 for not existing product', async () => {
    await request(app).get('/products/1').expect(404);
  });

  it('should NOT create product with incorrect input data', async () => {
    const data: CreateProductDto = { title: '' };

    await request(app).post('/products').send(data).expect(400);
    await request(app).get('/products').expect(200, []);
  });

  it('should create product with correct input data', async () => {
    const data: CreateProductDto = { title: 'cucumber' };
    const response = await request(app)
      .post('/products')
      .send(data)
      .expect(201);
    const createdCourse = response.body;
    expect(createdCourse).toEqual({
      id: expect.any(Number),
      title: data.title,
    });

    await request(app).get('/products').expect(200, [createdCourse]);
    await request(app)
      .get('/products/' + createdCourse.id)
      .expect(200, createdCourse);
  });
});

// describe('/', () => {
//   it('should return 200 & text as header', async () => {
//     const response = await request(app).get('/').expect(200);
//     expect(response.text).toContain('<h1>');
//   });
// });
