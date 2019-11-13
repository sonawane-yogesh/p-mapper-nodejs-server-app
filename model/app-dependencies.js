var {
    dbServer
} = require('../db/db-config');
var {
    ApplicationCardMaster
} = require("./application-card");
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

var applicationCardMasterVirtuals = {
    path: "ApplicationCardMaster",
    value: {
        form: "ApplicationCardMaster",
        foreignField: "_id",
        localField: "AppId",
        as: "ApplicationCardMaster",
    },
    fields: ["_id", "AppTitle", "ServerName"]
}

appDependenciesSchema.virtual(applicationCardMasterVirtuals.path, applicationCardMasterVirtuals.value);

appDependenciesSchema.pre(["find", "findOne"], function (next) {
    var appDepends = this;
    appDepends.populate(applicationCardMasterVirtuals.path, applicationCardMasterVirtuals.fields, ApplicationCardMaster)
    next();
})

appDependenciesSchema.pre("aggregate", function(next){
    var appDepends = this;
    appDepends.lookup(applicationCardMasterVirtuals.value).unwind(applicationCardMasterVirtuals.path);
})

appDependenciesSchema.set('toJSON', {
    virtuals: true
})

appDependenciesSchema.set('toObject',{
    virtuals: true,
    getters: true
})

var AppDependencies = server.model('AppDependencies', appDependenciesSchema, 'AppDependencies');
module.exports = {
    AppDependencies
}