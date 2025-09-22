const User = require('../models/user.model')
const Invite = require('../models/invite.model')
const mongoose = require('mongoose')
const { ObjectId } = require('mongodb')

const currentUser = async (req, res) => {
    const currentUser = req.user

    res.status(200).json(currentUser)
}

// GET all users
const getUsers = async (req, res) => {
    const users = await User.find({})

    res.status(200).json(users)
}

// GET a single user
const getUser = async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'User does not exist' })
    }

    // const user = await User.findById(id)

    // await user.populate('usraccess')

    // req.access = user.usraccess[0].access
    // req.permissions = user.usraccess[0].permissions

    // console.log(user.usraccess[0].access)
    // console.log(user.usraccess[0].permissions)

    if (!user) {
        return res.status(404).json({ error: 'User does not exist' })
    }

    res.status(200).json(user)

}

// POST a new user
const createUser = async (req, res) => {
    const { password, cpassword, role } = req.body

    const name = req.name
    const email = req.email

    try {
        if (password === cpassword) {
            const user = await User.create({ name, email, password, role })

            await Invite.updateOne({email: email},{$set: {userId: user._id}})

            // const findUser = await User.findById(user._id)
            // await findUser.populate('usraccess')
            // console.log('access',findUser.usraccess[0].access)
            // console.log('permissions',findUser.usraccess[0].permissions)

            const token = await user.generateAuthToken()
            res.status(200).json({ user, token })
        } else {
            throw new Error("Check your confirm password")
        }
    }
    catch (error) {
        res.status(400).json({ error: 'Your account exists or Check your credentials' })
    }
}

// PATCH an existing user
const updateUser = async (req, res) => {
    const { id } = req.params

    const updates = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'User does not exist' })
    }

    try {
        const user = await User.updateOne({ _id: new ObjectId(id)}, {$set: updates })
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({ error: "Check your credentials" })
    }
}

// DELETE an existing user
const deleteUser = async (req, res) => {
    const id = req.params.id

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'User does not exist' })
    }

    try {
        const user = await User.deleteOne({ _id: new ObjectId(id) })
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

// Login a user
const loginUser = async (req, res) => {

    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        req.header.authorization = token

        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

// Logout a user
const logoutUser = async (req, res) => {

    try {
        req.user.tokens = req.user.tokens.filter((token => {
            return token.token !== req.token
        }))
        await req.user.save()

        res.status(200).json({ message: 'Log Out Successful' })
    } catch (error) {
        res.status(500).json({ message: 'Error Logging Out' })
    }
}

// Logout of all sessions
const logoutAll = async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.status(200).json({ message: 'Logged out of all sessions' })
    } catch (error) {
        res.status(500).json({ message: 'Error Logging Out' })
    }
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    loginUser,
    logoutUser,
    logoutAll,
    currentUser
}