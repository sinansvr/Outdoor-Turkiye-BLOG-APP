


const mongoose = require("mongoose");

const dbConnection = function () {
    mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>console.log("DB Connected"))
    .catch(()=>console.log("DB Not Connected",err))
}

module.exports={
    mongoose,
    dbConnection
}