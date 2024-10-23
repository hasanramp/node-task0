import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import User from './models/user.js';
import Company from './models/company.js';
import mongoose from 'mongoose';

const dbURI = `mongodb+srv://node_project_user:${process.env.PASSWORD}@cluster0.fszmfbt.mongodb.net/credentials?retryWrites=true&w=majority&appName=Cluster0`
mongoose.connect(dbURI)

const app = express();

app.listen(8000);

app.post('/upload-user-data', (req, res) => {
    console.log(req.query.experience_level);
    const user = new User({
        resume: req.query.resume,
        tech_stack: req.query.resume,
        field_of_interest: req.query.resume,
        experience_level: Number(req.query.experience_level),
        bio: req.query.resume
    });
    user.save()
    res.send("User saved ");

})

app.post('/upload-company-data', (req, res) => {
    const company = new Company({
        name: req.query.name,
        website_url : req.query.website_url,
        description: req.query.description
    })
    company.save()
    res.send("company saved ");

})