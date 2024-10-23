import express from 'express';
import multer from 'multer';
import Uploader from './controller.js';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const app = express();
const password = process.env.PASSWORD
const dbURI = `mongodb+srv://node_project_user:${password}@cluster0.fszmfbt.mongodb.net/credentials?retryWrites=true&w=majority&appName=Cluster0`
mongoose.connect(dbURI)

app.listen(8000);

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
