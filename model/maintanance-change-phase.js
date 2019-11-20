var { dbServer } = require('../db/db-config');
var server = dbServer();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var {MaintenanceActivity} = require("./index");

var maintanaceChangePhaseSchema = new Schema({
     MaintanaceActivityId :{
         type: mongoose.Types.ObjectId       
     },
     CreatedOn: {
        type: Date,
        default: Date.now
    },
    CreatedBy: {
        type: mongoose.Types.ObjectId,
        required: false,
        default: null
    },
    UpdatedOn: {
        type: Date,
        default: Date.now
    },
     CurrentPhase: {
        type: String,
        required: true
    },
});


var maintanaceActivityVirtuals = {
    path: "MaintenanceActivity",
    value: {
        from: "MaintenanceActivity",
        localField: "MaintanaceActivityId",
        foreignField: "_id",
        as: "MaintenanceActivity"
    },
    fields: ["_id", "AppName"]
};
maintanaceChangePhaseSchema.virtual(maintanaceActivityVirtuals.path, maintanaceActivityVirtuals.value);

maintanaceChangePhaseSchema.pre(["find", "findOne"], function (next) {
    var mSchema = this;    
    mSchema.populate(maintanaceActivityVirtuals.path, maintanaceActivityVirtuals.fields, MaintenanceActivity);
    
    next();
});

maintanaceChangePhaseSchema.pre("aggregate", function (next) {
    var userMaster = this;
    userMaster.lookup(maintanaceActivityVirtuals.value).unwind(maintanaceActivityVirtuals.path);
    
    next();
});

maintanaceChangePhaseSchema.set("toJSON", {
    virtuals: true
});
maintanaceChangePhaseSchema.set('toObject', {
    virtuals: true,
    getters: true
});

var MaintanaceChangePhase = server.model("MaintanaceChangePhase", maintanaceChangePhaseSchema, "MaintanaceChangePhase")
module.exports = {
    MaintanaceChangePhase
}