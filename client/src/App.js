import React, { useEffect } from "react"
import axios from "axios"

function App(){
    const [blog, setBlog] = React.useState("");
    const [allBlogs, setAllBlogs] = React.useState([]);


    function getBlogs(){
        axios.get("http://127.0.0.1:8000/blogs")
            .then((res) => {
                // console.log(res.data)
                setAllBlogs(res.data)
            })
            .then(console.log(allBlogs))
    }

    
    React.useEffect(() => {
        console.log("getting blogs")

        getBlogs()
    }, [])


    function changed(e){
        setBlog(e.target.value)
    }


    const addBlog = async (e) => {
        console.log(e.type + " add")
        e.preventDefault()
        let res = await axios.post("http://127.0.0.1:8000/add-blog", {"blog": blog})
        setAllBlogs((prevData) => ([...prevData, res.data]))
    }

    const clearBlogs = async (e) => {
        console.log(e.type + " clear")
        e.preventDefault()
        setAllBlogs([])
        let resp = await axios.post("http://127.0.0.1:8000/clear-blogs")
        console.log(resp.data)
    }

    const deleteBlog = async (e, id) => {
        e.preventDefault()
        let resp = await axios.delete(`http://127.0.0.1:8000/delete-blog/${id}`)
        getBlogs()
        console.log(resp.data)
    }

    const blogElements = allBlogs.map((elem, index) => {
        // console.log(elem)
        return (
            <div key={elem._id}>
                <div style={{backgroundColor: "red", width: "200px", height: "200px", margin: "20px", color: "white", display: "flex", alignItems: "center", justifyContent: "center"}}>{elem.blog}</div>
                <button onClick={event => (deleteBlog(event, elem._id))}>Delete</button>
            </div>
        )
    })

    return (
        <div>
            <form onSubmit={addBlog}>
                <textarea   
                    name="blogInput" 
                    cols="30" 
                    rows="10"
                    onChange={changed}  
                    value={blog}
                >

                </textarea>

                <input 
                    type="text" 
                    onChange={changed}
                    value={blog}
                />
                <button onClick={clearBlogs} style={{display: "block"}}>Clear Blogs</button>
                <button onClick={addBlog} style={{display: "block"}}>Add Blog</button>
            </form>


            

            <div>
                {blogElements}
            </div>

        </div>
    )
}

export default App