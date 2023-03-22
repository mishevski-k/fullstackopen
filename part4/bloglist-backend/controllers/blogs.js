const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

blogsRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({}).populate('user');
        response.json(blogs);
    } catch ( exception ) {
        next(exception);
    }
});

blogsRouter.get('/:id', async (request, response, next) => {
    try {
        const blog = await Blog.findById(request.params.id);

        if(blog){
            response.json(blog);
        }else{
            response.status(404).json({error: 'Cannot find blog'});
        }
    } catch( exception ){
        next(exception);
    }
});

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body;

    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    if(!(decodedToken.id)){
        return response.status(401).json({error: 'token invalid'});
    }

    const user = await User.findById(decodedToken.id);
    body.user = user.id;

    const blog = new Blog(body);
    try {
        const savedBlog = await blog.save();

        user.blogs = user.blogs.concat(savedBlog.id);
        await user.save();

        response.status(201).json(savedBlog);
    } catch ( exception ){
        next(exception);
    }
});

blogsRouter.put('/:id', async (request, response, next) => {
    const blog = request.body;

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true});
        response.json(updatedBlog);
    } catch ( exception ){
        next(exception);
    }

});

blogsRouter.delete('/:id', async (request, response, next ) => {
    try {
        await Blog.findByIdAndRemove(request.params.id);
        response.status(204).end();
    } catch ( exception ){
        next(exception);
    }
});

module.exports = blogsRouter;