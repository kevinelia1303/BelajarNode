
// import { PrismaClient } from '@prisma/client';
const dbPool = require('../config/database');


// const prisma = new PrismaClient()

 
const getAllUsersRole = () => {
    
    const SQLQuery = `SELECT u.Id as 'UserssId', u.name, u.email, u.address, u.password, u.username, u.SekolahId, r.Id, r.Rolename FROM users u JOIN mapping_roleuser mru ON u.Id = mru.UsersId JOIN roleuser r ON mru.RolesId = r.Id;`;
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

// const getAllUsersPrisma = async () => {
//     const users = await prisma.users.findMany({
//         relationLoadStrategy: 'join',
//         include: {
//             roleuser: true
//         }
//     })
//     return users;
// }

const getAllUsers = (StartIndex, MaxRecord, keyword) => {
    if (isNaN(StartIndex)) {
        StartIndex = 0;
    }
    if (isNaN(MaxRecord)) {
        MaxRecord = 99999;
    }
    const SQLQuery = `SELECT users.*, roleuser.rolename, sekolah.NamaSekolah FROM users join roleuser on roleuser.id = users.roleid left join sekolah on sekolah.id=users.sekolahid where Name like "%${keyword}%" or Email like "%${keyword}%" or Address like "%${keyword}%" ORDER BY id DESC LIMIT ${MaxRecord} OFFSET ${StartIndex};`;
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
    const SQLQuery = `UPDATE users SET name='${body.name}', email='${body.email}', username='${body.username}', address='${body.address}', RoleId='${body.RoleId}', SekolahId='${body.SekolahId}' WHERE id=${idUser}`;
    return dbPool.execute(SQLQuery);
}

const CreateMappingRoleUser = (RoleValues ) => {
    const mappingRoleUserQuery = `INSERT INTO mapping_roleuser (UsersId, RolesId) VALUES ?`;
    let values = RoleValues
    
    return dbPool.query(mappingRoleUserQuery, [values]);      
}


const createNewUser = async (body) => {
    const SQLQuery = `INSERT INTO users (Name, Email, Username, Address, password, RoleId, SekolahId) VALUES ('${body.name}', '${body.email}','${body.username}','${body.address}','${body.password}',${body.RoleId},${body.SekolahId});`;
    const [result] = await dbPool.query(SQLQuery);
    return result.insertId;
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
    getUserByToken,
    CreateMappingRoleUser,
    getAllUsersRole
}