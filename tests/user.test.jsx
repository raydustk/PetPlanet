const request = require('supertest');
const app = require('../src/App');

describe('User API Tests', () => {
    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/users/register')
            .send({ username: 'testuser', password: 'password123' });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
    });

    it('should login a user', async () => {
        const res = await request(app)
            .post('/api/users/login')
            .send({ username: 'testuser', password: 'password123' });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });
});
