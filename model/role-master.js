var {
    dbServer
} = require("../db/db-config");
var server = dbServer();
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var roleMasterSchema = new Schema({
    RoleName: {
        type: String,
        required: true
    }
});
roleMasterSchema.set('toJSON', {
    virtuals: true
});
roleMasterSchema.set('toObject', {
    virtuals: true,
    getters: true
});

module.exports.RoleMasterSchema = roleMasterSchema
var RoleMaster = server.model("RoleMaster", roleMasterSchema, "RoleMaster");
module.exports.RoleMaster = RoleMaster;