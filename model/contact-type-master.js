var {
    dbServer
} = require("../db/db-config");
var server = dbServer();
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var contactTypeSchema = new Schema({
    ContactType: {
        type: String,
        required: true
    }
});


module.exports.ContactTypeSchema = contactTypeSchema;
var ContactTypeMaster = server.model("ContactTypeMaster", contactTypeSchema, "ContactTypeMaster");
module.exports.ContactTypeMaster = ContactTypeMaster;