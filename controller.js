const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const Student = require("./models/student")
const morgan = require("morgan");

const password = process.env.PASSWORD
const dbURI = `mongodb+srv://node_project_user:${password}@cluster0.fszmfbt.mongodb.net/hogwarts_characters?retryWrites=true&w=majority&appName=Cluster0`
console.log(dbURI)
mongoose.connect(dbURI)
    .then((result) => app.listen(8001))
    .catch((err) => console.log(err))


app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render("index")
})

app.post('/', (req, res) => {
    const student = new Student({
        id: req.body.characterId,
        name : req.body.characterName,
        gender : req.body.characterGender,
        house : req.body.characterHouse,
        wizard : (req.body.characterWizard === 'true')

    })
    let idAlreadyExists = true;
    Student.find()
        .then((findResult) => {
            for (let i = 0; i < findResult.length; i++) {
            if (findResult[i].id == student.id) {
                res.send("Character with this id already exists.");
                }
            }
            idAlreadyExists = false;
            student.save()
                .then((result) => {
                    res.send(result)
                })
                .catch((err) => {
                    res.send(err)
                })
        })
        .catch((err) => {
            res.send(err)
        });
    
    // if (!idAlreadyExists) {
    //     student.save()
    //         .then((result) => {
    //             res.send(result)
    //         })
    //         .catch((err) => {
    //             res.send(err)
    //         })
    // }else {
    //     console.log('reacccched here')
    //     console.log(idAlreadyExists)
    // }
})

app.get('/view-all', (req, res) => {
    Student.find()
        .then((result) => {
            // res.send(result);
            console.log(result[0])
            res.render('view-all', {result: result})
        })
})
