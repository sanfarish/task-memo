const express = require('express')
const app = express()
const compression = require('compression')
const cors = require('cors')
const helmet = require('helmet')
const logger = require('morgan')
const options = require('./utils/expressJSONOptions')
const api = require('./routes')
const { error, notFound } = require('./middlewares/endHandler')

app.use(logger('dev'))
app.use(helmet())
app.use(cors({ origin: process.env.CORS_ORIGIN }))
app.use(compression())
app.use(express.json(options))

app.use('/favicon.ico', express.static('public/favicon.svg'))
app.use('/api', api)

app.use(error)
app.use('*', notFound)

module.exports = app
