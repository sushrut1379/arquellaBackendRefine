

const JwtService = require('../service/jwtService')

const auth = async (req, res, next) => {
    let authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({
            error: 'token is not present in header',
        })
    }

    const token = authHeader.split(' ')[1];

    try {
        const { _id, role,email } = await JwtService.verify(token);
        const user = {
            _id,
            role,
            email
        }
        req.user = user;
        next();

    } catch(err) {
        return res.status(401).json({
            error: 'unauthorise user ',
        })
    }

}

module.exports= auth;