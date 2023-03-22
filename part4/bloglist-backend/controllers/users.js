const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

usersRouter.get('/', async (request, response, next) => {
    try {
        const users = await User.find({}).populate('blogs');
        response.json(users);
    } catch ( exception ){
        next(exception);
    }
});

usersRouter.post('/', async (request, response, next) => {
    try {
        const body = request.body;

        if(!(body.password)){
            return response.status(400).json({error: 'User validation failed: password: Path `password` is required.'});
        }

        if(body.password.length < 3){
            return response.status(400).json({error: 'User validation failed: password: Path `password` is shorter than the minimum allowed length (3)'});
        }

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