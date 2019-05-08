const express = require('express')
const app = express();

app.get('/',(req,res) => {
    res.render('home',{
        style: './css/index.css',
        title: 'Panaderia | Molino'
    })
})

app.get('/quienes-somos',(req,res) => {
    res.render('QuienesSomos',{
        style: './css/QuienesSomos.css',
        title: 'Quienes Somos'
    })
})

app.get('/login',(req,res) => {
    res.render('login',{
        style: './css/login.css',
        title: 'Login'
    })
})

module.exports = app