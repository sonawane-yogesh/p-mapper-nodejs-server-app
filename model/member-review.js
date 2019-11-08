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
    GoalsMaster: GoalsMasterSchema,
    CreatedBy: {
        type: mongoose.Types.ObjectId,
        required: false,
        default: null
    },
    CreatedOn: {
        type: Date,
        default: Date.now,
        get: function (v) {
            return v.toLocaleDateString("en-us");
        }
    },
    UpdatedOn: {
        type: Date,
        default: Date.now,
        get: function (v) {
            return v.toLocaleDateString("en-us");
        }
    }
});
// Do not remove this commented portion... PLEASE
// memberReviewSchema.virtual("DateCreated");
// const { dateFormatPlugin} = require("../plugins/date-format-plugin");
// memberReviewSchema.plugin(dateFormatPlugin);

memberReviewSchema.set("toJSON", {
    virtuals: true,
    getters: true
});
memberReviewSchema.set("toObject", {
    virtuals: true,
    getters: true
});

var MemberReviewMaster = server.model('MemberReviewMaster', memberReviewSchema, 'MemberReviewMaster');
module.exports = {
    MemberReviewMaster
};