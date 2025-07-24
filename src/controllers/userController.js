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
            details: res.getModelListDetails(User)
        })
    },

    create: async (req, res) => {

        // disallow to be admin
        req.body.isAdmin = false;

        const data = await User.create(req.body)

        res.status(200).send({
            error: false,
            data
        })

    },

    read: async (req, res) => {


        // the user only read self record 
        // let filters={}

        // if (req.user?.isAdmin) filters = {_id:req.user._id}

        const data = await User.findOne({ _id: req.params._id })

        res.status(200).send({
            error: false,
            data
        })

    },

    update: async (req, res) => {

        // let filters = {};

        // if (req.user?.isAdmin){
        //     filters = {_id:req.prams._id}
        //     req.body.isAdmin= false;
        // }

        const data = await User.updateOne({ _id: req.params._id })

        res.status(201).send({
            error: false,
            data,
            new: await User.findOne({ _id: req.params._id })
        })

    },

    delete: async (req, res) => {

        const data = await User.deleteOne({_id:req.params._id})

        res.status(data.deletedCount ? 204 : 404).send({
            error:!data.deletedCount,
            data
        })
    }

}