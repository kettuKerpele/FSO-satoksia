//koti login/link create new
import axios from 'axios'
import { Link } from "react-router-dom"
import React from 'react'
import {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom"

const ErrMsg = ({errorMsg}) => {
    if(errorMsg === null) {
        return null
    }
    return (
        <div className='err'>{errorMsg}</div>
    )
}

const HomePageFunc = () => {
    const navigate=useNavigate()
    const [allData, setAllData] = useState([])
    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    //hämäävästi muotoiltu, hakee vain nimet
    const [allUserData, setAllUserData] = useState([])

    //hae kaikki käyttäjät
    useEffect(() => {
        const fetchAllData = async () => {
            try{
            const res = await axios.get("http://localhost:8800/user_db", allUserData)
            setAllUserData(res.data)
            localStorage.clear();
            }catch(err){
            console.log(err)
            }
        }
        fetchAllData()
    },[]);

    //input userName
    const handleNameChange = (e) => {
        setUser(e.target.value)
    }

    //input password
    const handlePwdChange = (e) => {
        setPwd(e.target.value)
    }

    //klikkaa validointi kirjaudu jos tunnukset ok
    const handleSubmit = async e => {
        e.preventDefault()
            //setUser('') nämä jää pois koska on ikävää korjailla kokoajan syötteitä
            //setPwd('')
         if(pwd.length === 0 && user.length === 0) {
            setErrorMsg('Lisää salasana ja tunnus')
        } else if(pwd.length === 0 && user.length > 0 ) {
            setErrorMsg('Salasana puuttuu')
        } else if(pwd.length > 0 && user.length === 0 ) {
            setErrorMsg('Tunnus puuttuu')
        } else {
            //tämä rivi välähtää jos tunnukset ok, koska ehtojärjestys väärä
            setErrorMsg('Annetuissa tiedoissa on virhe')
        
        const nameExists = allUserData.find(i => user === i.userName)
        if(nameExists) {
            const res = axios.post('http://localhost:8800/', {userName: user, userPassword: pwd})
        .then((res) => {
            const conv = JSON.stringify(res.data)
            if(conv === '200' && nameExists){
                setErrorMsg('')//turha toiminto
                //console.log('tiedot oikein, kirjataan sisään')
                navigate("/AllData")
            }
          })
          .catch((err) => console.err(err));
        } else if(!nameExists || !conv) {
            setErrorMsg('Annetuissa tiedoissa on virhe, tarkista tiedot')
            //console.log('kaikki yritykset menee persiilleen')
            }
        }
        localStorage.setItem('name',user)         
    }
    
    //kaikki postaukset etusivulla  
    useEffect(() => {
        const fetchAllData2 = async () => {
            try{
            const res = await axios.get("http://localhost:8800/blog_db", allData)
            setAllData(res.data)
            }catch(err){
            console.log(err)
            }
        }
        fetchAllData2()
    },[]);

    return (
        <div>
            <div className='main'>
            <h1>Blog`it</h1>
            <p>Kirjaudu sisään</p>
            <ErrMsg errorMsg={errorMsg}/>
            <div className='form'>
            <input 
                type='text'
                required
                placeholder='käyttäjätunnus'
                autoComplete='off'
                onChange={handleNameChange}
                value={user}
            />
            <input
                type='password'
                required
                placeholder='salasana'
                onChange={handlePwdChange}
                value={pwd}
            />
            <button className="submitBtn" onClick={handleSubmit}>Kirjaudu</button>
            <p>tai luo tunnus klikkaamalla alta</p>
            <button className="submitBtn2"><Link to={`/newUserLogin`}>Luo tunnus</Link></button>
                </div>
             </div>
            <h3>Kaikki blogit</h3>
            <div className='blogList'>
            {allData.map(blog=>(
                <div className="showBlogs" key={blog.id}>
                <p className='blogRows'>Blogi: {blog.title}<br/>Kirjoittaja: {blog.author}<br/>Osoite: {blog.url}<br/><br/>Käyttäjältä: {blog.userName}<br/><br/>&#128077;{blog.likes}&nbsp;&nbsp;&#128078;{blog.likes_down}</p>
                <button className='voting'>Like</button>
                <button className='voting'>Dislike</button>
                </div>
            ))}
        </div>         
    </div>   
    )
}

export default HomePageFunc