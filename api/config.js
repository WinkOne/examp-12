const path = require('path');

const rootPath = __dirname;

module.exports ={
    rootPath,
    uploadPath: path.join(rootPath, 'public', 'uploads'),
    database: 'mongodb://localhost',
    databaseOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    },
    port: 5556,
    facebook: {
        appId: '633834247194808',
        appSecret: '444a979731c5b574f62b00ccfa6f0d8a'
    }
};