const express = require('express');
const router = express.Router();
const fileUploader = require('../cloud/cloudinaryConfig');

// router.post('/cloudinary-upload',uploadFile);

router.post('/cloudinary-upload', fileUploader.single('file'), (req, res, next) => {
    if (!req.file) {
        next(new Error('No file uploaded!'));
        return;
    }

    res.json({ secure_url: req.file.path });
});

// function uploadFile(req,res){
//
//
// }

module.exports = router;