const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    channelId: {
        type: Schema.Types.ObjectId,
        ref: 'Channel',
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model('Post',postSchema)