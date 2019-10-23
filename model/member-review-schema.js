var Mongoose = require("mongoose");
var Schema = Mongoose.Schema;
var {
    MongoServer
} = require('../db/db-config');
var DbServer = MongoServer.dbServer();

var generalSkillSchema = new Schema({
    QualityOfWork: {
        type: String,
        required: true
    },
    Productivity: {
        type: String,
        required: true
    },
    Dependability: {
        type: String,
        required: true
    },
    CoworkerRelation: {
        type: String,
        required: true
    },
    ClientRelation: {
        type: String,
        required: true
    },
    Creativity: {
        type: String,
        required: true
    },
    Communications: {
        type: String,
        required: true
    },
    CreatedBy: {
        type: Mongoose.Types.ObjectId,
        required: true
    },
    CreatedOn: {
        type: Date,
        default: Date.now
    }
});

var goalsMasterSchema = new Schema({
    GoalTitle:{
        type:String,
        required: true
    },
    Notes:{
        type:String,
        required: false
    },
    Projection :{
        type:String,
        required: false
    },
    CurrentStatus :{
        type:String,
        required: true
    }
});

module.exports.GoalsMasterSchema = goalsMasterSchema;
module.exports.GeneralSkillSchema = generalSkillSchema;
module.exports.GeneralSkillsMaster = DbServer.model('GeneralSkillMaster', GeneralSkillSchema, 'GeneralSkillMaster');
module.exports.GoalsMaster = DbServer.model('GoalsMaster', GoalsMasterSchema, 'GoalsMaster');