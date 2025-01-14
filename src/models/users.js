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
    const SQLQuery = `INSERT INTO users (Name, Email, Address) VALUES ('${body.name}', '${body.email}','${body.address}')`;
    return dbPool.execute(SQLQuery);
}

const deleteUser = (idUser) => {
    const SQLQuery = `DELETE FROM users WHERE id=${idUser}`;
    return dbPool.execute(SQLQuery);
}

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}