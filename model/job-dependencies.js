var {
    dbServer
} = require('../db/db-config');
const {
    JobCardMaster
} = require("./job-card");
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

var jobCardMasterVirtuals = {
    path: "JobCardMaster",
    value: {
        from: "JobCardMaster",
        foreignField: "_id",
        localField: "JobId",
        as: "JobCardMaster",
        justOne: true,
        getters: true
    },
    fields: ["_id", "JobTitle", "BusinessPurpose", "BusinessProcess"]
};
JobDependenciesSchema.virtual(jobCardMasterVirtuals.path, jobCardMasterVirtuals.value);

JobDependenciesSchema.pre(["find", "findOne"], function (next) {
    var jobDeps = this;
    jobDeps.populate(jobCardMasterVirtuals.path, jobCardMasterVirtuals.fields, JobCardMaster);
    next();
});

JobDependenciesSchema.pre("aggregate", function (next) {
    var jobDependencies = this;
    jobDependencies.lookup(jobCardMasterVirtuals.value).unwind(jobCardMasterVirtuals.path);
    next();
});

JobDependenciesSchema.set('toJSON', {
    virtuals: true
});
JobDependenciesSchema.set('toObject', {
    virtuals: true,
    getters: true
});

var JobDependencies = server.model('JobDependencies', JobDependenciesSchema, 'JobDependencies');
module.exports = {
    JobDependencies
}