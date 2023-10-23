require('dotenv').config()

// modules
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

// routes
const authRoute = require('./src/routes/auth.route')
const userRoute = require('./src/routes/user.route')
const inviteRoute = require('./src/routes/invite.route')
const channelRoute = require('./src/routes/channel.route')
const postRoute = require('./src/routes/post.route')

// creates a new express application
const app = express()

// middleware
app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()//to execute the next middleware
})

// routes handling
app.use("", authRoute)
app.use("/invites", inviteRoute)
app.use("/users", userRoute)
app.use("/channels", channelRoute)
app.use("/posts", postRoute)

// Connecting to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Connected to DB and Listening on port 5000")
        })
    })
    .catch((error) => {
        console.log(error.message)
    })

const Channel = require('./src/models/channel.model')
const Post = require('./src/models/post.model')
const Invite = require('./src/models/invite.model')
const User = require('./')

// const main = async function () {
//     const usersList = await Invite.find({channels: {$in: "64b21fa3a3bd0459c806e2b4"}})
//     console.log(usersList.map(user => user.email))
//     // const invites = await Invite.find({}).populate('channels')
//     // console.log(invites[2].channels)
//     // await invites.populate('channels').then(p => console.log(p))
//     // const channel = await Channel.findById('64a556fc066c8dc0c619c832')
//     // await channel.populate('posts').then(p => console.log(p)).catch(err=>console.log(err))
//     // console.log(channel.posts)

//     // const posts = await Post.findById('64a657c41e063a8f9d6bd838')
//     // await posts.populate('channelId').then(p => console.log(p)).catch(err=>console.log(err))

//     // console.log("Posts Column",posts.channelId)
// }

// main()