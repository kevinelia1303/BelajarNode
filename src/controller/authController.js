const UsersModel = require('../models/users')
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleLogin = async (req, res) => {
    const {body} = req;
    console.log(body);
    if (!body.email || !body.password) return res.status(400).json({ 'message': 'Username and password are required.' });
    const [foundUser] = await UsersModel.getUserByEmail(body.email);
    if (foundUser === null) return res.status(401).json({
        message: "Email doesn't exist"
    }); //Unauthorized
    //evaluate the password
    const match = await bcrypt.compare(body.password, foundUser.Password);
    
    if (match){
        // create JWT
        const accessToken = jwt.sign({ "Email": foundUser.Email }, process.env.ACCESS_TOKEN_SECRET,{ expiresIn: '1d' });
        // res.json({ 'success' : `User ${user} is logged in!`});
        const refreshToken = jwt.sign({ "Email": foundUser.Email }, process.env.REFRESH_TOKEN_SECRET,{ expiresIn: '1d' });
        // res.json({ 'success' : `User ${user} is logged in!`});

        // const otherUsers = usersDB.users.filter(person => person.username !== user);
        // const currentUser = {...foundUser, refreshToken};
        UsersModel.updateTokenUser(body.email, refreshToken)
        // usersDB.setUsers([...otherUsers, currentUser]);
        // await fsPromises.writeFile(
        //     path.join(__dirname, '..', 'model', 'users.json'),
        //     JSON.stringify(usersDB.users)
        // );
        res.cookie('jwt', refreshToken, { maxAge: 24 * 60 * 60 * 1000 });
        res.cookie('aaa', 'bbb', { maxAge: 24 * 60 * 60 * 1000 });
        res.json({ accessToken });
    }else{
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };