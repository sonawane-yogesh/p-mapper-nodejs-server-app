var {
    dbServer
} = require('../db/db-config');
var server = dbServer();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var {
    GeneralSkillSchema,
    GoalsMasterSchema
} = require("./member-review-schema");


var memberReviewSchema = new Schema({
    MemberId: {
        type: mongoose.Types.ObjectId,
        default: null
    },
    MemberName: {
        type: String,
        default: null
    },
    GeneralSkillMaster: GeneralSkillSchema,
    GoalsMaster: GoalsMasterSchema
})

var MemberReviewMaster = server.model('MemberReviewMaster', memberReviewSchema, 'MemberReviewMaster');
module.exports = {
    MemberReviewMaster
};