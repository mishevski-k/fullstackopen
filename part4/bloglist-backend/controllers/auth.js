const bcrypt = require('bcrypt');
const User = require('../models/user');
const authRouter = require('express').Router();
const jwt = require('jsonwebtoken');

authRouter.post('/login', async (request, response, next) => {
    try {
        const { username, password } = request.body;

        const user = await User.findOne({username});
        const passwordValidate = user === null
            ? false
            : await bcrypt.compare(password, user.password);

        if(!(user && passwordValidate)){
            return response.status(400).json({error: 'invalid username or password'});
        }

        const tokenisedUser = {
            username: user.username,
            id: user.id
        };

        const token = jwt.sign(tokenisedUser, process.env.SECRET, {expiresIn: 24 * 60 * 60});

        response.json({token: token, username: user.username, name: user.name});
    } catch ( exception ){
        next(exception);
    }
});

module.exports = authRouter;