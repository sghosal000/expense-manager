const { writeLog } = require('./logger.middleware')

const errorHandler = (error, req, res, next) => {
    const method = req.method
    const url = req.url
    const origin = req.headers.origin
    const statusCode = res.statusCode? res.statusCode: 500
    const errorName = error.name
    const errorMessage = error.message || 'Internal Server Error'
    const message = `${method}\t${url}\t${origin}\t${statusCode}\t${errorName}\t${errorMessage}`

    writeLog('error', message, 'errors.log')
    res.status(statusCode).json({ message: errorMessage })
}

module.exports = { errorHandler }