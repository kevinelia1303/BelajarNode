
const UsersModel = require('../models/users')
const bcrypt = require('bcrypt');

const getAllUsersRole = async (req,res) => {
    try {
        const [datas] = await UsersModel.getAllUsersRole();
        console.log("Length : ",datas.length);
        
        if (datas.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }

        // Log usersMap to see how users are grouped
        

        // Group users by UsersId
        const usersMap = {};

        datas.forEach(user => {
            console.log(user.name);  // Log each user's name
          });
        

        datas.forEach(row => {
            if (!usersMap[row.UserssId]) {
                usersMap[row.UserssId] = {
                    UsersId: row.UserssId,
                    name: row.name,
                    email: row.email,
                    address: row.address,
                    password: row.password,
                    username: row.username,
                    SekolahId: row.SekolahId,
                    Roles: []
                };
            }

            // Avoid duplicates by checking if the role already exists for the user
            if (!usersMap[row.UserssId].Roles.some(role => role.Rolename === row.Rolename)) {
                usersMap[row.UserssId].Roles.push({
                    RolesId: row.RolesId,
                    Rolename: row.Rolename
                });
            }
        });

        console.log('Users Grouped:', usersMap);

        // Convert the usersMap object into an array
        const users = Object.values(usersMap);

        res.json({
            message: 'GET all users success',
            data:users
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error
        })
    }

}

const getAllUsers = async (req,res) => {
    try {
        let StartIndex = req.query.StartIndex;
        let MaxRecord = req.query.MaxRecord;
        let keyword = req.query.keyword;

        if (isNaN(StartIndex)) {
            StartIndex = 0;
        }
        if (isNaN(MaxRecord)) {
            MaxRecord = 99999;
        }
        
        const [data] = await UsersModel.getAllUsers(StartIndex, MaxRecord, keyword);
        res.json({
            message: 'GET all users success',
            data:data
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error
        })
    }

}

const createNewUser = async (req,res) => {
    // console.log(req.body);
    const { Roles } = req.body;
    console.log(Roles);
    
    const {body} = req;
    
    if (!body.email || !body.name || !body.address || !body.password) {
        return res.status(400).json({
            message: 'Anda mengirimkan data yang salah'
        })
    }

    const duplicate = await UsersModel.isUserDuplicate(body.email);
    console.log(duplicate);
    if (duplicate === true) {
        return res.status(409).json({
            message: 'Email is already in the database.',
        });
    } else {
        body.password = await bcrypt.hash(body.password, 10);

        try {
            // await UsersModel.createNewUser(body);
            
            const result = await UsersModel.createNewUser(body);
            console.log("ID USER : ",result);

            const RoleValues = Roles.map(({ RolesId }) => [result, RolesId]);
            console.log("VALUES : ",RoleValues);
            await UsersModel.CreateMappingRoleUser(RoleValues);

            res.status(201).json({
                message: 'CREATE new user success',
                data: body,
                id: result
            });
        } catch (error) {
            res.status(500).json({
                message: 'Server Error',
                serverMessage: error
            })
        }
    }
}

const updateUser = async (req,res) => {
    const {idUser} = req.params;
    const {body} = req;
    try {
        await UsersModel.updateUser(body, idUser);
        res.status(201).json({
            message: 'UPDATE user success',
            data: {
                id: idUser,
                ...body
            },
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error
        })
    }    
}

const deleteUser = async (req,res)=>{
    const {idUser} = req.params;
    try {
        await UsersModel.deleteUser(idUser);
        res.json({
            message: 'DELETE user success',
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error
        })
    }
    
}

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
    getAllUsersRole
}