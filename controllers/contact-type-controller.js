
var {ContactTypeMaster} = require("../model/index");

var addContactType = function(request, response){
    var body = request.body;
    ContactTypeMaster.create(body).then(result => {
        response.status(200).send(JSON.stringify(result));
    }).catch((err) => {
        response.status(500).send(JSON.stringify(err));
    });
}

var getAllContactType = function(request, response){
    ContactTypeMaster.find().then((result) => {
        response.status(200).send(JSON.stringify(result));
    }).catch((error) => {
        response.status(500).send(JSON.stringify(error));
    });
}

module.exports = {
    addContactType,
    getAllContactType
}