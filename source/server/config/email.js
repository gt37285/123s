require('./config')
const nodemailer = require('nodemailer');

const sendEmail = (req, res) => {

    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.Email,
            pass: process.env.Password
        }
    });


    const opciones = {
        from: 'request.clientMolino@gmail.com',
        to: req.body.emailAnt,
        subject: 'Cambio de contraseña Postreria el molino',
        html: `<h1 style="text-align: center">Panaderia el Molino</h1>
               <hr><h2>Hola de nuevo ${req.name}</h3><br>
               <p>Se ha solicitado un cambio de contraseña, por favor ingresa el codigo en el espacio solicitado</p><br>
               <p style="font-size: 18px"><b>Codigo:</b> ${req.codigo}</p><br>
               <p>Si no has pedido un cambio de contraseña por favor ignora este mensaje</p>`
    };


    transporter.sendMail(opciones, (err, data) => {
        if (err)
            return res.status(500).json({
                ok: false,
                err
            })
        if(!data)
            return res.status(400).json({
                ok: false,
                message: 'no se encontro el email'
            })
        

        res.json({
            ok: true,
            message: `codigo de desbloqueo enviado al email: ${req.body.emailAnt}`,
            token: req.token
        })
        
    });
};

module.exports = sendEmail;