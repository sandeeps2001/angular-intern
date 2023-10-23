const { superadminlogin,signup} = require('../functions/auth')
const express = require('express')
const router = express.Router()

router.post("/login",superadminlogin)
router.post("/signup",signup)


module.exports = router