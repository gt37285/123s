const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')


let Schema = mongoose.Schema;

let roles = {
    values: ['USER_ROLE','ADMIN_ROLE'],
    message: '{value} no es un rol valido'
}


let usuarioSchema = new Schema({
    nombre:{
        type: String,
        required: [true,'El nombre es requerido']
    },
    password:{
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    email:{
        type: String,
        required: [true, 'El e-mail es requerido'],
        unique: true
    },
    estado:{
        type: Boolean,
        required: false,
        default: true
    },
    role:{
        type: String,
        default: 'USER_ROLE',
        enum:  roles
    }
})


usuarioSchema.plugin( uniqueValidator, {
    message: '{PATH} debe ser unico' 
})

usuarioSchema.methods.toJSON = function () {
    let object = this.toObject();
    delete object.password;
    return object
}


module.exports = mongoose.model( 'Usuario', usuarioSchema )