require('dotenv').config()

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',')

const corsOptions = {
    origin: (origin, callback) => {
        if(allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('CORS not allowed'))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}

module.exports = corsOptions