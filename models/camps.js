const mongoose = require(`mongoose`)

const bootcampSchema = new mongoose.Schema(
    {
    Name : {
        type : String,
        unique : true,
        required : [true, `Please add a Name`],
        maxlength : [50 , `Name can't be more then 50 characters`]
    },
    Slug : String,
    Description : {
        type : String,
        required : [true, `Please add Description`],
        maxlength : [500 , `Description can't be more then 500 characters`]
    },
    Website : {
        type : String,
        match : [/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi, `Please add website`]
    },
    Phone : {
        type : String,
        maxlength : [20, `Phone number can't be more then 20 characters`]
    },
    Email : {
        type : String,
        match :  [/^(?=.*[@])(?=.*[.])[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, `Please add Email`]
    },
    Address : {
        type : String,
        required : [true, `Please add an address`]
    },
    Location : {
        type : {
            type : String,
            enum : [`point`]
        },
        coordinates : {
            type : [Number],
            index : `2dsphere`
        },
        formattedAddress : String,
        street : String,
        city : String,
        state : String,
        zipcode : String,
        country : String
    },
    Careers : {
        type : [String],
        required : true,
        enum : [`Web Development`, `Mobile Development`, `UI/UX`, `Data Science`, `Business`, `Others` ]
    },
    Other_career : String,
    AverageRating : {
        type : String,
        min : [1, `Rating must be atleast 1`],
        max : [5, `Rating can't be more then 5`]
    },
    AverageCost : Number,
    Photo : {
        type : String,
        default : `no-photo.jpg`
    },
    Housing : {
        type : Boolean,
        default : false
    },
    JobAssistance : {
        type : Boolean,
        default : false
    },
    JobGuarantee : {
        type : Boolean,
        default : false
    },
    AcceptGI : {
        type : Boolean,
        default : false
    }

},
{timestamps : true}
)

mongoose.model(`campList` , bootcampSchema)


