const UsersModel = require('../models/users')


const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleLogout = (req, res) => {
    // On client, also delete the accessToken
    const cookies = req.cookies;
    if (!cookies?.jwt ) return res.sendStatus(204);//No content
    
    const refreshToken = cookies.jwt;

    //Is refreshToken in db?
    const [foundUser] = UsersModel.getUserByToken(refreshToken);
    if (foundUser === null) {
        res.clearCookie('jwt', { httpOnly:true, sameSite: 'None',secure: true });
        return res.sendStatus(204);
    } 
    
    // Delete refreshToken in db
    const otherUsers = foundUser.Token;
    
}    

module.exports = { handleRefreshToken };