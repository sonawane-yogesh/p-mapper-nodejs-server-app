var { dbServer } = require('../db/db-config');
var server = dbServer();

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MainMenuMasterSchema = new Schema({
    MainMenuName: {
        type: String,
        required: true        
    },
    Defualt: {
        type:Boolean,
        required: true
    },
    HasChild: {
        type: Boolean,
        required: true
    },
    HtmlText: {
        type: String,
        required: true
    },
    MenuOrderNumber:{
        type: Number,
        default: null
    }
});

var MainMenuMaster = server.model('MainMenuMaster', MainMenuMasterSchema, 'MainMenuMaster');
module.exports = {
    MainMenuMaster
}

