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
    const blog = new Blog({author: 'Kiril', title: 'Soon deleted', link: 'localhost'});
    await blog.save();
    await blog.deleteOne();

    return blog.id.toString();
};

const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map(blog => blog.toJSON());
};

module.exports = {
    initialBlogs,
    nonExistingId,
    blogsInDb
};