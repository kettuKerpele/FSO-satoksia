const express = require('express')
const app = express()
const cors = require('cors')

var dt = require('./time_module.js');
var morgan = require('morgan')

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())


let persons = [
    {
      id: "1",
      name: "Arto Hellas",
      number: "040-123456",
      important: true
    },
    {
      id: "2",
      name: "Ada Lovelace",
      number: "39-44-5323523",
      important: true
    },
    {
      id: "3",
      name: "Dan Abramov",
      number: "12-43-234345",
      important: true
    },
    {
      id: "4",
      name: "Mary Poppendieck",
      number: "39-23-6423122",
      important: true
    },
    {
      id: "5",
      name: "Martti Mutkikas",
      number: "044-6423122",
      important: true
    },
    {
      id: "6",
      name: "Tynka",
      number: "044-22",
      important: false
    }
  ]


  //vie sivulle "info"
  var len = persons.length
  app.get('/info', (request, response) => {
    response.send(`Luettelossa ${len} henkilön tiedot<br>${dt.currentTime()}`);
  });
  //....

  //hae yksi
  app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const user = persons.find(user => user.id === id)
    
    if (user) {
      response.json(user)
    } else {
      response.status(404).end()
    }
  })
  //....

  //poista
  app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(delUser => delUser.id !== id)
  
    response.status(204).end()
  })
  //....
  
  //lisää
  const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => Number(n.id)))
      : 0
    const newId = Math.floor(Math.random(maxId)* 1000)

    return String(newId)
  }
  
  app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.id) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
    //const newName = "abc"
    //const newNumber = "444-4444444"
    const note = { 
      id: generateId(),
      name: body.name,//newName,
      number: body.number,//newNumber,
      important: true
    }
    persons = persons.concat(note)
  
    response.json(note)
  })
  //....

  //hae kaikki
  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })
 
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...(http://localhost:${PORT})...`,("Time: " + dt.currentTime()))
})