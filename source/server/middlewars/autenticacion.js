require('../config/config')
const { SERVER_ERROR,CLIENT_ERROR } = require('../config/errors')
const jwt = require('jsonwebtoken')


/**verficacion del token de cambio de contraseña */

const verificarUser = (req,res,next) => {

    let token = req.get('token')
    jwt.verify(token,process.env.NODE,(err,data) => {
        if(err) return SERVER_ERROR(err,res)
        if(!data ) return CLIENT_ERROR(err)
        req.data = data
        next();
    })
    
}

/** verificar token de usuario */

const verificarTokenUser = (req,res,next) => {

    let token = req.get('token')
    jwt.verify(token,process.env.NODE,(err,data) => {
        if(err) return SERVER_ERROR(err,res)
        if(!data ) return CLIENT_ERROR(err)

        req.user = data
        next();
    })
}

/**verificacion del rol admin */

const verificarAdminRol = (req,res,next) => {
    let user = req.user.data;

    if(user.role !== 'ADMIN_ROLE')
        return res.status(400).json({
            ok: false,
            message: 'El usuario no es un administrador'
        })
        
    next();
}

module.exports = {
    verificarUser,
    verificarTokenUser,
    verificarAdminRol
}