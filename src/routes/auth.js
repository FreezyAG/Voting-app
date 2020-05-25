const express = require ('express');
const { body } = require ('express-validator');

const authControllers = require ('../controllers/auth');
const User = require ('../models/user');

const router = express.Router();

router.post('/signup',
    [
        body('name').trim().not().isEmpty(),
        body('email').isEmail()
            .withMessage('Please enter a valid email')
            .custom((value, { req }) => {
                return User.findOne({ where: { email: value }})
                    .then(userFound => {
                        if (userFound) {
                            return Promise.reject('Email address already exists!')
                        }
                    })
            })
            .normalizeEmail(),
        body('password').trim().isLength({ min: 5})
    ],
    authControllers.signup)

router.post('/login',
    [
        body('email').isEmail()
            .withMessage('Please enter a valid email')
            .normalizeEmail(),
        body('password').trim().isLength({ min: 5})
    ], 
    authControllers.login)

module.exports = router;