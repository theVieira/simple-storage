require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const router = require('./router')

const SERVER_PORT = process.env.SERVER_PORT

const app = express()

app.use(express.json())

app.use(cors())
app.use(morgan('dev'))

app.use(router)

app.listen(SERVER_PORT, () => console.log('Server Running'))
