const mongoose = require(`mongoose`)

const signupSchema = new mongoose.Schema(
    {
        Name : {
            type : String,
            require : true
        },
        Email : {
            type : String,
            require : true
        },
        Phone : {
            type : Number,
            require : true
        },
        Password : {
            type : String,
            require : true
        },

    }
)

mongoose.model(`signupData` , signupSchema)