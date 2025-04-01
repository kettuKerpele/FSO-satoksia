import React from 'react'
import {useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"


const AllUsers = () => {
  const [allData, setAllData] = useState([])

  useEffect(() => {
    const fetchAllData = async () => {
        try{
          const res = await axios.get("http://localhost:8800/phonebook")
          // console.log(res)
          setAllData(res.data)
        }catch(err){
          console.log(err)
        }
    }
    fetchAllData()
  },[]);

  const handleDelete = async (id) => {
    const conf = window.confirm('Haluatko varmasti poistaa tiedot?')
      if(conf) {
      try{
        await axios.delete("http://localhost:8800/phonebook/"+id)
        window.location.reload()
      }catch(err){
        console.log(err)
      }
    }
  }
  return (
    <div>
      <h1>Puhelinluettelo proto</h1>
      <hr/>
      <p>Lisää käyttäjiä klikkaamalla alta</p>
      <button className='addBtn'><Link to="/AddNew">Lisää uusi tieto</Link></button>
      <hr/>
      <div className='userList'>
      <h3>Luettelo:</h3>
        {allData.map(user=>(
          <div className="showUsers" key={user.id}>
            <p className='userRows'>&#128106; {user.name} &#128222;{user.number}</p>
             <button className='deleteBtn' onClick={()=>handleDelete(user.id)}>Poista</button>
             <button className='updateBtn'><Link to={`/update/${user.id}`}>Muokkaa</Link></button>
          </div>
        ))}
      </div>
      
    </div>
  )
}

export default AllUsers