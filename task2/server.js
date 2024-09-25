import express from 'express';
import multer from 'multer';
import Uploader from './controller.js';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const app = express();

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
