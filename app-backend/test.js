// Requiring module
const mongoose = require('mongoose');

// Connecting to database
mongoose.connect('mongodb://localhost:27017/GFG');

// Creating Schemas
const userSchema = new mongoose.Schema({
    username: String,
    email: String
})

const postSchema = new mongoose.Schema({
    title: String,
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

// Creating models from userSchema and postSchema
const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);

// Query to find and show all the posts
Post.find()
    .populate("postedBy")
    .then(p => console.log(p))
    .catch(error => console.log(error));

User.updateOne({_id: '64a575ed066c8dc0c619c840'},{$set: {username: "Updated"}})

Post.find({})
    .populate("postedBy")
    .then(p => console.log(p))
    .catch(error => console.log('error',error));

Post.find().then(p => console.log('Posted By', p)).catch(err => console.log(err))
