const dbPool = require('../config/database');
 
const getAllUsers = (StartIndex, MaxRecord, keyword) => {
    if (isNaN(StartIndex)) {
        StartIndex = 0;
    }
    if (isNaN(MaxRecord)) {
        MaxRecord = 99999;
    }
    const SQLQuery = `SELECT * FROM users where Name like "%${keyword}%" or Email like "%${keyword}%" or Address like "%${keyword}%" ORDER BY id LIMIT ${MaxRecord} OFFSET ${StartIndex};`;
    return dbPool.execute(SQLQuery);
    // dbpool.execute('SELECT * FROM users', (err, rows) => {
    //     if(err){
    //         res.json({
    //             message: 'connection failed'
    //         })
    //     }
    //     res.json({
    //             message : 'connection success',
    //             data: rows,
    //     })
    // })
}

const updateUser = (body, idUser) => {
    const SQLQuery = `UPDATE users SET name='${body.name}', email='${body.email}', address='${body.address}' WHERE id=${idUser}`;
    return dbPool.execute(SQLQuery);
}

const createNewUser = (body) => {
    const SQLQuery = `INSERT INTO users (Name, Email, Username, Address, password, RoleId) VALUES ('${body.name}', '${body.email}','${body.username}','${body.address}','${body.password}',${body.RoleId})`;
    return dbPool.execute(SQLQuery);
}

const deleteUser = (idUser) => {
    const SQLQuery = `DELETE FROM users WHERE id=${idUser}`;
    return dbPool.execute(SQLQuery);
}

const isUserDuplicate = async (email) => {
    const SQLQuery = `SELECT COUNT(*) as count FROM users WHERE email='${email}'`;
    const [rows] = await dbPool.execute(SQLQuery);
    return rows[0].count > 0;
}

const validateUserCredentials = async (email, password) => {
    const SQLQuery = `SELECT * FROM users WHERE email='${email}' AND password='${password}'`;
    const [rows] = await dbPool.execute(SQLQuery);
    if (rows.length > 0) {
        return true;
    } else {
        return false;
    }
}

const getUserByEmail = async (email) => {
    const SQLQuery = `SELECT * FROM users WHERE email='${email}'`;
    const [rows] = await dbPool.execute(SQLQuery);
    
    if (rows.length > 0) {
        const pw = rows[0].Password;
        console.log(rows);
        console.log(pw);    
        return rows;
        return pw;
    } else {
        console.log(null);
        return null;
    }
}

const getUserByToken = async (token) => {
    const SQLQuery = `SELECT * FROM users WHERE Token='${token}'`;
    const [rows] = await dbPool.execute(SQLQuery);
    const pw = rows[0].Password;
    if (rows.length > 0) { 
        return rows;
    } else {
        return null;
    }
}

const updateTokenUser = (email, Token) => {
    const SQLQuery = `UPDATE users SET Token='${Token}'WHERE email='${email}'`;
    return dbPool.execute(SQLQuery);
}

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
    isUserDuplicate,
    getUserByEmail,
    updateTokenUser,
    getUserByToken
}