var {
    dbServer
} = require('../db/db-config');
var server = dbServer();

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var AppDependenciesSchema = new Schema({
    AppId: {
        type: mongoose.Types.ObjectId
    },
    DependencyTitle: {
        type: String
    },
    DependencyId: {
        type: mongoose.Types.ObjectId
    }
});
var AppDependencies = server.model('AppDependencies', AppDependenciesSchema, 'AppDependencies');
module.exports = {
    AppDependencies
}