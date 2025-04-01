const mysql = require('mysql2')
const express = require('express') 
const cors = require('cors')
var dt = require('./time_module.js');
const morgan = require('morgan')
const app = express()
const db_name = 'phonebook'

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database: db_name
})

app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

//vie sivulle info
app.get('/info', (req, res) => {
    const query = "SELECT COUNT(id) AS yhteensä FROM users WHERE id > 0"
    db.query(query, (err, rows) => {
        if(err) throw err;
        total = JSON.stringify(rows).replace(/[{""}]/g, ' ')
        res.send(`Käynnistä ensin mysql serveri ja tarvittaessa mysql workbench -> kentät [id(auto increment),name ja number]. Xampp:ia ei tarvita.<br>Data saatavilla: http://localhost:8800/phonebook<br>Morgan logaus konsolissa<br><br>Luettelossa ${total} henkilön tiedot<br>${dt.currentTime()}<br>`);
    })
})

app.get("/phonebook",(req, res) => {
    const q="SELECT * FROM users"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/phonebook",(req,res) => {
    const q ="INSERT INTO users (`name`,`number`) VALUES (?)";
    const values=[
        req.body.name,
        req.body.number
    ]
    db.query(q,[values],(err,data) => {
        if(err) return res.json(err)
        return res.json("Tiedot lisätty")
    })

})

app.delete("/phonebook/:id", (req,res) => {
    const userId=req.params.id;
    const q="DELETE FROM users WHERE id=?"

    db.query(q,[userId],(err,data) => {
        if(err) return res.json(err)
        return res.json("Tiedot poistettu")
    })
})

app.put("/phonebook/:id", (req,res) => {
    const userId=req.params.id;
    const q="UPDATE users SET `name`=?,`number`=? WHERE id=?"
    const values=[
        req.body.name,
        req.body.number
    ]
    db.query(q,[...values, userId],(err,data) => {
        if(err) return res.json(err)
        return res.json("Tiedot päivitetty")
    })
})

const PORT = process.env.PORT || 8800
app.listen(PORT,() => {
    console.log(`Serveri käynnissä portissa ${PORT}.. Avaa selain: http://localhost:${PORT}/info, Tietokanta: http://localhost:${PORT}/${db_name}\n${dt.currentTime()}`)
})
