const mongoose = require("mongoose")

const BlogSchema = new mongoose.Schema({
    blog: {
        type: String,
        require: true,
    }
})

const Blog = mongoose.model('Blog', BlogSchema)
module.exports = Blog;