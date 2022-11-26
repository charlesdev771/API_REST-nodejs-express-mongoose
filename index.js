//6VEtZfkLosxcReo3 PASS
//ccod user
// mongodb+srv://ccod:6VEtZfkLosxcReo3@myapy.swphhqr.mongodb.net/?retryWrites=true&w=majority


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Person = require("./models/Person");

app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json());

app.get('/', (req, res) =>{

    res.json({message: "Hello, guys!"});

})

app.post('/person', async (req, res) => {

    const {name, salary, approved} = req.body;

    if (!name || !salary || !approved)
    {
        res.status(422).json({error: "All camps its obrigatory"});
    }

    const person = {
        name,
        salary,
        approved
    }

    try 
    
    {
        await Person.create(person);
        res.status(201).json({message: "INSERT success!"});    
    } catch (error) {
        res.status(500).json({error: error})
        
    }

});

const DB_USER = "ccod";
const DB_PASSWORD = encodeURIComponent('6VEtZfkLosxcReo3');


mongoose.connect(
    'mongodb+srv://ccod:6VEtZfkLosxcReo3@myapy.swphhqr.mongodb.net/?retryWrites=true&w=majority'
    ).then(() => {

        console.log("Conected");
        app.listen(3000);

    }).catch((err) => console.log(err)

    )