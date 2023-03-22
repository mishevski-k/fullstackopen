const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

usersRouter.get('/', async (request, response, next) => {
    try {
        const users = await User.find({});
        response.json(users);
    } catch ( exception ){
        next(exception);
    }
});

usersRouter.post('/', async (request, response, next) => {
    try {
        const body = request.body;

        const password = await bcrypt.hash(body.password, 10);

        body.password = password;

        const user = new User(body);
        const savedUser = await user.save();

        response.status(201).json(savedUser);
    } catch ( exception ){
        next(exception);
    }
});

module.exports = usersRouter;