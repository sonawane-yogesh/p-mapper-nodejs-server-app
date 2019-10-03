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
const port = process.env.PORT || 3002;

app.listen(port, function () {
    console.log(`server is running and up on port ${port}`);
})