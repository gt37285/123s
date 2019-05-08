require('./config/config')
const { conexion } = require('./routes/conexion')
const express = require('express')
const colors = require('colors/safe')
const app = express('');
const path = require('path')
const bodyParser = require('body-parser')
const hbs = require('hbs')

app.use( bodyParser.urlencoded({extended: false}) )
app.use( bodyParser.json() )
app.use( express.static( path.resolve( __dirname,'../../views' ) ) )
app.use( require('./routes/index') )

conexion();

/**configuracion engine de hbs */
app.set( 'view engine', 'hbs' )
hbs.registerPartials( path.resolve( __dirname,'../../views/parciales' ) )
app.use( require('./hbs/routes') )


app.listen( process.env.PORT, () => {
    console.log( colors.magenta('escuhando el puerto: '), colors.yellow( process.env.PORT ) )
})