import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import Recruiter from './models/recruiter.js';
import Company from './models/company.js';

const password = process.env.PASSWORD
const dbURI = `mongodb+srv://node_project_user:${password}@cluster0.fszmfbt.mongodb.net/credentials?retryWrites=true&w=majority&appName=Cluster0`
mongoose.connect(dbURI)

let RecruiterCredentialsManager = new function() {
	return {
		signup: function(name, age, gender, email, password, join_date, qualification, current_position, salary, company_name) {

			return new Promise((resolve, reject) => {
				Recruiter.find({email: email})
					.then((res) => {
						if (res.length === 0) {
							Company.find({name: company_name})
								.then((companyRes) => {
									bcrypt.hash(password, 2, function(err, hash) {
										const recruiter = new Recruiter({
											name: name,
											age: age,
											gender: gender,
											email: email,
											password: hash,
											Join_date: join_date,
											qualification: qualification,
											current_position: current_position,
											salary: salary,
											company_id: companyRes[0]._id
										})
										recruiter.save()
											.then((res) => {
												resolve(true)
											}) 
											.catch((err) => {
												console.log(err)
												reject("could not save credentials")
											})
									});			

								}).catch((companyErr) => {
									console.log(err);
									reject("could not find company");
								})
						}else {
							reject("email already exists")
						}
					})

			})
		},
		login: function(email, password) {
			return new Promise((resolve, reject) => {
				Recruiter.find({email: email})
					.then((res) => {
						bcrypt.compare(password, res[0].password, (err, result) => {
							console.log(result)
							resolve(result)
						})
					})
					.catch((err) => {
						console.log(email)
						console.log('email id not found')
						reject(err)
					})
				})
		}
	}	
}


export default RecruiterCredentialsManager;