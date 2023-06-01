import express from 'express';
import { FileArray, UploadedFile } from 'express-fileupload';
import fs from 'fs';

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();

router.post('/file-upload', async (req, res) => {
	try {
		console.log('File upload API called!');
		if (req.files) {
			// in req.files, files are saved as object properties and can be accessed by name
			// convert object to array
			let files = Object.keys(req.files).map(x => (req.files![x]));
			console.log(`Files \n    * ${files.map(x => (x as UploadedFile).name).join('\n    * ')}\nhave been successfully uploaded!`);
			
			// save files
			files.forEach( x => {
				let fileName = (x as UploadedFile).name;
				fs.writeFile(path.join(__dirname, '..', '..', 'files', fileName), (x as UploadedFile).data, (err) => {
					if (err) throw err;
					console.log(`File ${fileName} saved.`);
				});
			});

			res.status(200).json({'Success': 'Files have been uploaded'});
		} else {
			res.status(400).json({'Error': 'Bad request. File is empty.'});
		}

	} catch(e) {
		console.log('Error occured to file upload: ', e);
		res.status(400).send({'Error': e});
	}
});

export { router };