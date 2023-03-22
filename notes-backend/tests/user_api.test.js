const bcrypt = require('bcrypt');
const User = require('../models/user');
const app = require('../app');
const supertest = require('supertest');
const api = supertest(app);
const helper = require('./test_helper');

describe('when there is initially one user in dn', () => {
    beforeEach(async () => {
        await User.deleteMany({});

        const passwordHash = await bcrypt.hash('sekret', 10);
        const user = new User({username: 'root', passwordHash});

        await user.save();
    });

    test('creation succeds with fresh username', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: 'mishevski-k',
            name: 'Kiril Mishevski',
            password: 'sudo'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const usersAtEnd = await helper.usersInDb();

        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

        const usernames = usersAtEnd.map(u => u.username);
        expect(usernames).toContain(newUser.username);
    }); 
});

describe('when there is initially one user in db', () => {
    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'sudo'
        };

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        expect(result.body.error).toContain('expected `username` to be unique');

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toEqual(usersAtStart);
    });
});