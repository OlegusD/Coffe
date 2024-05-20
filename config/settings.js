const cron = {
    timeTest: {
        time: '* */1 * * * *',
    },
};

const keyfirebase = {
    productionKey: 'key=*******',
    testKey: 'key=*****'
};

const template = {
    uploadDir: './documents',
    path: './api/templates/',
    savePath: './documents/export/',
    importPath: './documents/import/'
};

const development = {
    frontUrl: '',
    mainUrl: 'http://localhost:3000/',
    timeZone: 4,
    tmpDir: './tmp',
    uploadDir: './documents',
    cron,
    template,
    keyfirebase
};
module.exports = {
    development,
};
