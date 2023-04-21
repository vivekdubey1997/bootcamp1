const express = require(`express`)
const sampleRouter = express.Router()
const mongoose = require(`mongoose`)
const sample = mongoose.model(`sample`)

sampleRouter.post(`/` , (req,res)=>{
   const {name ,age} = req.body
   if(!name || !age){
  return res.json({error : "Invalid Details"})
   }
   const sampledata = new sample(
    {
        Name : name,
        Age : age
    }
   )
   sampledata.save()
   .then((result)=>{
    res.json({sample : result})
   })
   .catch((err)=>{
    console.log(err)
   })
})

module.exports = sampleRouter