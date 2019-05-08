const SERVER_ERROR = (err,res) => {
    res.status(500).json({
        ok: false,
        err
    })
}

const CLIENT_ERROR = res => {
    res.status(400).json({
        ok: false,
        message: `no se encontro informacion en la base de datos`
    })
}

const FORBIDENT_ERROR = res => {
    res.status(401).json({
        ok: false,
        message: 'Acceso no authorizado'
    })
}

module.exports = {
    SERVER_ERROR,
    CLIENT_ERROR,
    FORBIDENT_ERROR
}