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
        res.status(422).json({error: "All its obrigatory"});
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

app.get('/person', async (req, res) => {

    try {
        
        const people = await Person.find();
        res.status(200).json(people);

    } catch (error) {
        
    }


});


app.get('/person/:id', async (req, res) => {
    const id = req.params.id

    try {
        const person = await Person.findOne({ _id: id })

        if (!person) {
            res.status(422).json({ message: 'Not found!' })
            return
        }

        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({ erro: error })
    }
})


app.get('/person/:id', async (req, res) => {
    const id = req.params.id

    try {
        const person = await Person.findOne({ _id: id })

        if (!person) {
            res.status(422).json({ message: 'Not found!' })
            return
        }

        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({ erro: error })
    }
})

app.patch('/person/:id', async (req, res) => {
    const id = req.params.id

    const { name, salary, approved } = req.body

    const person = {
        name,
        salary,
        approved,
    }

    try {
        const updatedPerson = await Person.updateOne({ _id: id }, person)

        if (updatedPerson.matchedCount === 0) {
            res.status(422).json({ message: 'Not found!' })
            return
        }

        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({ erro: error })
    }
})

app.delete('/person/:id', async (req, res) => {
    const id = req.params.id

    const person = await Person.findOne({ _id: id })

    if (!person) {
        res.status(422).json({ message: 'Not found!' })
        return
    }

    try {
        await Person.deleteOne({ _id: id })

        res.status(200).json({ message: 'Removed!' })
    } catch (error) {
        res.status(500).json({ erro: error })
    }
})

const DB_USER = "ccod";
const DB_PASSWORD = encodeURIComponent('6VEtZfkLosxcReo3');


mongoose.connect(
    'mongodb+srv://ccod:6VEtZfkLosxcReo3@myapy.swphhqr.mongodb.net/?retryWrites=true&w=majority'
    ).then(() => {

        console.log("Conected");
        app.listen(4000);

    }).catch((err) => console.log(err)

    )