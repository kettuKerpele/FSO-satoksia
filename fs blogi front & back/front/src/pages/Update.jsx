//kirjautuneelle
import React, { useState } from 'react'
import axios from 'axios'
import {useLocation, useNavigate} from "react-router-dom"

const Update = () => {
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
  const location=useLocation()

  const blogId = location.pathname.split("/")[2]

  const handleChange = (e) => {
    setBlogData((prev) => ({ ...prev, [e.target.name]:e.target.value}))
  };
  console.log(blogData)

  const handleClick = async e => {
    e.preventDefault()
    try{
      await axios.put("http://localhost:8800/blog_db/"+blogId, blogData)
      alert('Tiedot muokattu ja tallennettu onnistuneesti')
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
      <h1>Muokkaa blogin tietoja</h1>
      <p>HUOM! blogin tykkäykset nollataan</p>
      <label htmlFor='titles'>Muokkaa otsikkoa</label>
      <input 
      type='text'
      placeholder='blogin otsikko'
      onChange={handleChange}
      name='title'
      id='titles'
      />
      <label htmlFor="writer">Muokkaa kirjoittajan nimeä</label>
      <input
      type='text'
      placeholder='blogin kirjoittaja'
      onChange={handleChange}
      name='author'
      id='writer'
      />
      <label htmlFor='www'>Muokkaa verkko-osoitetta</label>
      <input
      type='url'
      placeholder='blogin verkko-osoite'
      onChange={handleChange}
      name='url'
      id='www'
      />
      <button className='submitBtn' onClick={handleClick}>Tallenna</button>
      <button className='backBtn' onClick={handleClickReturn}>Takaisin</button>
    </div>
  )
}

export default Update