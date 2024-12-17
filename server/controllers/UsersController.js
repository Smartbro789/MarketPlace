const router = express.Router();
const express = require('express');
const bcrypt = require('bcrypt');
const UserModel = require ('../models/Users.js');
const jwt = require('jsonwebtoken');

export const register = async (req, res) => {
    try {
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            userId: req.body.userID,
            fullname: req.body.fullname,
            email: req.body.email,
            passwordHash:hash,
            isAdmin: req.body.isAdmin,
        });

        const user = await doc.save();

        const token = jwt.sign({
                _id:user._id,},
            'secret123',
            {expiresIn: '30d',});

        const {passwordHash, ...UserData} = user._doc;
        res.json({...UserData, token});
    } catch (err){
        console.log(err);
        res.status(500).json({
            message: 'Реєстрація невдала',
        });
    }

}

export const login = async (req, res)=>{
    try{
        const user = await UserModel.findOne({email: req.body.email });
        if (!user) {
            return res.status(404).json({
                message: 'Користувача не знайдено'
            });
        }
        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);
        if (!isValidPass){
            return res.status(403).json({
                message: 'Невірний логін або пароль',
            });
        }

        const token = jwt.sign({_id:user._id,}, 'secret123', {expiresIn: '30d',});
        const {passwordHash, ...userData} = user._doc;
        res.json({
            ...userData, token,
        });

    } catch (err){
        console.log(err);
        res.status(500).json({
            message: 'Авторизація невдала',
        });
    }
}

module.exports = router;

