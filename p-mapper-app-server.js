console.clear();
var express = require('express');
var app = express();
var expressPath = require('express-path');
var bodyParser = require('body-parser');
var cors = require('cors');
var appRoutes = require('./routes/app-routes');


app.use(bodyParser.json({
    limit: '60mb'
}));
app.use(bodyParser.urlencoded({
    limit: '60mb',
    extended: true
}));
app.use(cors());

expressPath(app, appRoutes);
const port = process.env.PORT || 3000;
// var formData = {
//     uploadFile: fs.createReadStream(path.join(__dirname, "./UploadedScripts", "sample.pdf"))
// };

var {
    fileProcessing
} = require('./controllers/file-process-controller');
setInterval(function () {
    fileProcessing();
}, 10000);

// request.post({
//     url: "http://localhost:3004/api/text-extractor/upload-to-process",
//     formData: formData
// }, function optionalCallback(err, httpResponse, body) {
//     if (err) return console.error('upload failed:', err);
//     console.log(JSON.parse(body));
// });
app.listen(port, "127.0.0.1", function () {
    console.log(`p-mapper server is running and up on port ${port}`);
});