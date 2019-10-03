var {
    dbServer
} = require('../db/db-config');
var server = dbServer();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var jobCardSchema = new Schema({
    JobTitle: {
        type: String,
        required: true
    },
    AssociatedFiles: {
        type: Array,
        required: true
    },
    Tags: {
        type: Array,
        required: String
    },
    BusinessPurpose: {
        type: String,
        required: true
    },
    BusinessProcess: {
        type: String,
        required: true
    },
    ExecutionFrequency: {
        type: String,
        required: true
    },
    StartTime: {
        type: String,
        required: true
    },
    EstimatedTime: {
        type: String,
        required: String
    },
    MissionStatus: {
        type: Boolean,
        required: true
    },  
    CardType: {
        type: String,
        required: true
    }
});
var JobCardMaster = server.model('JobCardMaster', jobCardSchema, 'JobCardMaster');
module.exports = {
    JobCardMaster
}