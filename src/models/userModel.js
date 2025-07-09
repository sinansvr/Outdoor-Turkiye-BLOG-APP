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

const passwordEncrypt = require("../helpers/passwordEncrypt")

UserSchema.pre("save","update", function (next){
    const data = this?.update || this

    const isEmailValidated = data?.email ?  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email): true

    if (isEmailValidated) {

        if (data?.password) {

            // pass == (min 1: lowerCase, upperCase, Numeric, @$!%*?& + min 8 chars)
            const isPasswordValidated = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(data.password)

            if (isPasswordValidated) {

                this.password = data.password = passwordEncrypt(data.password)
                this._update = data // updateOne will wait data from "this._update".

            } else {

                next(new Error('Password not validated.'))
            }
        }

        next() // Allow to save.

    } else {

        next(new Error('Email not validated.'))
    }
})
module.exports = mongoose.model("User", UserSchema)