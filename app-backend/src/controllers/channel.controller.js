require('dotenv').config()

const Channel = require('../models/channel.model')
const Invite = require('../models/invite.model')
const Post = require('../models/post.model')
const mongoose = require('mongoose')
const postmark = require("postmark")

const client = new postmark.ServerClient(process.env.API_KEY);

const getChannels = async (req, res) => {

    if (req.user.role === "admin") {
        const channels = await Channel.find({}).populate('createdBy')
        return res.status(200).json(channels);
    }

    const userAccess = await Invite.findOne({ userId: req.user._id })

    const channelName = await Channel.find({ _id: { $in: userAccess.channels } })
    return res.status(200).json(channelName)
}

const getChannel = async (req, res) => {
    const userAccess = await Invite.findOne({ userId: req.user._id })

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid Channel ID' })
    }

    if (req.user.role === "admin") {
        try {
            const channel = await Channel.findById(id)
            return res.status(200).json(channel)
        } catch (error) {
            return res.status(404).json({ error: error.message })
        }
    }

    if ((userAccess.channels).includes(id)) {
        try {
            const channel = await Channel.findById(id)
            return res.status(200).json(channel)
        } catch (error) {
            return res.status(404).json({ error: error.message })
        }
    } else {
        return res.status(400).json({ error: "Unauthorized Access" })
    }
}

const createChannel = async (req, res) => {

    const { name, description } = req.body

    try {
        const channel = await Channel.create({ name, description, createdBy: req.user._id })
        const createdChannel = await Channel.findById(channel._id).populate('createdBy')
        await Channel.find().populate('userId').then(p => console.log(p)).catch(error => console.log(error))
        res.status(200).json(createdChannel)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }


}

const updateChannel = async (req, res) => {

    const { id } = req.params

    const updates = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid Channel ID' })
    }

    try {
        const channel = await Channel.updateOne({ _id: new ObjectId(id) }, { $set: updates })

        const users = await Invite.find({ channels: { $in: id } })
        const usersList = users.map(user => user.email)

        client.sendEmailWithTemplate({
            "From": "ajay.krupal@loyalytics.in",
            "To": usersList.join(","),
            "TemplateAlias": "channels-delete",
            "TemplateModel": {
                "product_url": "http://localhost:4200/login",
                "product_name": "Administrator App",
                "action": "updated", 
                "channelName": name,
                "company_name": "Administrator App",
                "company_address": "Bangalore, Karnataka, India",
                "MessageStream": "broadcast"
            }
        });

        res.status(200).json(channel)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

const deleteChannel = async (req, res) => {

    const id = req.params.id

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid Channel ID' })
    }

    try {
        const { name } = await Channel.findById(id)
        const channel = await Channel.deleteOne({ _id: id })
        await Post.deleteMany({ channelId: id })
        const users = await Invite.find({ channels: { $in: id } })
        const usersList = users.map(user => user.email)

        client.sendEmailWithTemplate({
            "From": "ajay.krupal@loyalytics.in",
            "To": usersList.join(","),
            "TemplateAlias": "channels-delete",
            "TemplateModel": {
                "product_url": "http://localhost:4200/login",
                "product_name": "Administrator App",
                "action": "deleted",
                "channelName": name,
                "company_name": "Administrator App",
                "company_address": "Bangalore, Karnataka, India",
                "MessageStream": "broadcast"
            }
        });

        res.status(200).json(channel)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

const getPosts = async (req, res) => {
    const { channelId } = req.params

    if (!mongoose.Types.ObjectId.isValid(channelId)) {
        return res.status(404).json({ error: 'Invalid Channel ID' })
    }

    try {
        const channel = await Channel.findById(channelId)
        await channel.populate('posts')
        res.status(200).json(channel.posts)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getChannels,
    getChannel,
    createChannel,
    updateChannel,
    deleteChannel,
    getPosts
}