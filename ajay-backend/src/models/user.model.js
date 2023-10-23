require('dotenv').config()

const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const SALT_WORK_FACTOR = 10 //the number of times hashing has to be done
const Schema = mongoose.Schema

const userSchema = new Schema({
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
    password: {
        type: String,
        required: true,
        min: [8, 'Password must be of minimum 8 characters'],
        trim: true
    },
    cpassword: {
        type: String
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, { timestamps: true })

userSchema.virtual('usraccess',{
    ref: 'Invitation',
    localField: '_id',
    foreignField: 'userId'
})

// Methods are instances and refer to a single document
// Method to remove details when sending back data
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

// Method to generate the token for the user
userSchema.methods.generateAuthToken = async function () {
    const user = this

    const token = jwt.sign({ _id: user._id.toString() }, process.env.PRIVATE_KEY, { expiresIn: '1 day' })

    user.tokens = user.tokens.concat({ token })

    await user.save()
    return token
}

// A static refers to the whole collection
// Function to find User by their credentials
userSchema.statics.findByCredentials = async function (email, password) {

    const user = await this.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

userSchema.pre('save', function (next) {
    var user = this;

    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(SALT_WORK_FACTOR, function (error, salt) {
        if (error) {
            return next(error)
        }

        bcrypt.hash(user.password, salt, function (error, hash) {
            if (error) {
                return next(error)
            }

            user.password = hash
            next()
        })
    })
})

module.exports = mongoose.model('User', userSchema)