var path = require('path');
var fs = require('fs');
var multer = require('multer');

var dirPath = __dirname;
var storage = multer.diskStorage({
    destination: function (request, file, callback) {
        var dirName = request.query.dirName;
        var uploadPath = path.resolve(dirPath, "../", dirName);
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
        };
        callback(null, uploadPath);
    },
    filename: function (request, file, callback) {
        var dirName = request.query.dirName;
        var fullFilePath = path.resolve(dirPath, "../", dirName, file.originalname);
        var regex = /(?:\.([^.]+))?$/;
        var ext = regex.exec(fullFilePath)[1];
        var fileNameWithoutExtension = file.originalname.match(/([^\/]+)(?=\.\w+$)/)[0];
        request.uploadDetails = request.uploadDetails || [];
        request.uploadDetails.push({
            FilePath: fullFilePath,
            FileType: '.' + ext,
            FileNameWithoutExt: fileNameWithoutExtension,
            FileNameWithExtension: file.originalname,
            IsTextExtracted: false
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

module.exports = {
    Upload
};