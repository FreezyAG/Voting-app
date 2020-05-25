const bcrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');
const { validationResult } = require ('express-validator');

const User = require ('../models/user');
const { errorStatusCodeHandler } = require ('../util/util');

// const User = models.User;

exports.signup = async (req, res, next) => {
    try {
        // check validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error ('Validation failed');
            error.statusCode = 422;
            error.data = errors.array()
            throw error;
        };

        // retrieve the request body
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const designation = req.body.designation;
        const clearanceLevel = req.body.clearanceLevel;

        // hash the password
        const hashedPw = await bcrypt.hash(password, 12)

        // create and save new user
        const user = await User.create({
            name: name,
            email: email,
            password: hashedPw,
            designation: designation,
            clearanceLevel: clearanceLevel
        })
        const savedUser = await user.save()

        // send JSON response
        res.status(201).json({
            message: 'User created!',
            userId: savedUser.id
        })
    } catch (err) {
        errorStatusCodeHandler(err);
        next (err);
    };
};

exports.login = async (req, res, next) => {
    try {
        // check validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error ('Validation failed');
            error.statusCode = 422;
            error.data = errors.array()
            throw error;
        };

        // retrieve the request body
        const email = req.body.email;
        const password = req.body.password;
        
        // find user with corresponding email
        const user = await User.findOne({ where: { email: email }})
            if (!user) {
                const error = new Error('User not found!')
                error.statusCode = 401;
                throw error
            };
        
        // compare hashed passwords
        const isEqual = await bcrypt.compare(password, user.password)
            if (!isEqual) {
                const error = new Error('Wrong password.')
                error.statusCode = 401;
                throw error;
            };

        // create a JSON web token that expires in an hour
        const token = jwt.sign(
            {
                email: user.email,
                password: user.password,
                designation: user.designation,
                clearanceLevel: user.clearanceLevel
            },
            'somesupersupersupersecret',
            {
                expiresIn: '1h'
            }
        );

        // send a JSON response
        res.status(200).json({
            message: 'Logged in',
            token: token 
        });
        return;
    } catch (err) {
        errorStatusCodeHandler(err);
        next(err);
        return err;
    };
};