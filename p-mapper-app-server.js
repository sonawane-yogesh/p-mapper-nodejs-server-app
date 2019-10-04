var express = require('express');
var app = express();
var expressPath = require('express-path');
var bodyParser = require('body-parser');
var cors = require('cors');
var appRoutes = require('./routes/app-routes');
const path = require("path");
const fs = require("fs");

app.use(bodyParser.json({
    limit: '60mb'
}));
app.use(bodyParser.urlencoded({
    limit: '60mb',
    extended: true
}));
app.use(cors());

expressPath(app, appRoutes);
const port = process.env.PORT || 3001;

var multiparty = require("multiparty");
app.post("/submit", function (httpRequest, httpResponse, next) {
    var dirPath = path.join(__dirname, "./UploadedFiles");
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);

    var form = new multiparty.Form({
        uploadDir: "./UploadedFiles"
    });
    form.on("part", function (part) {
        console.log(part.filename);
        httpResponse.send("Ok");
    });
    form.on("file", function (part) {
        console.log(arguments);
    });
    form.on("error", function (error) {
        console.log(error);
    })
    form.parse(httpRequest);
});

app.listen(port, "127.0.0.1", function () {
    console.log(`p-mapper server is running and up on port ${port}`);
});