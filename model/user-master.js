var {
    dbServer
} = require('../db/db-config');
var server = dbServer();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var {
    RoleMaster
} = require("./role-master");
var {
    ContactTypeMaster
} = require("./contact-type-master");

// this is user master js

var userSchema = new Schema({
    FirstName: {
        type: String
    },
    LastName: {
        type: String
    },
    Username: {
        type: String
    },
    Password: {
        type: String
    },
    ContactNo: {
        type: Number
    },
    EmailId: {
        type: String
    },
    RoleId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    ContactTypeId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    ReportToId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
});

var virtualFullName = userSchema.virtual("FullName");
virtualFullName.get(function () {
    return `${this.FirstName} ${this.LastName}`;
});

var roleVirtuals = {
    path: "RoleMaster",
    value: {
        from: "RoleMaster",
        foreignField: "_id",
        localField: "RoleId",
        as: "RoleMaster"
    },
    fields: ["_id", "RoleName"]
};

var contactTypeVirtuals = {
    path: "ContactTypeMaster",
    value: {
        from: "ContactTypeMaster",
        foreignField: "_id",
        localField: "ContactTypeId",
        as: "ContactTypeMaster"
    },
    fields: ["_id", "ContactType"]
};

var userMasterVirtuals = {
    path: "UserMaster",
    value: {
        from: "UserMaster",
        foreignField: "_id",
        localField: "ReportToId",
        as: "UserMaster"
    },
    fields: ["_id", "FirstName", "LastName", "ContactTypeId"]
};

userSchema.virtual(roleVirtuals.path, roleVirtuals.value);
userSchema.virtual(contactTypeVirtuals.path, contactTypeVirtuals.value);
userSchema.virtual(userMasterVirtuals.path, userMasterVirtuals.value);

const findHook = function (next) {
    var userMaster = this;
    userMaster.populate(roleVirtuals.path, roleVirtuals.fields, RoleMaster);
    userMaster.populate(contactTypeVirtuals.path, contactTypeVirtuals.fields, ContactTypeMaster);
    userMaster.populate(userMasterVirtuals.path, userMasterVirtuals.fields);
    next();
};

userSchema.pre(["find", "findOne"], findHook);

userSchema.pre("aggregate", function (next) {
    var userMaster = this;
    userMaster.lookup(roleVirtuals.value).unwind(roleVirtuals.path);
    userMaster.lookup(contactTypeVirtuals.value).unwind(contactTypeVirtuals.path);
    userMaster.lookup(userMasterVirtuals.value).unwind({
        path: `$${userMasterVirtuals.path}`,
        preserveNullAndEmptyArrays: true
    }).lookup({
        from: "ContactTypeMaster",
        localField: "UserMaster.ContactTypeId",
        foreignField: "_id",
        as: "UserMaster.ContactTypeMaster"
    }).unwind("UserMaster.ContactTypeMaster"); // .lookup(userMasterVirtuals.value).unwind(userMasterVirtuals.path);

    next();
});

userSchema.set('toJSON', {
    virtuals: true
});
userSchema.set('toObject', {
    virtuals: true,
    getters: true
});

var UserMaster = server.model('UserMaster', userSchema, 'UserMaster');

module.exports = {
    UserMasterSchema: userSchema,
    UserMaster
};