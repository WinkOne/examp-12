const path = require('path');
const express = require('express');
const auth = require('../middleware/auth');
const User = require('../model/User');
const bcrypt = require('bcrypt');
const multer = require("multer");
const nanoid = require('nanoid');
const axios = require('axios');
const config = require("../config");
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, config.uploadPath),
    filename: (req, file, cb) => cb(null, nanoid() + path.extname(file.originalname))
});

const upload = multer({storage});

router.post('/', upload.single('avatar'), async (req, res) => {

    const users = req.body;

    if (req.file) {
        users.avatar = req.file.filename;
    }

    const user = new User({
        username: users.username,
        password: users.password,
        displayName: users.displayName
    });

    try {
        user.generateToken();

        await user.save();

        return res.send(user);

    } catch (error) {

        return res.status(400).send(error);

    }
});

router.put('/:id', upload.single('avatar'), async (req, res) => {
    const users = req.body;
    console.log(req.params.id);

    if (req.file) {
        users.avatar = req.file.filename;
    }

    const user = await User.findByIdAndUpdate({_id: req.params.id}, {
        _id: req.params.id,
        username: users.username,
        displayName: users.displayName,
        avatar: users.avatar
    })

    console.log(user);
    try {
        await user.save()
        return res.send(user);
    } catch (error) {
        return res.status(400).send(error);
    }
});

router.post('/sessions', async (req, res) => {
    const user = await User.findOne({username: req.body.username});

    if (!user) {
        return res.status(400).send({error: 'Username or password not correct!'});
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
        return res.status(400).send({error: 'Username or password not correct!'});
    }

    user.generateToken();

    await user.save();

    res.send(user);
});

router.get('/', auth, async (req, res) => {
    const user = req.user;

    return res.send(user);
});

router.delete('/sessions', async (req, res) => {
    const success = {message: 'Success'};

    try {
        const token = req.get('Authorization').split(' ')[1];

        if (!token) return res.send(success);

        const user = await User.findOne({token});

        if (!user) return res.send(success);

        user.generateToken();

        await user.save();

        return res.send(success);
    } catch (e) {
        return res.send(e)
    }
});

router.post('/facebook', async (req, res) => {
    const inputToken = req.body.accessToken;
    const accessToken = config.facebook.appId + '|' + config.facebook.appSecret;
    // try {
    const url = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}&${req.body.id}/picture`;

    const response = await axios.get(url);

    if (response.data.data.error) {
        return res.status(401).send({message: 'Facebook token incorrect'})
    }

    let user = await User.findOne({facebookId: req.body.id});
    if (!user) {
        const [firstName, lastName] = req.body.name.split(' ');

        user = new User({
            username: req.body.id,
            password: nanoid(),
            facebookId: req.body.id,
            displayName: firstName + ' ' + lastName,
            avatar: req.body.picture.data.url
        })
    }

    user.generateToken();
    await user.save();

    return res.send(user)
});

module.exports = router;