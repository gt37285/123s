require('../config/config')
const mongoose = require('mongoose')
const colors = require('colors')

const conexion = () => {

    mongoose.connect( process.env.mongoURI ,{
        useCreateIndex: true,
        useNewUrlParser: true
    }).then( db => console.log( 'database connect'.cyan ) ) 
      .catch( err => console.log( err.red ) )
}


module.exports = {
    conexion
};


