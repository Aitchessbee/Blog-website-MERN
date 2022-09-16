// import logo from './logo.svg';
// import './App.css';
import React, {useState} from "react"
import axios from "axios"

function App() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  function changed(e){
    setFormData(prevData => ({
      ...prevData, 
      [e.target.name]: e.target.value
    }))
  }


  function submit(e){
    e.preventDefault()
    console.log(formData)
    axios.post("http://127.0.0.1:8000/login", formData)
      .then(res => console.log(res))

  }

  return (
    <>
      <form action="">
        <input
          type="text"
          placeholder="email"
          onChange={changed}
          name="email"
          value={formData.email}
        />
        <input
          type="text"
          placeholder="password"
          onChange={changed}
          name="password"
          value={formData.password}
        />
        <button onClick={submit}>Submit</button>
      </form>
    </>
  );
}

export default App;