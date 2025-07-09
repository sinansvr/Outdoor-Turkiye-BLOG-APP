"use strict"

const express = require("express")
const app = express()

// to recieve env variables
require("dotenv").config()
const HOST = process.env?.HOST || '127.0.0.1'
const PORT = process.env?.PORT || 8000

// To accept JSON
app.use(express.json())

// asyncErrors to errorHandler:
require('express-async-errors')

//DB Connection
const {dbConnection} = require("./src/config/dbConnection")
dbConnection()

//Home path
app.all("/", (req, res)=>{

    res.status(200).send({
        message: "Welcome to Outdoor Turkiye Blog App"
    })
})

// errorHandler
app.use(require("./src/middlewares/errorHandler"))

app.listen(PORT, HOST, () => console.log(`http://${HOST}:${PORT}`))
