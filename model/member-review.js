var Mongoose = require("mongoose");
var Schema = Mongoose.Schema;
var {
    MongoServer
} = require('../db/db-config');
var DbServer = MongoServer.dbServer();
var {
    GeneralSkillSchema,
    GoalsMasterSchema
} = require("./index");


var memberReviewSchema = new Schema({
    GeneralSkillMaster: GeneralSkillSchema,
    GoalsMaster: GoalsMasterSchema
})

var MemberReviewMaster = DbServer.model('MemberReviewMaster', memberReviewSchema, 'MemberReviewMaster');
module.exports = {
    MemberReviewMaster
};