"use strict"

const express = require("express")
const app = express()

require("dotenv").config()
const HOST = process.env?.HOST || '127.0.0.1'
const PORT = process.env?.PORT || 8000

// To accept JSON
app.use(express.json())

//Home path
app.all("/", (req, res)=>{

    res.status(200).send({
        message: "Welcome to Outdoor Turkiye Blog App"
    })
})

// errorHandler
app.use(require("./middlewares/errorHandler"))

app.listen(PORT, HOST, () => console.log(`http://${HOST}:${PORT}`))
