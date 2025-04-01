import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from "react-router-dom"

const Add = () => {
  const [userData, setUserData] = useState({
    id:"",
    name:"",
    number:""
  });

  const navigate=useNavigate()

  const handleChange = (e) => {
    setUserData((prev)=>({ ...prev, [e.target.name]:e.target.value}))
  };
  console.log(userData)
  
  const handleClick = async e => {
    e.preventDefault()
    try{
      await axios.post("http://localhost:8800/phonebook", userData)
      navigate("/")
    }catch(err){
      console.log(err)
    }
  }
  return (
    <div className='form'>
      <h1>Lisää uusi käyttäjä</h1>
      <input
      type='text'
      placeholder='nimi'
      onChange={handleChange}
      name='name'
      required='true'
      minLength={3}
      />
      <input
      type='text'
      placeholder='numero'
      onChange={handleChange}
      name='number'
      required='true'
      minLength={10}
      />
      <button className="submitBtn" onClick={handleClick}>Tallenna</button>
    </div>
  )
}

export default Add