var {
    dbServer
} = require("../db/db-config");
var server = dbServer();
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var technicalSkillSchema = new Schema({
    SkillName: {
        type: String
    }
});

var TechnicalSkillMaster = server.model("TechnicalSkillMaster", technicalSkillSchema, "TechnicalSkillMaster");
module.exports = {
    TechnicalSkillMaster
};