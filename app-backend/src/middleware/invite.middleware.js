// middleware to check if logged in user is valid or not

require('dotenv').config()

const jwt = require('jsonwebtoken')
const Invite = require('../models/invite.model')

const invite = async (req,res,next) => {

    try{
        const token = req.query.token

        if(!token ){
            throw new Error('Not a valid link')
        }

        const decoded = jwt.verify(token,process.env.PRIVATE_KEY)
        const user = await Invite.findOne({email: decoded.email, token: token})

        if(!user){
            throw new Error('Not a valid link')
        }

        user.status = "Accepted"
        await user.save()

        req.name = user.name
        req.email = decoded.email
        req.access = user.access

        next()
    } catch (error) {
        res.status(400).send({error: 'Not a valid link'})
    }
}

module.exports = invite