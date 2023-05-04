const { default: CustomErrorHandler } = require("../../service/customErrorHandler")


const User = require("../../models/users")
const JwtService = require('../../service/jwtService')
const bcrypt = require('bcrypt')
const Joi = require("joi");

const userController = {
    async me(req, res, next) {
        try {
            const user = await User.findOne({ _id: req.user._id }).select('-password -updatedAt -__v');
            if (!user) {
                return res.status(400).json({
                    working: 'user not found in db',
                    reqbody: req.body

                })
            }
            res.json(user);
        } catch(err) {
           return next(err);
        }
    }
}

module.exports = userController;