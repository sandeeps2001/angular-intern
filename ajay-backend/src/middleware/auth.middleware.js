// middleware to check if logged in user is valid or not

require('dotenv').config()

const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

const auth = async (req,res,next) => {

    try{
        const token = req.header.authorization
        const decoded = jwt.verify(token,process.env.PRIVATE_KEY)
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token})

        if(!user){
            throw new Error('Authentication Failed')
        }

        req.token = token
        req.user = user
        next()
    } catch (error) {
        res.status(400).send({error: 'Please Authenticate'})
    }
}

module.exports = auth