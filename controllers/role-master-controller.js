var {
    RoleMaster
} = require("../model/index");

var addRole = function(request, response){
    var body = request.body;
    RoleMaster.create(body).then(d => {
        response.status(200).send(JSON.stringify(d));
    }).catch(err => {
        response.status(500).send(JSON.stringify(err));
    });
}

var getAllRole = function(request, response){
    RoleMaster.find().then((d) =>{
        response.status(200).send(JSON.stringify(d));
    }).catch((err) => {
        response.status(500).send(JSON.stringify(err));
    });
}
 


module.exports = {
    addRole,
    getAllRole
}