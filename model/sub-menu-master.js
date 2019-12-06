var {
    dbServer
} = require('../db/db-config');
var server = dbServer();

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var {
    MainMenuMaster
} = require("../model/main-menu-master");

var SubMenuMasterSchema = new Schema({
    MainMenuId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    SubMenuName: {
        type: String,
        required: true
    },
    HtmlText: {
        type: String,
        required: true
    }
});


var mainMenuVirtuals = {
    path: "MainMenuMaster",
    value: {
        form: "MainMenuMaster",
        localField: "MainMenuId",
        foreignField: "_id",
        as: "MainMenuMaster"
    },
    fields: ["_id", "MainMenuName", "HasChild", "HtmlText"]
}

SubMenuMasterSchema.virtual(mainMenuVirtuals.path, mainMenuVirtuals.value);


const findHook = function (next) {
    var subMenuMaster = this;
    subMenuMaster.populate(mainMenuVirtuals.path, mainMenuVirtuals.fields, MainMenuMaster);
    next();
}
SubMenuMasterSchema.pre(["find", "findOne"], findHook);


SubMenuMasterSchema.pre("aggregate", function (next) {
    var subMenuMaster = this;
    subMenuMaster.lookup(mainMenuVirtuals.value).unwind(mainMenuVirtuals.path);   
    next();
});


SubMenuMasterSchema.set('toJSON', {
    virtuals: true,
    getters: true
});
SubMenuMasterSchema.set('toObject', {
    virtuals: true,
    getters: true
});


var SubMenuMaster = server.model('SubMenuMaster', SubMenuMasterSchema, 'SubMenuMaster');
module.exports = {
    SubMenuMaster
}