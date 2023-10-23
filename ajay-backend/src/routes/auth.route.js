const express = require('express')

const {
    currentUser,
    createUser, 
    loginUser,
    logoutUser,
    logoutAll 
} = require('../controllers/user.controller')
const auth = require('../middleware/auth.middleware')
const invite = require('../middleware/invite.middleware')

const router = express.Router()

router.get("/currentuser", auth, currentUser)

router.post("/register", invite, createUser)

router.post("/login", loginUser)

router.post("/logout", auth, logoutUser)

router.post("/logoutAll", auth, logoutAll)

module.exports = router