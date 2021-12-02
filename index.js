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

app.use(express.json())

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

app.post('/reservation/:id', (req,res) => {
    const {id} = req.params;
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
    const service = services.find(s => s.id === parseInt(req.params.serviceid));
    if(!service) res.status(404).send("Služba nenalezena.")
    res.send(service)
})

app.post('/search/:serviceid', (req,res) => {
    const {serviceid} = req.params;
    const {name} = req.body;
    const {desc} = req.body;
    const {imagesrc} = req.body;

    if(!imagesrc){
        imagesrc = "images/temp_image.png";
    }
    if(!desc){
        desc = "Popisek neni dostupny"
    }

    services.push({"serviceid" : parseInt(serviceid), "name" : name, "desc" : desc, "imagesrc" : imagesrc});

    if(!name){
        res.status(418).send({message: 'Potrebuju jmeno'});
    }

    res.send({
        sluzbos : `Služba ID: ${serviceid}, jmeno: ${name}, popis: ${desc}, imagesrc: ${imagesrc}`
    })
})