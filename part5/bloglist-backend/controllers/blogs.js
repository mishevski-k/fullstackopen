const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

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

    if(!(request.user)){
        return response.status(401).json({error: 'No authorization found'});
    }

    const user = request.user;

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
        if(!(request.user)){
            return response.status(401).json({error: 'No authorization found'});
        }
    
        const user = request.user;

        const blog = await Blog.findById(request.params.id);

        if(blog.user.toString() !== user.id.toString()){
            return response.status(403).json({error: '`user` does not hava permission to delete this blog'});
        }
        
        await blog.remove();
        response.status(204).end();
    } catch ( exception ){
        next(exception);
    }
});

module.exports = blogsRouter;