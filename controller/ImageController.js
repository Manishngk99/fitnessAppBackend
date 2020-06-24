
const multer = require('multer');
const path = require("path");

const storage = multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        callback(null, `${file.fieldname}-${Date.now()}${ext}`);
    }
});

const imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error("You can upload only image files!"), false);
    }
    cb(null, true);
};

const upload = multer({
    storage: storage,
    fileFilter: imageFileFilter
})

var image = upload.single('imageFile')

function imageFileName(req,res,next){
    console.log(req.file)
    req.imageName= req.file;
    next();
}

function imageName(req, res, next){
    console.log(req.file);
    res.json(req.file);
}

module.exports = {
    image,
    imageFileName,
    imageName
}