const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: 'dkvpzvhq0',
    api_key: '118249155364296',
    api_secret: '6HrTtCjn3tziek_noGf0QVELsQc'
});

const storage = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ['jpg', 'png'],
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;