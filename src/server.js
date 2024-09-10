require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const router = require('./router')
const mongoose = require('mongoose')
const { resolve } = require('node:path')

const DATABASE_URL = process.env.DATABASE_URL
const SERVER_PORT = process.env.SERVER_PORT

mongoose
	.connect(DATABASE_URL)
	.then(() => console.log('Database connection success!'))
	.catch((error) => console.error('Database connection error!: ' + error))

const app = express()

app.use(express.json())

app.use(cors())
app.use(morgan('dev'))

app.use(express.static(resolve(__dirname, '..', 'uploads')))

app.use(router)

app.listen(SERVER_PORT, () => console.log('Server Running'))
