const express = require(`express`)
const mongoose = require(`mongoose`)
const campList = mongoose.model(`campList`)

// @desc create a new bootcamp
// @route POST api/v1/bootcamp
// @access private
 const createBootcamp = (req,res,next)=>{
    const {name, description,website,phone,email,address,careers,housing,jobAssistance,jobGuarantee,acceptGi} = req.body
    if(!name || !description || !website || !phone || !email || !address || !careers){
        return res.status(401).json({success : false , error : "Fill all the Fields"})
    }
    else if(name.length<3){
        return res.status(401).json({success : false , error : "Name should not be less then 3 words"})
    }
    campList.findOne({Email : email})
    .then((checkMail)=>{
        if(checkMail != null){
            return res.status(401).json({success : false , error : "Email is already exists"})
        }
        campList.findOne({Phone : phone })
        .then((checkPhone)=>{
            if(checkPhone != null){
                return res.status(401).json({success : false , error : "Phone is already exists"})
            }
            campList.findOne({Name : name })
        .then((checkName)=>{
            if(checkName != null){
                return res.status(401).json({success : false , error : "Name is already exists"})
            }
            const camp = new campList(
                {
                    Name : name,
                    Description : description,
                    Website : website,
                    Phone : phone,
                    Email : email,
                    Address : address,
                    Careers : careers,
                    Housing : housing,
                    JobAssistance : jobAssistance,
                    JobGuarantee : jobGuarantee,
                    AcceptGI : acceptGi
                }
            )
            camp.save()
            .then((stored)=>{
                console.log(stored.green)
                return  res.status(200).json({success : true , message : "created a new bootcamp", data : stored})
            })
            .catch((err)=>{
                console.log(`while storing bootcamp`,err)
            })
        })
        .catch((err)=>{
            console.log(`while checking name`,err)
        })
        })
        .catch((err)=>{
            console.log(`while checking Phone number`,err)
        })
    })
    .catch((err)=>{
        console.log(`while checking mail`,err)
    })
   
}

// @desc get all bootcamp
// @route GET api/v1/bootcamp
// @access public
 const getBootcamp = (req,res,next)=>{
    campList.find()
    .then((result)=>{
        res.status(200).json({success : true , message : "get all the bootcamp", count : campList.length, data : result})
    })
    .catch((err)=>{
        console.log(`while fetching aii the bootcamps`, err)
    })
}

// @desc get single bootcamp
// @route GET api/v1/bootcamp/:id
// @access public
 const getSingleBootcamp = (req,res,next)=>{
    // console.log(req.params)
    const specificBootcamp = campList.findById(req.params.id)
    .then((result)=>{
        res.status(200).json({success : true , data : result})
    })
    .catch((err)=>{
        console.log(`while fetching specific bootcamp`)
    })
}

// @desc update single bootcamp
// @route PUT api/v1/bootcamp/:id
// @access public
 const updateBootcamp = (req,res,next)=>{
    const modifyBootcamp = campList.findByIdAndUpdate(req.params.id, req.body, {
        new : true
    })
    .then((result)=>{
        res.status(200).json({success : true , message : `update a bootcamp ${req.params.id}`, data : result})
    })
    .catch((err)=>{
        console.log(`while updating`,err)
    })
}

// @desc delete single bootcamp
// @route DELETE api/v1/bootcamp/:id
// @access public
 const deleteBootcamp = (req,res,next)=>{
    const deleteBootcamp = campList.findByIdAndDelete(req.params.id)
    .then((result)=>{
        res.status(200).json({success : true , message : `delete a bootcamp ${req.params.id}`, data : result})
    })
    .catch((err)=>[
        console.log(`while deleting bootcamp`, err)
    ])
}

module.exports = {createBootcamp,getBootcamp,getSingleBootcamp,updateBootcamp,deleteBootcamp}
