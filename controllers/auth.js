const express = require(`express`)
const mongoose  = require(`mongoose`)
const signupData = mongoose.model(`signupData`)
const jwt = require(`jsonwebtoken`)
const bcrypt  = require(`bcrypt`)
const {phone} = require(`phone`)
const dotenv = require(`dotenv`)

dotenv.config({path : `./config/.env`})
const secretKey = process.env.SECRET_KEY

 const validateMail=(email)=>{
    var validRegex =  /^(?=.*[@])(?=.*[.])[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(!validRegex.test(email)){
        return true
    }
 }

 const validatePhone=(phoneNo)=>{
    return phone(phoneNo);
   }

   const validatePwd=(password)=>{
    const minLength = 8
    const maxLength =16
    const regularExp = (/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%&*])[A-Za-z0-9!@#$%&*]{8,16}$/)
    if(password.length<minLength || password.length>maxLength){
        return true
    }
    else if(!regularExp.test(password)){
        return true
    }
   }

 const signupAuth = (req,res,next)=>{
    const {name, email, phone, country, password} = req.body
    const phoneNumber = country+phone
    if(!name || !email || !phone || !password){
       return res.status(401).json({success : false, error : `Invalid Fields`})
    }
    else if(name.indexOf(` `)==-1){
       return res.status(401).json({success : false, error : `Enter Full Name`})
    }
    else if(name.length<3){
       return res.status(401).json({success : false, error : `Invalid Name`})
    }
    else if(validateMail(email)){
       return res.status(401).json({success : false, error : `Invalid Email`})
    }
    else if(!validatePhone(phoneNumber).isValid){
        return res.status(403).json({success : false, error : "Invalid phone No."})
      }
      else if(validatePwd(password)){
        return res.status(403).json({success : false, error : "Invalid Password parameters"})
      }
      signupData.findOne({Email : email})
      .then((foundUser)=>{
        if(foundUser != null){
            return res.status(401).json({success : false, error : `User already exists`})
        }
        else if(foundUser == null){
            bcrypt.hash(password,12)
            .then((hashPwd)=>{
                const storeUser = new signupData({
                    Name : name,
                    Email : email,
                    Phone : phoneNumber,
                    Password : hashPwd
                })
                storeUser.save()
                .then((saveUser)=>{
                    console.log(saveUser)
                    return res.status(200).json({success : true , message : `User stored successfully in the database`})
                })
                .catch((err)=>{
                    console.log(`while storing user`,err)
                })
            })
            .catch((err)=>{
                console.log(`while hashing the password`,err)
            })
        }
      })
      .catch((err)=>{
        console.log(`while finding the user`, err)
      })
}

const loginAuth = (req,res,next)=>{
    const {email , password} = req.body 
    if(!email || !password){
       return res.status(403).json({success : false, error : `Fill all the fields`})
    }
    signupData.findOne({Email : email})
    .then((matchedUser)=>{
        if(matchedUser==null){
            return res.status(403).json({success : false , error : `Inavlid Mail`})
        }
        else if(matchedUser != null){
            const signupPwd = matchedUser.Password 
            bcrypt.compare(password , signupPwd)
            .then((pwdVerify)=>{
                if(pwdVerify==false){
                    return res.status(401).json({success: false, error : `Inavalid Password`})
                }
                const token = jwt.sign({_id : matchedUser._id} , secretKey)
                console.log(token)
                return res.status(200).json({success : true , message : `Login successfull` , token : token})
            })
            .catch((err)=>{
                console.log(`while Matching password`,err)
            })
        }
    })
    .catch((err)=>{
        console.log(`while matching mail`,err)
    })
}


module.exports = {signupAuth , loginAuth}
