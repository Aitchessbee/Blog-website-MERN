import React, { useEffect } from "react"
import axios from "axios"

function App(){
    const [blog, setBlog] = React.useState("");
    const [allBlogs, setAllBlogs] = React.useState([]);


    function getBlogs(){
        axios.get("http://127.0.0.1:8000/blogs")
            .then((res) => {
                setAllBlogs(res.data)
                console.log(allBlogs)
            })
    }

    
    React.useEffect(() => {
        console.log("getting blogs")

        getBlogs()
    }, [])


    function changed(e){
        setBlog(e.target.value)
    }


    function addBlog(e){
        e.preventDefault()
        axios.post("http://127.0.0.1:8000/add-blog", {"blog": blog})
            .then(getBlogs())
            // .then(console.log(blogElements))
            // .then(res => console.log(res))
    }

    const blogElements = allBlogs.map((elem) => {
        return (<div style={{backgroundColor: "red", width: "200px", height: "200px", margin: "20px", color: "white", display: "flex", alignItems: "center", justifyContent: "center"}} key={elem._id}>{elem.blog}</div>)
    })

    return (
        <div>
            <textarea   
                name="blogInput" 
                cols="30" 
                rows="10"
                onChange={changed}
                value={blog}
            >

            </textarea>

            <button onClick={addBlog} style={{display: "block"}}>Add Blog</button>

            <div>
                {blogElements}
            </div>

        </div>
    )
}

export default App