var path = require('path');
var fs = require('fs');
var multer = require('multer');

var dirPath = __dirname;
var storage = multer.diskStorage({
    destination: function (request, file, callback) {
        var uploadPath = path.join(dirPath, '../UploadedScripts');
        //var uploadObjPath=path.join(dirpath)
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
        };
        callback(null, uploadPath);
    },
    filename: function (request, file, callback) {
        var fullFilePath = path.join(dirPath, '../UploadedScripts', file.originalname);
        var regex = /(?:\.([^.]+))?$/;
        var ext = regex.exec(fullFilePath)[1];
        var fileNameWithoutExtension = file.originalname.match(/([^\/]+)(?=\.\w+$)/)[0];
        request.uploadDetails = request.uploadDetails || [];
        request.uploadDetails.push({
            FilePath: fullFilePath,
            FileType: '.' + ext,
            FileNameWithoutExt: fileNameWithoutExtension,
            FileNameWithExtension: file.originalname
        });
        callback(null, file.originalname);
    }
});

var Upload = multer({
    storage: storage,
    limits: {
        fileSize: 9999999
    }
}).array('fileUpload', 12);

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

module.exports = {
    uploadAssociatedFile
}