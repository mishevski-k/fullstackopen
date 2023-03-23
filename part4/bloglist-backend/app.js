const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const authRouter = require('./controllers/auth');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

logger.info('Connecting to:', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('Connected to MongoDB');
    })
    .catch((error) => {
        logger.error('Error connecting to MongoDB', error.message);
    });

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/blogs', middleware.userExtractor, blogsRouter);

app.use(middleware.uknownEndpoint);
app.use(middleware.errorHanler);

module.exports = app;