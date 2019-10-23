var {
    Upload
} = require("./multer-config");

var {
    jobAndAppFileProcessing
} = require("./file-process-controller");
var uploadAssociatedFile = function (request, response) {
    Upload(request, response, function (err) {
        if (err) {
            return response.status(500).send(JSON.stringify({
                "status": "Error in uploading file "
            }));
        } else {
            return response.json({
                uploadDetails: request.uploadDetails
            });
        }
    });
};

var uploadJobAndAppFile = function (request, response) {
    Upload(request, response, async function (err) {
        if (err)
            return response.status(500).send(JSON.stringify({
                "status": "Error in uploading file "
            }));

        // start processing file...  
        var filePath = request.uploadDetails[0].FilePath;
        await jobAndAppFileProcessing(filePath);
        response.send("File(s) are proceesed successfully").end();
    });
};

var downloadFile = function (request, response) {
    var fileName = request.query.fileName;
    var downloadPath = path.join(__dirname, '../UploadedScripts', fileName);
    response.sendFile(downloadPath);
};

module.exports = {
    uploadAssociatedFile,
    downloadFile,
    uploadJobAndAppFile
}