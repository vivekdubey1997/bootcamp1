const express = require(`express`)

let logger = (req,res,next)=>{
    console.log(req.method)
    console.log(req.protocol)
    console.log(req.get(`host`))
    console.log(req.originalUrl)
    console.log(`Url : ${req.protocol}://${req.get(`host`)}${req.originalUrl}` )
    next()
}

module.exports = logger