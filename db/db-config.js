var mongooseServer = require('mongoose');
dbServer = function () {
    var url = 'mongodb://192.168.0.3:27011/p-mapper-db';
    //var url = 'mongodb://192.168.0.15:27011/p-mapper-db'
    var server = mongooseServer.createConnection(url, {
        useNewUrlParser: true,
        useFindAndModify: false
    });
    return server;
}
module.exports = {
    dbServer
};