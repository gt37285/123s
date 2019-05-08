/**
 * PUERTO */

process.env.PORT = process.env.PORT || 3000;

/**
 * Semilla del token
 */

process.env.NODE = process.SeedToken || 'semilla-desarrollo'

/**url de conexion para la base de datos */

process.env.mongoURI = process.env.mongoURI || 'mongodb://localhost:27017/pasteleria'


/**vencimiento token */

process.env.ExpToken = process.env.ExpToken || '1h'

/**Credenciales email */

process.env.Email = process.env.processEmail
process.env.Password = process.env.processPass