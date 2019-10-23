var {
    dbServer
} = require('../db/db-config');
var server = dbServer();

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var appDependenciesSchema = new Schema({
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
var AppDependencies = server.model('AppDependencies', appDependenciesSchema, 'AppDependencies');
module.exports = {
    AppDependencies
}