const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors');
const Blog = require("./models/blogModel");

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



app.post("/add-blog", (req, res) => {
    console.log(req.body)

    // const blog = new Blog(res.body)
    
    

    // blog.save()
    //     .catch(err => {
    //         console.log(err)
    //     })

    Blog.create(req.body)

    res.send("blog added")
    
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