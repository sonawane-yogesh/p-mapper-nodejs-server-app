var express = require('express');
var app = express();
var expressPath = require('express-path');
var bodyParser = require('body-parser');
var cors = require('cors');
var appRoutes = require('./routes/app-routes');
var axios = require("axios");
var FormData = require('form-data');
var fs = require("fs");

app.use(bodyParser.json({
    limit: '60mb'
}));
app.use(bodyParser.urlencoded({
    limit: '60mb',
    extended: true
}));
app.use(cors());
expressPath(app, appRoutes);

// var formData = new FormData();
const formData = new FormData();
formData.append("file-upload", fs.createReadStream("./UploadedScripts/sample.pdf"));
var fileBuffer = fs.readFileSync("./UploadedScripts/sample.pdf"); 
// formData.append("file-upload", "./UploadedScripts/sample.pdf");       
axios.post("http://127.0.0.1:3004/api/text-extractor/extract-text", fileBuffer).then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
});

const port = process.env.PORT || 3000;

app.listen(port, "127.0.0.1", function () {
    console.log(`p-mapper server is running and up on port ${port}`);
});