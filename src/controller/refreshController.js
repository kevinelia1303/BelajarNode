const UsersModel = require('../models/users')


const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken = (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt ) return res.status(400);
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt;

    const [foundUser] = UsersModel.getUserByToken(refreshToken);
    if (foundUser === null) return res.status(403).json({
        message: "Forbidden"
    }); //Unauthorized
    //evaluate the jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.Email !== decoded.Email) return res.sendStatus(403);
            const accessToken = jwt.sign(
                { "email":decoded.Email },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            );
            res.json({ accessToken })
        }
    );
}    

module.exports = { handleRefreshToken };