const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const blogHelper = require('./blogs_test_helper');
const bcrypt = require('bcrypt');

const Blog = require('../models/blog');
const User = require('../models/user');

const api = supertest(app);

const getRootUser = async () => {
    const rootUser = {
        username: 'roki',
        password: 'sudo'
    };

    const response = await api
        .post('/api/v1/auth/login')
        .send(rootUser);

    return response.body;
}

beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});

    let rootUser = {
        username: 'roki',
        password: 'sudo'
    };

    await api
    .post('/api/v1/users')
    .send(rootUser)
    .expect(201)
    .expect('Content-Type', /application\/json/);


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

        const user = await getRootUser();

        const newBlog = {
            author: 'Kiril Mishevski',
            title: 'Testing Blog',
            url: 'localhost:3001',
            likes: 13
        };

        await api
            .post('/api/v1/blogs')
            .auth(user.token, {type: 'bearer'})
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const blogsAtEnd = await blogHelper.blogsInDb();
        expect(blogsAtEnd).toHaveLength(blogHelper.initialBlogs.length + 1);

        const lastBlog = blogsAtEnd[blogsAtEnd.length - 1];

        expect(lastBlog.author).toBe(newBlog.author);
        expect(lastBlog.title).toBe(newBlog.title);
        expect(lastBlog.url).toBe(newBlog.url);
        expect(lastBlog.likes).toBe(newBlog.likes);
    });

    test('likes parametar will default to 0 if missing', async () => {

        const user = await getRootUser();


        const newBlog = {
            author: 'Kiril Mishevski',
            title: 'testing likes',
            url: 'localhost:3001'
        };

        await api
            .post('/api/v1/blogs')
            .auth(user.token, {type: 'bearer'})
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const lastBlog = await blogHelper.lastBlogInDb();

        expect(lastBlog.likes).toBeDefined();
        expect(lastBlog.likes).toEqual(0);
    });

    test('cant create blog without title', async () => {
        const user = await getRootUser();

        const newBlog = {
            author: 'Kiril Mishevski',
            url: 'localhost'
        };

        await api  
            .post('/api/v1/blogs')
            .auth(user.token, {type: 'bearer'})
            .send(newBlog)
            .expect(400);
    });

    test('cant create blog without url', async () => {
        const user = await getRootUser();

        const newBlog = {
            author: 'Kiril Mishevski',
            title: 'Missing url',
        };

        await api   
            .post('/api/v1/blogs')
            .auth(user.token, {type: 'bearer'})
            .send(newBlog)
            .expect(400);
    });

    test('to delete a blog', async () => {
        const user = await getRootUser();

        const blogToDelete = {
            author: 'Kiril Mishevski',
            title: 'to be deleted',
            url: 'localhost'
        };

        const savedBlog = await api  
            .post('/api/v1/blogs')
            .auth(user.token, {type: 'bearer'})
            .send(blogToDelete)
            .expect(201);

        const blogsAtStart = await blogHelper.blogsInDb();

        await api
            .delete(`/api/v1/blogs/${savedBlog.body.id}`)
            .auth(user.token, {type: 'bearer'})
            .expect(204);

        const blogsAtEnd = await blogHelper.blogsInDb();
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);

        const ids = blogsAtEnd.map(blog => blog.id);
        expect(ids).not.toContain(savedBlog.body.id);
    });

    test('to update a blog', async () => {

        const blogsAtStart = await blogHelper.blogsInDb();
        const blogToUpdate = blogsAtStart[0];

        blogToUpdate.title = 'Updated for test';

        await api
            .put(`/api/v1/blogs/${blogToUpdate.id}`)
            .send(blogToUpdate)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const blogsAtEnd = await blogHelper.blogsInDb();
        const blogShouldBeUpdated = blogsAtEnd[0];

        expect(blogShouldBeUpdated).toEqual(blogToUpdate);
    });

    test('check deleted id if can be viewed', async () => {
        const deletedId = await blogHelper.nonExistingId();

        await api
            .get(`/api/v1/blogs/${deletedId}`)
            .expect(404);
    });

    test('check non existing id if casting error', async () => {
        const randomId = Math.random() * 346;

        await api
            .get(`/api/v1/blogs/${randomId}`)
            .expect(400);
    });

    test('check if validation url works for updating blog', async () => {
        
        const blogsAtStart = await blogHelper.blogsInDb();
        const blogForUpdating = blogsAtStart[0];
        blogForUpdating.url = '';

        await api
            .put(`/api/v1/blogs/${blogForUpdating.id}`)
            .send(blogForUpdating)
            .expect(400);
    });

    test('check if validation title works for updating blog', async () => {
        const blogsAtStart = await blogHelper.blogsInDb();
        const blogForUpdating = blogsAtStart[0];
        blogForUpdating.title = '';

        await api
            .put(`/api/v1/blogs/${blogForUpdating.id}`)
            .send(blogForUpdating)
            .expect(400);
    });
});


afterAll(async () => {
    mongoose.connection.close();
});