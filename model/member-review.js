var { dbServer } = require('../db/db-config');
var server = dbServer();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var {
    GeneralSkillSchema,
    GoalsMasterSchema
} = require("./member-review-schema");


var memberReviewSchema = new Schema({
    GeneralSkillMaster: GeneralSkillSchema,
    GoalsMaster: GoalsMasterSchema
})

var MemberReviewMaster = server.model('MemberReviewMaster', memberReviewSchema, 'MemberReviewMaster');
module.exports = {
    MemberReviewMaster
};