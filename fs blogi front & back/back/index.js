require('dotenv').config()
const mysql = require('mysql2')
const express = require('express') 
const cors = require('cors')
var dt = require('./time_module.js')
const morgan = require('morgan')
const app = express()
const db_name = 'blog_db'
const db_name2 = 'user_db'
const db_name3 = 'test_db'
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

const bcrypt = require('bcrypt')
const saltRounds = 10

//blogit nämä voi määrittää .env tiedostoon
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"????????",
    database: db_name
})
//samoin nämä .env tiedostoon
const db2 = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"????????",
    database: db_name2
})
//testitietokanta
const db3 = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"?????????",
    database: db_name3
})
app.get(`/${db_name3}`,(req, res) => {
    const q="SELECT * FROM test_table"
    db3.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})
//.........

//vie sivulle info
app.get('/info', (req, res) => {
    const query = "SELECT COUNT(id) AS yhteensä FROM blog_table WHERE id > 0"
    db.query(query, (err, rows) => {
        if(err) throw err;
        total = JSON.stringify(rows).replace(/[{""}]/g, ' ')
        res.send(`Käynnistä ensin mysql serveri ja tarvittaessa mysql workbench. Xampp:ia ei tarvita. Tämän jälkeen nodejs ja lopuksi react sovellus..<br>Data saatavilla: http://localhost:8800/blog_dp<br>Morgan logaus konsolissa<br><br>Tietokantaan: ${db_name} tallennettu ${total} kpl tietoja.<br>${dt.currentTime()}`);
    })
})
//......

//hae kaikki blogit etusivulle
app.get(`/${db_name}`,(req, res) => {
    const q="SELECT * FROM blog_table"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})
//................

//uuden blogin tallennus tietokantaan
app.post(`/${db_name}`,(req,res) => {
    const q ="INSERT INTO blog_table (`title`,`author`,`url`,`likes`,`likes_down`,`userName`) VALUES (?)";
    const values=[
        req.body.title,
        req.body.author,
        req.body.url,
        req.body.likes,
        req.body.likes_down,
        req.body.userName
    ]
    db.query(q,[values],(err,data) => {
        if(err) return res.json(err)
        return res.json("Tiedot lisätty")
    })

})
//.............

//uuden käyttäjätilin tallennus
app.post(`/${db_name2}`,(req,res) => {
    const userName = req.body.userName
    const userPassword = req.body.userPassword
    bcrypt.hash(userPassword, saltRounds, (err, hashedPassword) => {
        if(err) {
            res.status(418)
        } else {
            db2.query("INSERT INTO users (userName, userPassword) VALUES (?, ?)",
                [userName, hashedPassword], (err, res) => {
                if(err) {
                    console.log('ei voitu rekisteröidä')
                } else {
                    console.log(res, 'tili luotu, käyttäjänimi:', userName)
                }
            })
        }
    })   
})
//.............

//salasanan tark..
app.post('/',(req,res) => {
    const userName = req.body.userName
    const userPassword = req.body.userPassword
    db2.query("SELECT * FROM users WHERE userName = ?", [userName], (err, result) => {
        if(err) {
            console.log(err)
        } else if(result.length < 1) {
            console.log('käyttäjänimi ei täsmää')
        } else {
            bcrypt.compare(userPassword, result[0].userPassword, (err, match) => {
                if(match) {
                    const go = 200
                   res.send(go)
                    console.log('käyttäjä sekä salasana oikein')
                }
                if(!match) {
                    console.log('salasana ei täsmää')
                }
            })
        }
    })
})
//.....

//käyttäjien haku
app.get(`/${db_name2}`,(req, res) => {
    const q2="SELECT id, userName FROM users"
    db2.query(q2,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})
//....

//poista blogi id kohtaisesti
app.delete("/blog_db/:id", (req,res) => {
    const rowId=req.params.id;
    const q="DELETE FROM blog_table WHERE id=?"

    db.query(q,[rowId],(err,data) => {
        if(err) return res.json(err)
        return res.json("Tiedot poistettu")
    })
})
//........

//muokkaa blogitietoja id kohtaisesti
app.put("/blog_db/:id", (req,res) => {
    const rowId=req.params.id;
    const q="UPDATE blog_table SET `title`=?,`author`=?,`url`=?,`likes`=?,`likes_down`=?,`userName`=? WHERE id=?"
    const values=[
        req.body.title,
        req.body.author,
        req.body.url,
        req.body.likes,
        req.body.likes_down,
        req.body.userName
    ]
    db.query(q,[...values, rowId],(err,data) => {
        if(err) return res.json(err)
        return res.json("Tiedot päivitetty")
    })
})
//.........

const port = process.env.PORT
const url = process.env.mysql_URL
const test_mysql_URL = process.env.NODE_ENV === 'test'
 ? process.env.test_mysql_URL
 : process.env.url
//console.log(url)
app.listen(port,() => {
    console.log(`Serveri käynnissä portissa ${port}..\nOhjelman kotisivu: http://localhost:????\nData: http://localhost:${port}/info\n-blogi tietokanta: ${url}\n${dt.currentTime()}`)
})