var {
    dbServer
} = require('../db/db-config');
var server = dbServer();

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var {
    SubMenuMaster
} = require("../model/sub-menu-master");
var {
    MainMenuMaster
} = require("../model/main-menu-master");

var RoleWiseMenuMasterSchema = new Schema({
    RoleId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    MainMenuId: {
        type: mongoose.Types.ObjectId,
        //  ref: "MainMenuMaster",
        //  autopopulate: true
    },
    SubMenuId: {
        type: mongoose.Types.ObjectId,
        default: null
    },
    /*
    SubMenuMaster:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubMenuMaster",
        autopopulate: true
    }
    */
});

var subMenuVirtuals = {
    path: "SubMenuMaster",
    value: {
        form: "SubMenuMaster",
        localField: "SubMenuId",
        foreignField: "_id",
        as: "SubMenuMaster"
    },
    fields: ["_id", "MainMenuId", "SubMenuName", "HtmlText"]
};

var mainMenuVirtuals = {
    path: "MainMenuMaster",
    value: {
        form: "MainMenuMaster",
        localField: "MainMenuId",
        foreignField: "_id",
        as: "MainMenuMaster"
    },
    fields: ["_id", "MainMenuName", "HasChild", "HtmlText", "MenuOrderNumber"]
}
RoleWiseMenuMasterSchema.virtual(subMenuVirtuals.path, subMenuVirtuals.value);
RoleWiseMenuMasterSchema.virtual(mainMenuVirtuals.path, mainMenuVirtuals.value);

const findHook = function (next) {
    var roleWiseMenuMaster = this;
    roleWiseMenuMaster.populate(subMenuVirtuals.path, subMenuVirtuals.fields, SubMenuMaster);
    roleWiseMenuMaster.populate(mainMenuVirtuals.path, mainMenuVirtuals.fields, MainMenuMaster);
    next();
}
RoleWiseMenuMasterSchema.pre(["find", "findOne"], findHook);


RoleWiseMenuMasterSchema.pre("aggregate", function (next) {
    var roleWiseMenuMaster = this;
    roleWiseMenuMaster.lookup(subMenuVirtuals.value).unwind(subMenuVirtuals.path);
    roleWiseMenuMaster.lookup(mainMenuVirtuals.value).unwind(mainMenuVirtuals.path);   
    next();
});

RoleWiseMenuMasterSchema.set('toJSON', {
    virtuals: true,
    getters: true
});
RoleWiseMenuMasterSchema.set('toObject', {
    virtuals: true,
    getters: true
});

var RoleWiseMenuMaster = server.model("RoleWiseMenuMaster", RoleWiseMenuMasterSchema, "RoleWiseMenuMaster");
/*
const autopopulate = require('mongoose-autopopulate');
RoleWiseMenuMasterSchema.plugin(autopopulate);
*/

module.exports = {
    RoleWiseMenuMaster
}