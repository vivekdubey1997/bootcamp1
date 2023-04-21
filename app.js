const express = require(`express`)
const app = express()
const dotenv = require(`dotenv`)
const mongoose = require(`mongoose`)
// require(`./sampleFolder/sampleUser.js`) //its just for checking the database connection setup
// const sampleRouter = require(`./sampleFolder/sampleRoute.js`) //sample folder is only for setup purpose and some custom logics
// const logger = require(`./sampleFolder/middlewear/logger`) //this is just for creating own logger
const morgan = require(`morgan`)
const colors = require(`colors`)

// models
require(`./models/auth/signup`)
require(`./models/camps`)

// routes
const AuthRouter = require(`./routes/auth`)
const bootcampRouter = require(`./routes/bootcamp.js`)


dotenv.config({path : `./config/.env`})
const port = process.env.PORT || 5000
// console.log(process.env)

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser : true , useUnifiedTopology : true})
mongoose.connection.on(`connected`,()=>{
    console.log(`connected to the database`)
})
mongoose.connection.on(`error`,(err)=>{
    console.log(`error connecting to the database` , err)
})

app.use(express.json())
if(process.env.NODE_ENV==`Development`){
    app.use(morgan(`dev`))
}
else if(process.env.NODE_ENV=`Production`){
    app.use(morgan(`combined`))
}
app.use(`/api/v1/bootcamp/` , bootcampRouter)
app.use(`/api/v1/` , AuthRouter)
// app.use(`/sample/` , sampleRouter) // this is only for the testing no use in the project

app.listen(port, ()=>{
    console.log(`server is running at port ${port} in ${process.env.NODE_ENV} mode`)
})