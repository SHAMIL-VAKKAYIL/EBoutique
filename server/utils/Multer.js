import multer from "multer";
import path from 'path'
import { fileURLToPath } from 'url'


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(path.join(__dirname));

        const location = path.join(__dirname, '../../client/public/img');
        cb(null, location);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
})

const upload = multer({ storage: storage });

export default upload;