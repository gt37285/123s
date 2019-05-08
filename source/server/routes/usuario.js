const { SERVER_ERROR,CLIENT_ERROR,FORBIDENT_ERROR } = require('../config/errors')
const { verificarUser,verificarTokenUser,verificarAdminRol } = require('../middlewars/autenticacion')
const emailRequest = require('../config/email')
const express = require('express');
const app = express();
const bcrypt = require('bcryptjs')
const _ = require('underscore')
const jwt = require('jsonwebtoken')
let Usuario = require('../models/usuario');


/**obtener todos los usuarios paginados */
app.get('/usuario', verificarTokenUser, (req,res) => {

    let limite = Number(req.query.limite) || 5;
    let hasta  = Number (req.query.hasta) || 0;

    Usuario.find({},'nombre email')
           .skip( hasta )
           .limit( limite )
           .exec((err,data)=>{
                if(err) return SERVER_ERROR(err,res)

                Usuario.count( (err,cantidad) => {

                    if(err) return SERVER_ERROR(err,res)

                    res.json({
                        ok: true,
                        cantidad,
                        usuarios: data
                    })
                })
           })
});

/**Obtener un usuario por ID */


app.get('/usuario/:id',verificarTokenUser, (req,res) => {

    let id = req.params.id

    Usuario.findById( id,(err,data) => {

        if(err) return SERVER_ERROR(err,res)

        if(!data) return CLIENT_ERROR(res)
        
        res.json({
            ok: true,
            usuario: data
        })
    })
})

/**Registra un nuevo usuario
 * solo administradores pueden crear un usuario
 */

app.post('/usuario', [verificarTokenUser,verificarAdminRol],(req,res) => {
    let body = req.body
    
    let usuario = new Usuario({
        nombre: body.nombre,
        password: bcrypt.hashSync( body.password, 10),
        email: body.email,
        estado: body.estado,
        role: body.role
    })

    usuario.save( (err,data) => {

        if(err) return SERVER_ERROR(err,res)

        if(!data) return CLIENT_ERROR(res)

        res.json({
            ok: true,
            usuario: data
        })
    })
});



/** Cambiar correo y contraseña en caso de perdida u olvido mediante el metodo de 2 pasos*/

/**Servicio genera el codigo de seguridad siempre y cuando encuentre el email en la base de datos*/

app.put('/usuario/forget', (req,res) => {

    let emailAnt = req.body.emailAnt

    Usuario.findOne({email: emailAnt}, (err,data) => {
        if(err) return SERVER_ERROR(err,res)
        if(!data) return CLIENT_ERROR(res)

        req.codigo = (parseInt(Math.random() * 99999 )).toString()
        cod = req.codigo;
        req.name = data.nombre

        let info = {
            emailAnt,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password,10),
            codigo: bcrypt.hashSync(req.codigo,10)
        }

        req.token = jwt.sign({
            info 
        },process.env.NODE,{
            expiresIn: process.env.ExpToken
        })
        
        emailRequest(req,res)
    })
})



/**Servicio cambia el correo y la contraseña siempre y cuando el middleware del token valide el codigo */

app.put('/usuario/forget/validation', verificarUser, (req,res) => {

    let data = req.data.info
    let codigo = req.body.codigo

    if( !bcrypt.compareSync(codigo,data.codigo) ) 
        return res.status(500).json({
            ok: false,
            message: 'codigo de seguridad invalido'
        })
    
    let body = {
        email: data.email,
        password: data.password
    }
    
    
    Usuario.findOneAndUpdate({email:data.emailAnt}, body ,{new:true} , (err,info) => {
        if(err) return SERVER_ERROR(err,res)

        if(!info) return CLIENT_ERROR(res)
        
        info.save((err,dataDB) => {
            if(err) return SERVER_ERROR(err,res)

            res.json({
                ok: true,
                message: 'datos actualizados correctamente'
            })
        })
    })

})

/**Actualizar usuario en la base de datos execto email password y estado
 * solo administradores pueden actualizar informacion
 */

app.put('/usuario/:id', [verificarTokenUser,verificarAdminRol], (req,res) => {

    let id = req.params.id
    let body = _.omit( req.body, ['email','password','estado'] )

    Usuario.findByIdAndUpdate( id, body, {new: true, runValidators: true}, (err,data) => {

        if(err) return SERVER_ERROR(err,res)

        if( !data ) return CLIENT_ERROR(res)
        
        data.save((err,dataDB) => {

            if(err) return SERVER_ERROR(err,res)

            res.json({
                ok: true,
                message: 'usuario actualizado correctamente',
                usuario: dataDB 
            })
        })
    })
})


/**Cambiar el estado activo de un usuario
 * solo administradores pueden eliminar informacion
 */

app.delete('/usuario/:id', [verificarTokenUser,verificarAdminRol], (req,res) => {
    
    let id = req.params.id

    Usuario.findByIdAndUpdate(id, {estado: false} ,{new:true} , (err,data) => {

        if(err) return SERVER_ERROR(err,res)

        if(!data) return CLIENT_ERROR(res)
        
        data.save((err,dataDB) => {
            if(err) return SERVER_ERROR(err,res)

            res.json({
                ok: true,
                message: 'estado del usuario ahora es inactivo',
                usuario: dataDB
            })
        })
    })
})



module.exports = app;