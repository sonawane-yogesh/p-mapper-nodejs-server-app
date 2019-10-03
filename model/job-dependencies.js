var {
    dbServer
} = require('../db/db-config');
var server = dbServer();

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var JobDependenciesSchema = new Schema({
    JobId: {
        type: mongoose.Types.ObjectId
    },
    DependencyTitle: {
        type: String
    },
    DependencyId: {
        type: mongoose.Types.ObjectId
    }
});
var JobDependencies = server.model('JobDependencies', JobDependenciesSchema, 'JobDependencies');
module.exports = {
    JobDependencies
}