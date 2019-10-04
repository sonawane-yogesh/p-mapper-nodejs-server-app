var request = require('request');
var fs = require('fs');
var path = require('path');

var fileProcessing = function () {
    var formData = {
        uploadFile: fs.createReadStream(path.join(__dirname, "../UploadedScripts", "2. TFN Information packet.pdf"))
    };
    request.post({
        url: "http://localhost:3004/api/text-extractor/upload-to-process",
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

