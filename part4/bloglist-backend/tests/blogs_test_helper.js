const Blog = require('../models/blog');

const initialBlogs = [
    {
        author: 'Kiril Mishevski',
        title: 'First Blog',
        url: 'localhost',
        likes: 10
    },
    {
        author: 'Kiril Mishevski',
        title: 'Second Blog',
        url: 'localhost',
        likes: 0 
    }
];

const nonExistingId = async () => {
    const blog = new Blog({author: 'Kiril', title: 'Soon deleted', url: 'localhost'});
    await blog.save();
    await blog.deleteOne();

    return blog.id.toString();
};

const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map(blog => blog.toJSON());
};

const lastBlogInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.length > 0
        ? blogs[blogs.length - 1]
        : {};
};

module.exports = {
    initialBlogs,
    nonExistingId,
    blogsInDb,
    lastBlogInDb
};