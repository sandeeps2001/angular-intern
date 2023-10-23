require('dotenv').config()

const mongoose = require('mongoose')
const { ObjectId } = require('mongodb')
const postmark = require("postmark")

const Invite = require('../models/invite.model')

const client = new postmark.ServerClient(process.env.API_KEY);

const getInvites = async (req, res) => {
    const invites = await Invite.find({}).populate('channels')

    res.status(200).json(invites)
}

const getInvite = async (req, res) => {

    const id = req.params.id

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid User ID' })
    }

    const invite = await Invite.findById(id)

    if (!invite) {
        return res.status(404).json({ error: 'Invalid User' })
    }

    res.status(200).json(invite)
}

const createInvite = async (req, res) => {
    const { name, email, status, access, permissions, channels } = req.body

    try {
        const invite = await Invite.create({ name, email, status, access, permissions, channels })
        const token = await invite.generateToken()
        const createdInvite = await invite.populate('channels')
        const action_url = `http://localhost:4200/register?token=${token}`

        client.sendEmailWithTemplate({
            "From": "ajay.krupal@loyalytics.in",
            "To": "ajay.krupal@loyalytics.in",
            // "To": email,
            "TemplateAlias": "user-invitation",
            "TemplateModel": {
                "product_url": "http://localhost:4200/login",
                "product_name": "Administrator App",
                "name": name,
                "action_url": action_url,
                "company_name": "Administrator App",
                "company_address": "Bangalore, Karnataka, India"
            }
        });

        res.status(200).json(createdInvite)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const updateInvite = async (req, res) => {
    const id = req.params.id

    const updates = req.body

    console.log('Within Update Invite')

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid User' })
    }

    try {
        const invite = await Invite.updateOne({ _id: new ObjectId(req.params.id) }, { $set: updates })
        const updatedInvite = await Invite.findById(id).populate('channels')

        const registerURL=`http://localhost:4200/register?token=${updatedInvite.token}`
        const channels = updatedInvite.channels.map(channel => channel.name)

        client.sendEmailWithTemplate({
            "From": "ajay.krupal@loyalytics.in",
            "To": "ajay.krupal@loyalytics.in",
            "TemplateAlias": "user-update",
            "TemplateModel": {
                "product_url": "http://localhost:4200/login",
                "product_name": "Administrator App",
                "register_url": registerURL,
                "channels_value": channels.join(", "),
                "permissions_value": updatedInvite.permissions.join(", "),
                "company_name": "Administrator App",
                "company_address": "Bangalore, Karnataka, India"
            }
        });

        res.status(200).json(updatedInvite)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

const deleteInvite = async (req, res) => {
    const id = req.params.id

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid User' })
    }

    try {
        const invite = await Invite.deleteOne({ _id: new ObjectId(id) })
        res.status(200).json(invite)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }

}

const getPermissions = async (req, res) => {
    const currentUser = await Invite.findOne({ userId: req.user._id })

    res.status(200).send(currentUser.permissions)
}

module.exports = {
    getInvites,
    getInvite,
    createInvite,
    updateInvite,
    deleteInvite,
    getPermissions
}