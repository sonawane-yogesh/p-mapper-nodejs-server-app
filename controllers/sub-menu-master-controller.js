var {SubMenuMaster} = require("../model/index");


var addSubMenu = function(request, response){
    var body = request.body;
    SubMenuMaster.create(body).then((result) => {
      console.log(result);
      response.status(200).send(result);
    }).catch((err) => {
       console.log(err);
       response.status(500).send(err);
    });
}

var getAllSubMenu = function (request, response) {
  SubMenuMaster.find().then((result) => {
    console.log(result);
    response.status(200).send(result);
  }).catch((error) => {
    console.log(error);
    response.status(500).send(error);
  })
}

module.exports = {
    addSubMenu,
    getAllSubMenu
}