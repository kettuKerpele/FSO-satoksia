import { useEffect, useState } from 'react'
import axios from 'axios'
import './app.css'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="notif">
      {message}
    </div>
  )
}

const App = () => {

  const [dataArray, setDataArray] = useState([])
  const [name, setName] = useState('')
  const [phonenumber, setPhonenumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [message, setMessage] = useState(null)

  const fetchData = async () => {
    try {
    const response = await axios.get('http://localhost:3001/dataArray')
    setDataArray(response.data)
    } catch (error) {
      alert('Tietoja ei voitu hakea')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const personObject = {
      //id: String(dataArray.length + 1),
      names: name,
      phonenumbers: phonenumber,
      important: true,
    }
    axios
      .post('http://localhost:3001/dataArray', personObject)
      .then(response => {
        setDataArray(dataArray.concat(response.data))
      })
    setName('')
    setPhonenumber('')
    setMessage(JSON.stringify(name)+' lisätty luetteloon')
    setTimeout(() => {setMessage(null)}, 5000)
  }

  const moveFromBook = async (id) => {
    try {
      await axios.delete('http://localhost:3001/dataArray/'+id)
      setDataArray(dataArray.filter((i) => i.id !== id))
      setMessage('Poistettu luettelosta')
      setTimeout(() => {setMessage(null)}, 5000)
    } catch (error) {
      alert('Ei voitu poistaa')
    }
  }
  
  const displayNotes = showAll
  ? dataArray
  : dataArray.filter(x => x.important === false)
  
  const handleNameChange = (e) => {
    setName(e.target.value)
  }
  const handleNumberChange = (e) => {
    setPhonenumber(e.target.value)
  }

  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <div className='container'>
    <Notification message={message} />
    <div>
      <h2>Puhelinluettelo</h2>
    </div>
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nimi:</label>
        <input id="name" value={name} type="text" onChange={handleNameChange}/><br/>
        <label htmlFor="number">Numero</label>
        <input id="number" value={phonenumber} type='text' onChange={handleNumberChange}/><br/>
        
        <button className='btns' type='submit'>Lisää</button>
      </form>
    </div> 

    <hr/>

    <h2>Luettelo</h2>
    <div>
      <button className='btns' onClick={() => setShowAll(!showAll)}>Näytä tiedot: {showAll ? 'Kaikki' : 'Virheelliset' }</button>
      </div>
    <div>   
      <ul>
        {displayNotes.map(i => <li key={i.id}>{i.names} {i.phonenumbers} <button className='btns' onClick={() => moveFromBook(i.id)}>Poista</button></li>)}
      </ul>
    </div>
  
  </div>  
  )
  
}
export default App

