var mongooseServer = require('mongoose');
dbServer = function () {
    var url = 'mongodb://192.168.1.13:27011/p-mapper-db';
    var server = mongooseServer.createConnection(url, {
        useNewUrlParser: true,
        useFindAndModify: false  
    });
    return server;
}
module.exports = {
    dbServer
}