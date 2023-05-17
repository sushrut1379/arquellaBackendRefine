const { default: CustomErrorHandler } = require("../../service/customErrorHandler")

const db = require('../../models')
const User = db.user;
const RefreshToken = db.refreshToken;


const refreshTokenController = {
    async refreshToken(req, res, next) {
        console.log("login req", req.body)

        try {
            const user = await User.findOne({ where: { email: req.body.email } });
            if (!user) {

                return res.status(400).json({
                    working: 'invalide credential try to new register',
                    reqbody: req.body

                })
            }


            // Toekn
            console.log("token ")
            console.log('user to ver', user)
            const access_token = JwtService.sign({ _id: user.id, email: user.email, role: user.role });
            const refresh_token = JwtService.sign({ _id: user.id, email: user.email, role: user.role }, '1y', REFRESH_TOKEN_SECRET);

            await sequelize
                .sync({ force: false })
                // .sync()
                .then((result) => {
                    RefreshToken.create({ userId: user.id, email: user.email, refreshToken: refresh_token });

                    console.log("swquel created refresh token in db ", result);
                })

                .catch((err) => {
                    console.log(err);
                });

            console.log("access_token", access_token)
            res.status(200).json({
                working: 'login successfully',
                reqbody: req.body,
                access_token: access_token,
                refresh_token: refresh_token,
                user: user

            })



        } catch (err) {
            return next(err);
        }






        // res.status(200).json({
        //     working: 'refresh token working from controller',
        //     reqbody:req.body

        // })

    }
}

module.exports = refreshTokenController;