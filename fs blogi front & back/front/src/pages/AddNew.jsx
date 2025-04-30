//kirjautuneelle
import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from "react-router-dom"

const Add = () => {
  const current = localStorage.getItem('name')
  const [blogData, setBlogData] = useState({
    title:"",
    author:"",
    url:"",
    likes:0,
    likes_down:0,
    userName:current
  });

  const navigate=useNavigate()

  const handleChange = (e) => {
    setBlogData((prev)=>({ ...prev, [e.target.name]:e.target.value}))
  };
  console.log(blogData)
  
  const handleSubmit = async e => {
    e.preventDefault()
    try{
      await axios.post("http://localhost:8800/blog_db", blogData)
      navigate("/AllData")
    }catch(err){
      console.log(err)
    }
  }

  const handleClickReturn = () => {
    navigate("/AllData")
  }

  return (
    <div className='form'>
      <h1>Lisää uusi blogitieto</h1>
      <input 
      type='text'
      placeholder='blogin otsikko'
      onChange={handleChange}
      name='title'
      />
      <input
      type='text'
      placeholder='blogin kirjoittaja'
      onChange={handleChange}
      name='author'
      />
       <input
      type='url'
      placeholder='blogin verkko-osoite'
      onChange={handleChange}
      name='url'
      />
      <button className="submitBtn" onClick={handleSubmit}>Tallenna</button>
      <button className='backBtn' onClick={handleClickReturn}>Takaisin</button>
    </div>
  )
}

export default Add