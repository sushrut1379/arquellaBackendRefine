


const User = require("../../models/users")
const JwtService = require('../../service/jwtService')
const bcrypt = require('bcrypt')
const Joi = require("joi");
const { resource } = require("../../app");

const getUserController = {
    async getUsers(req, res, next) {
        try {

            const user = await User.find({}).select('-password -updatedAt -__v');
            console.log("user credential", req.user._id, req.user.role)
            if (req.user.role == "user") {
                return res.status(400).json({
                    error: 'you have no permission for this service',
                    reqbody: req.body

                })

            }
            if (!user) {
                return res.status(400).json({
                    working: 'user not found in db',
                    reqbody: req.body

                })
            }
          res.json(user);



        } catch (err) {
            return next(err);
        }


    }
};

const updateUserController = {
    async updateUsers(req, res, next) {
        try {

            console.log("req body to check payload", req.body)
            console.log("user credential", req.user._id, req.user.role)
            if (req.user.role == "user") {
                return res.status(400).json({
                    error: 'you have no permission for this service',
                    reqbody: req.body
                })
            }


            if (req.user.role == "admin") {
                await User.findByIdAndUpdate(req.body.userId, {
                    userName: req.body.userName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    userImage: req.body.userImage,
                }).then(ress => {
                    console.log("successfulley", ress)
                    res.status(200).json({
                        success: 'successfully updated in Database......',
                    })
                }).catch(ress => {
                    console.log("error in updating", ress)
                    res.status(500).json({
                        error: 'sorry unsuccessful.....Database Error',
                    })
                });

            }
        } catch (err) {
            console.log("error catch block", err)
            return res.status(500).json({
                error: 'sorry unsuccessful.....Database Error',
            })
        }
    }
}

module.exports = { getUserController, updateUserController };
