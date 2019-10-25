var {
    dbServer
} = require('../db/db-config');
var server = dbServer();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var associatedDocSchema = new Schema({
    FilePath: {
        type: String,
        required: true
    },
    FileType: {
        type: String,
        required: true
    },
    FileNameWithoutExt: {
        type: String,
        required: true
    },
    FileNameWithExtension: {
        type: String,
        required: true
    },
    IsTextExtracted: {
        type: Boolean,
        default: false
    }
});

var jobCardSchema = new Schema({
    JobTitle: {
        type: String,
        required: true
    },
    AssociatedFiles: [associatedDocSchema],
    Tags: {
        type: [String],
        required: true
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
        required: true
    },
    MissionStatus: {
        type: Boolean,
        required: true
    },
    CardType: {
        type: String,
        required: true
    },
    CreatedOn: {
        type: Date,
        default: Date.now
    },
    CreatedBy: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    UpdatedOn: {
        type: Date,
        default: Date.now
    }
});
/*
jobCardSchema.pre("aggregate", function (next) {
    this.lookup({
        from: 'JobDependencies',
        localField: '_id',
        foreignField: 'JobId',
        as: 'Dependencies'
    });
    next();
});
*/
var AssociatedFiles = server.model('AssociatedFiles', associatedDocSchema, 'AssociatedFiles');
var JobCardMaster = server.model('JobCardMaster', jobCardSchema, 'JobCardMaster');
module.exports = {
    JobCardMaster,
    AssociatedFiles
}