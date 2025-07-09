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

// UserSchema.pre("save","update", function (next){
    
//!     // If this._update is set, it means that the operation is an updateOne.
//!     // If this._update is not set, it means that the operation is a save.

//     const data = this?._update || this

//     const isEmailValidated = data?.email ?  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email): true

//     if (isEmailValidated) {

//         if (data?.password) {

//             // pass == (min 1: lowerCase, upperCase, Numeric, @$!%*?& + min 8 chars)
//             const isPasswordValidated = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(data.password)

//             if (isPasswordValidated) {

//                 this.password = data.password = passwordEncrypt(data.password)
//                 this._update = data // updateOne will wait data from "this._update".

//             } else {

//                 next(new Error('Password not validated.'))
//             }
//         }

//         next() // Allow to save.

//     } else {

//         next(new Error('Email not validated.'))
//     }
// })

UserSchema.pre("save", function (next) {
    const user = this

    // E-mail doğrulama
    const isEmailValidated = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email)
    if (!isEmailValidated) return next(new Error("Email not validated."))

    // Şifre doğrulama (güncellenmişse)
    if (user.isModified("password")) {
        const isPasswordValidated = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(user.password)
        if (!isPasswordValidated) return next(new Error("Password not validated."))

        // Şifreyi hashle
        user.password = passwordEncrypt(user.password)
    }

    next()
})

UserSchema.pre("updateOne", function (next) {
    const data = this.getUpdate()

    // E-mail varsa doğrula
    if (data?.email) {
        const isEmailValidated = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)
        if (!isEmailValidated) return next(new Error("Email not validated."))
    }

    // Şifre varsa doğrula + hashle
    if (data?.password) {
        const isPasswordValidated = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(data.password)
        if (!isPasswordValidated) return next(new Error("Password not validated."))

        data.password = passwordEncrypt(data.password)
        this.setUpdate(data)
    }

    next()
})


module.exports = mongoose.model("User", UserSchema)