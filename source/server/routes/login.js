require('../config/config');
const { SERVER_ERROR, CLIENT_ERROR, FORBIDENT_ERROR } = require('../config/errors');
const express = require('express')
const app = express();
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

app.post('/login/user',(req,res) => {


    Usuario.findOne({email:req.body.email}, (err,data) => {
        if(err) return SERVER_ERROR(err,res)
        if(!data) return FORBIDENT_ERROR(res)

        if( !bcrypt.compareSync(req.body.password, data.password) ) 
            return FORBIDENT_ERROR(res)

        let token = jwt.sign({
            data
        },process.env.NODE,{
            expiresIn: process.env.ExpToken
        })

        res.json({
            ok:true,
            token
        })

    })

})

module.exports = app