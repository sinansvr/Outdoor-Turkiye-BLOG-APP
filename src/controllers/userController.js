"use strict"

const User = require("../models/userModel")
const passwordEncrypt = require("../helpers/passwordEncrypt")

module.exports = {
    list: async (req, res) => {
        const data = await User.find()
        res.status(200).send({
            error: false,
            data})
    },

    create: async (req, res)=>{
        const data = User.create()

    },

    read : async (req, res) => {

    },

    update : async (req, res)=> {

    },

    delete : async (req, res) => {

    }

}