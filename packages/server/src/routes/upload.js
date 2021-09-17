import multer from "multer";

const storage = multer.diskStorage({
    destination: './public/',
    filename: (req, file, cb) =>{
        const filename = file.originalname.toLowerCase().split(" ").join("-")
        cb(null, "IMAGE-" + Date.now() + filename)
    }
})

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        cb(null, true)
    },
    limits: {filesize: 1000000}
})

module.exports = upload