//Luo tunnus sivu
import axios from 'axios'
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

const LogIn = () => {
  const navigate=useNavigate()
  const [allUserData, setAllUserData] = useState([])
  const [user, setUser] = useState('')
  const [pwd, setPwd] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [newUserData, setNewUserData] = useState({
    id:'',
    userName:'',
    userPassword:''
  })

  //hae kaikki käyttäjät aka varatut nimimerkit
  //tässä voisi olla vielä serveri yhteyden tarkistus,
  //koska kukaan ei pääse kirjautumaan ilman yhteyttä
  useEffect(() => {
          const fetchAllData = async () => {
              try{
              const res = await axios.get("http://localhost:8800/user_db", allUserData)
              setAllUserData(res.data)
              }catch(err){
              console.log(err)
              }
          }
          fetchAllData()
      },[]);
  
  //palaa etusivulle
  const handleClickReturn = () => {
    navigate("/")
  }

  //input userName
  const handleNameChange = (e) => {
    setUser(e.target.value)
    setNewUserData((prev)=>({ ...prev, [e.target.name]:e.target.value}))
  }

  //input password
  const handlePwdChange = (e) => {
    setPwd(e.target.value)
    setNewUserData((prev)=>({ ...prev, [e.target.name]:e.target.value}))
  }

  //validointia ja luo tunnus jos ok
  const handleCreateNewUser = async e => {
    e.preventDefault()
    const userData = [{user, pwd}]
    console.log(userData)
    if(allUserData.length > 0 && allUserData.find(person => person.userName === user)) {
        setErrorMsg('Käyttäjänimi varattu')
        setUser('')
    } else if(pwd.length === 0 && user.length === 0) {
      setErrorMsg('Täytä molemmat kentät')
    } else if(pwd.length === 0 && user.length > 0 ) {
      setErrorMsg('Lisää salasana')
    } else if(pwd.length > 0 && user.length === 0 ) {
      setErrorMsg('Lisää käyttäjätunnus')
    } else {
      setErrorMsg('Onnistui')
      localStorage.setItem('name', user)
      try{
        await axios.post("http://localhost:8800/user_db", newUserData)
        .then(
          navigate("/AllData"))
      }catch(err){
        console.log(err)
      }
    }   
 }


  return (
    <div className='form'>
      <h3>Lisää käyttäjätunnus ja salasana</h3>
      <ErrMsg errorMsg={errorMsg}/>
      <input 
                type='text'
                required
                placeholder='käyttäjätunnus'
                autoComplete='off'
                onChange={handleNameChange}
                value={user}
                name='userName'
            />
            <input
                type='password'
                required
                placeholder='salasana'
                onChange={handlePwdChange}
                value={pwd}
                name='userPassword'
            />
      <button className="submitBtn" onClick={handleCreateNewUser}>Luo käyttäjä</button>
      <button className='backBtn' onClick={handleClickReturn}>Takaisin</button>
      <div className='nameContainer'>
        <p>Varatut nimimerkit:</p>
            {allUserData.map(i=>(
                <div className='names' key={i.id}>
                  <ul>
                    <li>{i.userName}</li>
                  </ul>
                </div>
            ))}
        </div> 
    </div>  
  )
}

export default LogIn