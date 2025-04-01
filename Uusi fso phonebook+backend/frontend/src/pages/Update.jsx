import React, { useState } from 'react'
import axios from 'axios'
import {useLocation, useNavigate} from "react-router-dom"

const Update = () => {
  const [userData,setUserData] = useState({
    name:"",
    number:""
  });

  const navigate=useNavigate()
  const location=useLocation()

  const userId = location.pathname.split("/")[2]

  const handleChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]:e.target.value}))
  };
  console.log(userData)

  const handleClick = async e => {
    e.preventDefault()
    try{
      await axios.put("http://localhost:8800/phonebook/"+userId, userData)
      alert('Tiedot muokattu ja tallennettu onnistuneesti')
      navigate("/")
    }catch(err){
      console.log(err)
    }
  }
  return (
    <div className='form'>
      <h1>Muokkaa tietoja</h1>
      <p>Jos et halua muokata tietoja palaa etusivulle selaimen "takaisin" painikkeella</p>
      <input
      type='text'
      placeholder='nimi'
      onChange={handleChange}
      name='name'
      />
      <input
      type='text'
      placeholder='numero'
      onChange={handleChange}
      name='number'
      />
      
      <button className='submitBtn' onClick={handleClick}>Tallenna</button>
    </div>
  )
}

export default Update