const mongoose = require('mongoose')

const connectDB = async(url) => {
    return mongoose.connect(url,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
       
    }).then(()=>console.log('connected!'))
}

module.exports = connectDB