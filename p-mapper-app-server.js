console.clear();
var express = require('express');
var app = express();
var expressPath = require('express-path');
var bodyParser = require('body-parser');
var cors = require('cors');
var appRoutes1 = require('./routes/app-routes1');
const https = require('https');
const fs = require('fs');

app.use(bodyParser.json({
    limit: '60mb'
}));
app.use(bodyParser.urlencoded({
    limit: '60mb',
    extended: true
}));
app.use(cors());
expressPath(app, appRoutes1);
const port = process.env.PORT || 3000;

var {
    fileProcessing
} = require('./controllers/file-process-controller');
setInterval(async function () {
    await fileProcessing();
}, 120000);
/*
var options = {
    key: fs.readFileSync('./certificates/device.key'),
    cert: fs.readFileSync('./certificates/device.crt')
};
var server = https.createServer(options, app);
*/

app.listen(port, function () {
    console.log(`p-mapper server is running and up on port ${port}`);
});