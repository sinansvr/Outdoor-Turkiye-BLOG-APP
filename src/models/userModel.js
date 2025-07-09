"use strict"

const { mongoose } = require("../configs/dbConnection")

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        index: true
    },

    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        index: true
    },

    password: {
        type: String,
        required: true,
        select: false
    },
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    profilePicture: {
        type: String,
        default: "https://www.gravatar.com/avatar/"
    },
    isAdmin: {
        type: Boolean,
        default: false
    },

}, { collection: "users", timestamps: true })

const passwordEncrypt = require("mongoose-bcrypt")

UserSchema.pre("save","update", function (next){

} )

module.exports = mongoose.model("User", UserSchema)