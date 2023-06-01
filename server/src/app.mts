import dotenv from "dotenv";
dotenv.config();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import express from 'express';
import fileUpload from "express-fileupload";
import { router as fileUploadRouter } from './routes/upload.route.mjs';

const PORT = 4455;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());  		// allow cross-origin resource sharing
app.use(cookieParser());
app.use(fileUpload({
    limits: { fileSize: 200 * 1024 * 1024 }  // limit file size to 200MB

}));  // middleware for file upload

app.use('/api', fileUploadRouter);

// 🔥 Serve angular app
app.use(express.static(path.join(__dirname, 'angular')));
app.all('/*', (req, res, next) => {
    res.sendFile('index.html', {root: path.join(__dirname, 'angular')});
});

app.get('/', (req, res) => {
	res.status(200).send('Hello, world!');
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});