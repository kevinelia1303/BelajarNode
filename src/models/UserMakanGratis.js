const dbPool = require('../config/database');

const getUserByUsername = async (username) => {
    const SQLQuery = `SELECT users.Id as 'usersId', users.*, roleuser.* FROM users JOIN roleuser on users.RoleId = roleuser.Id WHERE username='${username}'`;
    const [rows] = await dbPool.execute(SQLQuery);
        console.log(rows)  
        return rows;
}

module.exports = {
    getUserByUsername
}