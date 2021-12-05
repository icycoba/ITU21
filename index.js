var express = require('express');
var app = express();
const PORT = 8080;


// "Databáze" uživatelů
const users = [
    { "id": 0, "serviceid": 0, "date": "00.00.0000", "time": "0000", "name": "Jane Doe", "email": "JaneDoe@email.com", "phonenum": "000000000000" }
]

// "Databáze" služeb
const services = [
    { "serviceid" : 0, "name" : "Služba", "desc" : "Popis služby", "imagesrc" : "images/temp_image.png" }
]

const reggedUsers = [
    { "id" : 0, "login" : "root", "password" : "root"}
]

app.use(express.json())

app.use(function (req,res,next){
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
})

app.listen(
    PORT, () => console.log(`Running on http://localhost:${PORT}`)
)

app.get('/reservation', (req,res) => {
    res.send(users);
})

app.get('/reservation/:id', (req,res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if(!user) res.status(404).send("Uživatel nenalezen.")
    res.send(user)
})

app.post('/reservation', (req,res) => {
    const id = users.length;
    const {serviceid} = req.body;
    const {date} = req.body;
    const {time} = req.body;
    const {name} = req.body;
    const {email} = req.body;
    const {phonenum} = req.body;
    
    users.push({"id": parseInt(id), "serviceid": serviceid, "date": date, "time": time, "name": name, "email": email, "phonenum": phonenum})

    if(!date || !time || !name || !email || !phonenum){
        res.status(418).send({message: 'Potrebuju datum, cas, jmeno, email nebo tel. cislo'})
    }

    res.send({
        reservation : `Rezervace ID: ${id}:${serviceid} datum a cas: ${date}, ${time}, jmeno ${name}, email ${email}, telefonni cislo: ${phonenum}`
    })
})

app.get('/search', (req,res) => {
    res.send(services);
})

app.get('/search/:serviceid', (req,res) => {
    const service = services.find(s => s.serviceid === parseInt(req.params.serviceid));
    if(!service) res.status(404).send("Služba nenalezena.")
    res.send(service)
})

app.post('/search', (req,res) => {
    const serviceid = services.length;
    const {name} = req.body;
    const {desc} = req.body;
    const {imagesrc} = req.body;

    if(!imagesrc){
        imagesrc = "images/temp_image.png";
    }
    if(!desc){
        desc = "Popisek neni dostupny"
    }

    

    if(!name){
        res.status(418).send({message: 'Potrebuju jmeno'});
    }

    services.push({"serviceid" : parseInt(serviceid), "name" : name, "desc" : desc, "imagesrc" : imagesrc});

    res.send({
        sluzbos : `Služba ID: ${serviceid}, jmeno: ${name}, popis: ${desc}, imagesrc: ${imagesrc}`
    })
})

app.get('/usersregister', (req,res) => {
    res.send(reggedUsers)
})

app.get('/usersregister/:login', (req,res) => {
    const user = reggedUsers.find(u => u.login === req.params.login);
    if(!user) res.status(404).send("Uživatel nenalezen.")
    res.send(user)
})

app.post('/usersregister', (req,res) => {
    
    const id = reggedUsers.length;
    const {login} = req.body;
    const {password} = req.body;

    if(!login || !password){
        res.status(418).send({message: 'Server neobdrzel login nebo heslo.'});
    }

    if(reggedUsers.some(e => e.login == login )) {
        res.status(409).send({message: 'Login uz existuje v databazi'});
        return;
    }

    reggedUsers.push({"id": parseInt(id), "login" : login, "password" : password});

    res.send({
        udaje: `${login}, ${password}`
    })
})