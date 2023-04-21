const express = require(`express`)
const AuthRouter = express.Router()
const {signupAuth, loginAuth} = require(`../controllers/auth`)

AuthRouter.route(`/signup`).post(signupAuth)
AuthRouter.route(`/login`).post(loginAuth)



module.exports = AuthRouter