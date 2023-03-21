const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const blogHelper = require('./blogs_test_helper');

const Blog = require('../models/blog');

const api = supertest(app);

beforeEach(async () => {
    await Blog.deleteMany({});

    let newBlog = new Blog(blogHelper.initialBlogs[0]);
    await newBlog.save();
    newBlog = new Blog(blogHelper.initialBlogs[1]);
    await newBlog.save();
}, 100000);



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

    test('a valid new blog can be created', async () => {
        const newBlog = {
            author: 'Kiril Mishevski',
            title: 'Testing Blog',
            url: 'localhost:3001',
            likes: 13
        };

        await api
            .post('/api/v1/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const blogsAtEnd = await blogHelper.blogsInDb();
        expect(blogsAtEnd).toHaveLength(blogHelper.initialBlogs.length + 1);

        const lastBlog = blogsAtEnd[blogsAtEnd.length - 1];
        console.log(lastBlog);
        expect(lastBlog.author).toBe(newBlog.author);
        expect(lastBlog.title).toBe(newBlog.title);
        expect(lastBlog.url).toBe(newBlog.url);
        expect(lastBlog.likes).toBe(newBlog.likes);
    });

    test('likes parametar will default to 0 if missing', async () => {
        const newBlog = {
            author: 'Kiril Mishevski',
            title: 'testing likes',
            url: 'localhost:3001'
        };

        await api
            .post('/api/v1/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const blogsAtEnd = await blogHelper.blogsInDb();
        const lastBlog = blogsAtEnd[blogsAtEnd.length - 1];

        expect(lastBlog.likes).toBeDefined();
        expect(lastBlog.likes).toEqual(0);
    });
});


afterAll(async () => {
    mongoose.connection.close();
});