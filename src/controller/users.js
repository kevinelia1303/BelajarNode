
const UsersModel = require('../models/users')
const bcrypt = require('bcrypt');

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
            await UsersModel.createNewUser(body);
            res.status(201).json({
                message: 'CREATE new user success',
                data:body
            })
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
    deleteUser
}