import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
const password = process.env.PASSWORD
const dbURI = `mongodb+srv://node_project_user:${password}@cluster0.fszmfbt.mongodb.net/credentials?retryWrites=true&w=majority&appName=Cluster0`
import Users from './models/user.js';
mongoose.connect(dbURI)

Users.find({resume: "test"}).then((res) => {
    console.log(res[0]);
})