const mongoose = require(`mongoose`)

const sampleSchema = new mongoose.Schema({

    Name : {
        type : String,
        required : true
    },
    Age : {
        type : Number,
        required : true
    }
})

mongoose.model(`sample` , sampleSchema)