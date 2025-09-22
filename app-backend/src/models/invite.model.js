require('dotenv').config()

const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const Schema = mongoose.Schema

const inviteSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: (value) => validator.isEmail(value),
            message: (props) => `${props.value} is not a valid email address`
        }
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted'],
        default: 'Pending'
    },
    channels: [{
        type: Schema.Types.ObjectId,
        ref: 'Channel',
        required: true
    }],
    permissions: {
        type: [String],
        enum: ['create', 'edit', 'delete'],
        required: true
    },
    token: {
        type: String,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })


inviteSchema.methods.generateToken = async function () {

    const invite = this;

    const token = jwt.sign({ email: invite.email, inviteId: invite._id }, process.env.PRIVATE_KEY, { expiresIn: '7 days' });

    invite.token = token

    await invite.save()
    return token
}

module.exports = mongoose.model('Invitation', inviteSchema)