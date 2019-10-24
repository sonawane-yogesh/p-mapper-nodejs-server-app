var {
    dbServer
} = require('../db/db-config');
var server = dbServer();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var systemMemberSchema = new Schema({
    MemberId: {
        type: String,
        required: true
    },
    MemberName: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    AltEmail: {
        type: String,
        required: true
    },
    Phone1: {
        type: String,
        required: true
    },
    Phone2: {
        type: String,
        required: true
    },
    Phone3: {
        type: String,
        required: true
    },
    SmsPhone: {
        type: String,
        required: true
    },
    ContactType: {
        type: String,
        required: true
    },
    ReportTo: {
        type: Schema.Types.ObjectId,
        required: true
    }
});
/*
var virtual = systemMemberSchema.virtual('MemberType');
virtual.get(function (value, virtual, doc) {
    return `${this.MemberName} - ${this.ContactType}`;
});


systemMemberSchema.virtual("MemberType", function () {
    return `${this.MemberName} - ${this.ContactType}`;    
});

systemMemberSchema.pre(["find", "findOne"], function (next) {
    this.MemberType = `${this.MemberName} - ${this.ContactType}`;
    next();
});
*/
var SystemMember = server.model("SystemMember", systemMemberSchema, "SystemMember");
module.exports = {
    SystemMember
}