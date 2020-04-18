const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const gallery = require('./app/gallery');
const users = require('./app/users');

const config = require('./config');


const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(cors());



const run = async () => {
    await mongoose.connect(config.database, config.databaseOptions);

    app.use('/gallery', gallery);
    app.use('/users', users);

    app.listen(config.port, () => {
        console.log(`Server started on ${config.port} port!`)
    })
};

run().catch(e => {
    console.error(e)
});