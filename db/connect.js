const mongoose = require("mongoose")

const dbConnect = async () => {
    if(process.env.MODE === "development") {
        await mongoose.connect(process.env.MONGO_DEV)
        .then(res => {
            console.log(`local mongodb connected`)
        }).catch(err => console.log(err.message))
    }


    //cloud db => mode is production

    if(process.env.MODE === "production") {
        await mongoose.connect(process.env.MONGO_URL)
        .then(res => {
            console.log(`cloud mongodb connected`)
        }).catch(err => console.log(err.message))
    }
}

module.exports = dbConnect