const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const blogHelper = require('./blogs_test_helper');

const Blog = require('../models/blog');

const api = supertest(app);

beforeEach(async () => {
    Blog.deleteMany({});

    let newBlog = new Blog(blogHelper.initialBlogs[0]);
    await newBlog.save();
    newBlog = new Blog(blogHelper.initialBlogs[1]);
    await newBlog.save();
}, 10000);



describe('blogs', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/v1/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('blogs contain id', async () => {
        const blogs = await blogHelper.blogsInDb();
        const firstBlog = blogs[0];

        expect(firstBlog.id).toBeDefined();
    });
});


afterAll(async () => {
    mongoose.connection.close();
});