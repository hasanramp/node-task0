import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import { Readable } from 'stream';
dotenv.config()

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET 
})

class ImageUploader {
	bufferToStream(buffer) {
		const stream = new Readable();
		stream.push(buffer);
		stream.push(null);
		return stream;
	}
	upload(image) {
		return new Promise((resolve, reject) => {
			const uploadStream = cloudinary.uploader.upload_stream((err, res) => {
				if (error) {
					reject(error);
				}
			})
		this.bufferToStream(image).pipe(uploadStream);
		resolve("uploaded successfuly");
		})

	}
}

export default ImageUploader;