const path = require('path');
const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');
const auth = require('../middleware/auth')
const Gallery = require('../model/Gallery');
const config = require('../config');
const router = express.Router();

router.get('/', async (req, res) => {
    let image = {}
    if (req.query.user) {
        image = {user: req.query.user}
    }
    try{
        const gallery = await Gallery.find(image).populate('user');
        res.send(gallery);
    } catch (e) {
        res.status(404).send({message: 'not found'})
    }
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, config.uploadPath),
    filename: (req, file, cb) => cb(null, nanoid() + path.extname(file.originalname))
});
const upload = multer({storage});

router.post('/', [auth, upload.single('image')], async (req, res) => {
    try {
        const user = req.user;
        const galleryData = req.body;
        if (req.file) {
            galleryData.image = req.file.filename;
        }
        if (!user) {
            res.status(401).send({message: 'not autorizations'})
        }
        galleryData.user = user._id
        const gallery = new Gallery(galleryData);
        await gallery.save();
        res.send(gallery)
    } catch (e) {
        res.status(404).send({message: 'not found'})
    }
});

router.delete('/:id', auth, async (req, res) => {
    await Gallery.findByIdAndDelete({_id: req.params.id});
    console.log('Ok');
    return res.send({message: 'Only the image can delete'});

});

module.exports = router;
