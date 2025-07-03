"use strict"

const express = require("express")
const app = express()

app.all("/", (req, res)=>{

    res.status(200).send({
        message: "Api is active"
    })
})

app.listen(8000,()=>console.log)
