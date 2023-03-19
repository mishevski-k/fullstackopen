require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

console.log(`Connecting to MongoDB: ${url}`);

mongoose.connect(url)
    .then( () => {
        console.log('Connected to MongoDB');
    });


const requestLogger = (request, reponse, next) => {
    console.log(`${request.method}: ${request.path}`, request.body);
    next();
};

app.use(cors());
app.use(express.json());
app.use(requestLogger);

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true,
    },
    likes: Number
});

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const Blog = mongoose.model('Blog', blogSchema);

app.get('/api/v1/blogs', (request, response) => {
    Blog.find({})
        .then(blogs => {
            response.json(blogs);
        });
});

app.post('/api/v1/blogs', (request, response, next) => {
    const blog = new Blog(request.body);

    blog.save()
        .then(savedBlog => {
            response.status(201).json(savedBlog);
        })
        .catch(error => next(error));
});

const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if(error.name === 'CastError'){
        response.status(400).json({error: 'malformatted id'});
    }else if(error.name === 'ValidationError'){
        response.status(400).json({error: error.message});
    }

    next();
};

app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`Server runnin on port ${process.env.PORT}`);
});