var express = require('express');
var app = express();
var expressPath = require('express-path');
var bodyParser = require('body-parser');
var cors = require('cors');
var appRoutes = require('./routes/app-routes');
var axios = require("axios");
var FormData = require('form-data');
var fs = require("fs");
var path = require("path");
var multiparty = require('multiparty');
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

app.listen(port, "127.0.0.1", function () {
    console.log(`p-mapper server is running and up on port ${port}`);
});