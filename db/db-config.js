var mongooseServer = require('mongoose');
dbServer = function () {
<<<<<<< HEAD
    var url = 'mongodb://192.168.1.3:27011/p-mapper-db';
=======
    var url = 'mongodb://192.168.0.4:27011/p-mapper-db';
>>>>>>> 058445cf11aa37a5e98c98874e0b0a87f1e117e8
    var server = mongooseServer.createConnection(url, {
        useNewUrlParser: true,
        useFindAndModify: false  
    });
    return server;
}
module.exports = {
    dbServer
}