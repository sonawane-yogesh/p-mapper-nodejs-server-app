var fs = require('fs');
var path = require('path');

var showFileContent = function (request, response) {
    var reqBody = request.query;
    var file = JSON.parse(reqBody.file);
    fs.readFile(file.FilePath, 'utf8', (err, content) => {
        if (err)
            response.status(500).send(err);
        else
            response.send(content);
    });
    // response.send('in show file content controller')
};
module.exports = {
    showFileContent
};