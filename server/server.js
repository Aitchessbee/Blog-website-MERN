const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors');
const Blog = require("./models/blogModel");
const { request } = require("https");

const PORT = 8000

const app = express()
app.use(express.urlencoded({extended: true,}));
app.use(express.json());

app.use(cors());

dbURI = "mongodb+srv://HSB:test1234@cluster0.7ztm4s7.mongodb.net/Blogs?retryWrites=true&w=majority"
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(console.log("DB connection successful"))

app.listen(PORT, (err)=>{
    if(err){
        console.log("error in server setup")
    }else{
        console.log(`server started on port ${PORT}`)
    }
})

app.get("/blogs", (req, res)=> {
    const blogs = Blog.find()
        // .then((data) => res.send(JSON.stringify(data)))
        .then((data) => res.json(data))
    // console.log(blogs)
    // res.send(JSON.stringify(blogs))
    // res.send("done")
})



app.post("/add-blog", async (req, res) => {
    console.log(req.body)

    // const blog = new Blog(res.body)
    
    

    // blog.save()
    //     .catch(err => {
    //         console.log(err)
    //     })

    let blog = await Blog.create(req.body)
    console.log(blog._id)

    res.json(blog)
    
})

app.post("/clear-blogs", async (req, res) => {
    console.log("clearing")

    // let blogs = await Blog.find()


    // Blog.remove(blogs[-1])

    await Blog.deleteMany({})

    res.send("Clearing")
})

app.delete("/delete-blog/:id", async (req, res) => {
    // console.log(req.params.id)

    let blog = await Blog.findOne({_id: req.params.id})
    blog.remove()

    res.json({id: req.params.id})
})



app.post("/login", (req, res) => {
    console.log(req.body)
    console.log("requets made")
})

app.get("/hello", (req, res) => {
    res.send("hello")
})

app.use("", (req,res) => {
    console.log("goodbye")
    res.send("goodbye")
})