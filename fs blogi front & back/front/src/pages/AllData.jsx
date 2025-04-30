//kirjautuneelle
import React from 'react'
import {useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"


const All = () => {
  const [allData, setAllData] = useState([])

  useEffect(() => {
    const fetchAllData = async () => {
        try{
          const res = await axios.get("http://localhost:8800/blog_db/", allData)
          setAllData(res.data)
        }catch(err){
          console.log(err)
        }
    }
    fetchAllData()
  },[]);

  const handleDelete = async (id) => {
    const conf = window.confirm('Haluatko varmasti poistaa blogin tiedot?')
      if(conf) {
      try{
        await axios.delete("http://localhost:8800/blog_db/"+id)
        window.location.reload()
      }catch(err){
        console.log(err)
      }
    }
  }

  return (
    <div>
      <h1>Blogit hallintapaneeli</h1>
      <button className='deleteBtn'><Link to={`/`}>Kirjaudu ulos</Link></button>
      <hr/>
      <p>Lisää uusi blogi klikkaamalla alta</p>
      <button className='addBtn'><Link to="/AddNew">Lisää uusi</Link></button>
      <hr/>
      <h3>Oma blogiluettelo (kesken):</h3>
      <div className='blogList'>
        {allData.map(blog=>(
          <div className="showBlogs" key={blog.id}>
            <p className='blogRows'>Blogi: {blog.title}<br/>Kirjoittaja: {blog.author}<br/>Osoite: {blog.url}<br/>Käyttäjältä: {blog.userName}<br/><br/>Yläpeukku:{blog.likes}, alapeukku:{blog.likes_down} </p>
             <button className='deleteBtn' onClick={()=>handleDelete(blog.id)}>Poista</button>
             <button className='updateBtn'><Link to={`/update/${blog.id}`}>Muokkaa</Link></button>
          </div>
        ))}
      </div>
      
    </div>
  )
}

export default All