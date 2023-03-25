const mongoose = require('mongoose');
const helper = require('./users_test_helper');
const User = require('../models/user');
const app = require('../app');
const supertest = require('supertest');
const api = supertest(app);
const bcrypt = require('bcrypt');


beforeEach(async () => {
    await User.deleteMany({});
    const root = new User({
        username: 'root',
        password: await bcrypt.hash('sudo', 10)
    });

    await root.save();
});

describe('Invalid users cannot be added', () => {
    test('no username provided', async () => {
        const user = {
            password: 'something'
        };

        const response = await api
            .post('/api/v1/users')
            .send(user)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        expect(response.body.error).toContain('`username` is required');
    });

    test('no password is provided', async () => {
        const user = {
            username: 'something'
        };

        const response = await api
            .post('/api/v1/users')
            .send(user)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        expect(response.body.error).toContain('`password` is required');
    });

    test('username too small', async () => {
        const user = {
            username: 'rr',
            password: 'something'
        };

        const response = await api
            .post('/api/v1/users')
            .send(user)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        expect(response.body.error).toContain('is shorter than the minimum allowed length');
    });

    test('password too small', async () => {
        const user = {
            username: 'something',
            password: '33',
        };

        const response = await api
            .post('/api/v1/users')
            .send(user)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        expect(response.body.error).toContain('is shorter than the minimum allowed length');
    });

    test('username must be unique', async () => {
        const user = {
            username: 'root',
            password: 'sudo'
        };

        const response = await api
            .post('/api/v1/users')
            .send(user)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        expect(response.body.error).toContain('expected `username` to be unique');
    });
});

afterAll(() => {
    mongoose.connection.close();
});