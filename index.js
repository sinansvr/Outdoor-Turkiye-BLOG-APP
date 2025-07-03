"use strict"

const express = require("express")
const app = express()

require("dotenv").config()

app.all("/", (req, res)=>{

    res.status(200).send({
        message: "Api is active"
    })
})

app.listen(8000,()=>console.log)
