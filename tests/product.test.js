const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Product = require('../models/Product');

// Tăng thời gian timeout cho toàn bộ các block test lên 10 giây (10000ms)
jest.setTimeout(10000);

describe('Product API CI/CD Test', () => {
    
    beforeAll(async () => {
        // Đợi MongoDB kết nối xong mới chạy test
        await mongoose.connection.asPromise();
        await Product.deleteMany({});
    });

    afterAll(async () => {
        // Đóng kết nối an toàn
        await mongoose.connection.close();
    });

    it('Nên thêm được 1 sản phẩm mới (POST)', async () => {
        const res = await request(app)
            .post('/products')
            .send({ pid: 'P01', pname: 'Laptop Gaming', price: 1500, quantity: 10 });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('pid', 'P01');
    });

    it('Nên lấy được danh sách sản phẩm (GET)', async () => {
        const res = await request(app).get('/products');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(0);
    });
});