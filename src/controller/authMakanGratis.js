const UsersModel = require('../models/UserMakanGratis')
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleLoginMakanGratis = async (req, res) => {
    const {body} = req;
    console.log(body)
    if (!body.username || !body.password) return res.status(400).json({ 'message': 'Username and password are required.' });
    const [foundUser] = await UsersModel.getUserByUsername(body.username);


    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly:true });
        return res.status(401).json({
            IsSuccess: false,
            message: "Username doesn't exist"
        }); //Unauthorized
    }
    
    //evaluate the password
    const match = await bcrypt.compare(body.password, foundUser.Password);

    if (match){
        // create JWT
        const accessToken = jwt.sign({ "Email": foundUser.username }, process.env.ACCESS_TOKEN_SECRET,{ expiresIn: '30s' });
        // res.json({ 'success' : `User ${user} is logged in!`});
        const refreshToken = jwt.sign({ "Email": foundUser.username }, process.env.REFRESH_TOKEN_SECRET,{ expiresIn: '1d' });
        // res.json({ 'success' : `User ${user} is logged in!`});

        // const otherUsers = usersDB.users.filter(person => person.username !== user);
        // const currentUser = {...foundUser, refreshToken};
        // UsersModel.updateTokenUser(body.username, refreshToken)
        // usersDB.setUsers([...otherUsers, currentUser]);
        // await fsPromises.writeFile(
        //     path.join(__dirname, '..', 'model', 'users.json'),
        //     JSON.stringify(usersDB.users)
        // );
        res.cookie('jwt', accessToken, { maxAge: 24 * 60 * 60 * 1000 });
        res.status(200).json({ 
            IsSuccess: true, 
            "IdUser":foundUser.usersId,
            "Role": foundUser.RoleName,
            accessToken
        });
    }else{
        res.status(401).json({
            IsSuccess: false,
            message: "Password is incorrect"
        });
    }
}

module.exports = { handleLoginMakanGratis };