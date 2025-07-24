"use strict"

const User = require("../models/userModel")
const passwordEncrypt = require("../helpers/passwordEncrypt")

module.exports = {
    list: async (req, res) => {
        // const data = await User.find()

        const data = await res.getModelList(User)
        res.status(200).send({
            error: false,
            data,
            details:res.getModelListDetails(User)
        })
    },

    create: async (req, res) => {

        req.body.isAdmin = false;

        const data = await User.create(req.body)

        res.status(200).send({
            error: false,
            data
        })

    },

    read: async (req, res) => {

        const data = await User.findOne({_id:req.params._id})

    },

    update: async (req, res) => {

    },

    delete: async (req, res) => {

    }

}