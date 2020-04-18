const mongoose = require('mongoose');
const config = require("./config");
const nanoid = require('nanoid');

const User = require('./model/User');
const Gallery = require('./model/Gallery');

const run = async () => {
    await mongoose.connect(config.database, config.databaseOptions);

    const collection = await mongoose.connection.db.listCollections().toArray();

    for (let coll of collection) {
        await mongoose.connection.db.dropCollection(coll.name);
    }
   const [user, admin] = await User.create({
        username: 'User',
        password: '123',
        avatar: 'fixtures/user.jpg',
        displayName: 'Виктор Цой',
        token: nanoid()
    }, {
        username: 'Admin',
        password: '123',
        displayName: 'Александер Анашист',
        avatar: 'fixtures/admin.jpg',
        role: 'admin',
        token: nanoid()

    });
    await Gallery.create({
        title: 'Title image 1',
        user: user,
        image: 'fixtures/user.jpg',
    }, {
        title: 'Title image 2',
        user: user,
        image: 'fixtures/user.jpg',
    }, {
        title: 'Title image 3',
        user: user,
        image: 'fixtures/user.jpg',
    }, {
        title: 'Title image 4',
        user: admin,
        image: 'fixtures/admin.jpg',
    }, {
        title: 'Title image 5',
        user: admin,
        image: 'fixtures/admin.jpg',
    }, {
        title: 'Title image 6',
        user: admin,
        image: 'fixtures/admin.jpg',
    });
    mongoose.connection.close();
};

run().catch(e => {
    throw e;
});
