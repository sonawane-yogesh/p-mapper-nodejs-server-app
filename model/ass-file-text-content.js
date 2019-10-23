var {
    dbServer
} = require('../db/db-config');
var server = dbServer();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var assFileTextContent = new Schema({
    JobId: {
        type: mongoose.Types.ObjectId
    },
    AssociatedFileId: {
        type: mongoose.Types.ObjectId
    },
    ExtractedText: {
        type: String
    }
});

var FileTextContent = server.model("FileTextContent", assFileTextContent, "FileTextContent");
module.exports = {
    FileTextContent
}