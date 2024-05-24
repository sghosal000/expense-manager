const { format, differenceInMilliseconds } = require('date-fns')
const { v4: uuid } = require('uuid')
const fs = require('fs')
const path = require('path')
const { start } = require('repl')


const writeLog = (level, message, logFileName) => {
    const dateTime = format(new Date(), 'yyyy-MM-dd\tHH:mm:ss')
    const logItem = `[${dateTime}] [${level}] - ${message}\n`
    const logDir = path.join(__dirname, '../logs')
    const logFile = path.join(__dirname, '../logs', logFileName)
    
    try {
        if(!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir)
        }
        fs.appendFileSync(logFile, logItem)
    } catch (error) {
        console.log(error);
    }
}

const logger = (req, res, next) => {
    const method = req.method
    const url = req.url
    const origin = req.headers.origin
    const startTime = new Date()
    
    res.on('finish', () => {
        const statusCode = res.statusCode
        const elapsedTime = differenceInMilliseconds(new Date(), startTime)
        const message = `${method}\t${url}\t${origin}\t${statusCode}\t${elapsedTime}ms`

        const logLevel = process.env.LOG_LEVEL || 'info'
        if(logLevel === 'debug' || logLevel === 'info'){
            writeLog('info', message, 'requests.log')
        } else {
            writeLog(logLevel, message, `${logLevel}.log`)
        }
    })
    next()
}

module.exports = {
    writeLog,
    logger
}