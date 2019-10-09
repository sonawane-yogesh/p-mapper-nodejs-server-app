var request = require('request');
var rp = require('request-promise');
var fs = require('fs');
var path = require('path');
var {
    JobCardMaster
} = require('../model');

var fileProcessing = function () {
    // Step 1. Collect all files which has not processed or text is not yet extracted...
    // Like search for IsTextExtracted = false;

    // const someFiles = JobCardMaster.find({
    //     "AssociatedFiles.IsTextExtracted": false
    // });
    // Run array look over someFiles...
    // for (var file of someFiles) {

    // }
    var formData = {
        uploadFile: fs.createReadStream(path.join(__dirname, "../UploadedScripts", "FileMaster.csv"))
    };
    // rp.post({
    //     url: "http://localhost:3001/api/text-extractor/upload-to-process",
    //     formData: formData
    // }).then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // });
    request.post({
        url: "http://localhost:3001/api/text-extractor/upload-to-process",
        formData: formData
    }, function optionalCallback(err, httpResponse, body) {
        if (err) return console.error('upload failed:', err);
        var textContent = JSON.parse(body);
        console.log(textContent);
    });    
};
module.exports = {
    fileProcessing
};