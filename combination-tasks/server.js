import multer from 'multer';
import uploader from './uploader.js';
import express from 'express';
import credentialsManager from './credentials-manager.js';
import Company from './models/company.js';
import User from './models/user.js';
import recruiterCredentialsManager from './credentials-manager-recruiter.js';
import RecruiterCredentialsManager from './credentials-manager-recruiter.js';

const app = express()
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

app.listen(8000)

app.post('/login', (req, res) => {
	if (req.query.email && req.query.password) {
		credentialsManager.login(req.query.email, req.query.password)
			.then((response) => {
				res.json({response: "login successful"})
			})
			.catch((err) => {
				console.log(err)
				res.json({response: "login failed"})
			})
	}else {
		console.log(req)
		res.json({error: "email or password not entered"})
	}

})

app.post('/signup', (req, res) => {
	const email = req.query.email;
	const password = req.query.password;
	console.log(password)

	credentialsManager.signup(email, password)
		.then((res) => {
			res.json({response: "signup successful"})
		})
		.catch((err) => {
			res.json({error: err})
		})

})

app.post('/upload', upload.single('file'), (req, res) => {
	const uploader = new Uploader();
	uploader.upload(req.file.buffer)
		.then((result) => {
			console.log(result);
			res.json({ result: result });
		})
		.catch((err) => {
			console.log(err);
			res.json({ error: err });
		})
})

app.post('/upload-user-data', (req, res) => {
    console.log(req.query.experience_level);
    const user = new User({
		email: req.query.email,
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
//name, age, gender, email, password, Join_date, qualification, current_position, salary, company_id
app.post('/recruiter-signup', (req, res) => {
	if (req.query.name && req.query.age && req.query.gender && req.query.email && req.query.password && req.query.join_date && req.query.qualification && req.query.current_postion && req.query.salary && req.query.company_name) {
		RecruiterCredentialsManager.signup(req.query.name, req.query.age, req.query.gender, req.query.email, req.query.password, req.query.join_date, req.query.qualification, req.query.current_position, req.query.salary, req.query.company_name)
			.then((response) => {
				res.json({response: "signup successful"});
			})
			.catch((err) => {
				console.log(err);
				res.json({response: "signup failed"})
			})
	}else {
		console.log(req);
		res.json({error: "Insufficient information"});

	}
})

app.post('/recruiter-login', (req, res) => {
	if (req.query.email && req.query.password) {
		RecruiterCredentialsManager.login(email, password)
			.then((response) => {
				res.json({response: "login successful"});
			})
			.catch((err) => {
				console.log(err);
				res.json({response: "login unsucessful"});
			})
	}
})