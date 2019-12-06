
var {
  RoleWiseMenuMaster, MainMenuMaster, SubMenuMaster, RoleMaster
} = require("../model/index");

var mongoose = require("mongoose");

var addMainMenu = function (request, response) {
  var body = request.body;
  MainMenuMaster.create(body).then((result) => {
    console.log(result);
    response.status(200).send(result);
  }).catch((err) => {
    console.log(err);
    response.status(500).send(err);
  });
}

var getAllMainMenu = async function (request, response) {    
  var allRoleList = [];
  var mainMenus = await MainMenuMaster.find();
  for (mainMenu of mainMenus) {
    var mainMenuId = mainMenu._id;
    var roleMenu = {
      name: mainMenu.MainMenuName,
      id: mainMenu._id,
      pid: ""
    }
    allRoleList.push(roleMenu);
    var data = await getAllSubMenuMaster(mainMenuId);
    for (d of data) {
      var roleMenu = {
        name: d.SubMenuName,
        pid: mainMenu._id,
        id: d._id
      }
      allRoleList.push(roleMenu);
    }
  };
  response.send(allRoleList);
};

var mainMenuMaster = async function (request, response) {
  var mainMenus = await MainMenuMaster.aggregate([{
      $lookup: {
        from: "SubMenuMaster",
        localField: "_id",
        foreignField: "MainMenuId",
        as: "SubMenuMaster"
      }
    }
  ]).exec();
  response.json(mainMenus);
};

var getAllSubMenuMaster = async function (id) {
  var subMenu = await SubMenuMaster.find({
    MainMenuId: mongoose.Types.ObjectId(id)
  });
  return subMenu;
}

var getAllMainMenuUpdate = async function (request, response) { 
  var roleId = request.query.id;
  var ids = []; 
  var roleData = await RoleWiseMenuMaster.find({
    RoleId: mongoose.Types.ObjectId(roleId)
  });   
  for(role of roleData){
    var toObject = role.toObject();
    if(toObject.SubMenuId !== null){
       ids.push(toObject.SubMenuId.toString());
      }
      else {
        ids.push(toObject.MainMenuId.toString());
      }     
  };  
  var allRoleList = [];
  var mainMenus = await MainMenuMaster.find();
  for (mainMenu of mainMenus) {
    var mainMenuId = mainMenu._id;
    var roleMenu = {
      name: mainMenu.MainMenuName,
      id: mainMenu._id,
      pid: ""
    }
    allRoleList.push(roleMenu);
    var data = await getAllSubMenuMaster(mainMenuId);
    for (d of data) {
      var roleMenu = {
        name: d.SubMenuName,
        pid: mainMenu._id,
        id: d._id
      }
      allRoleList.push(roleMenu);
    }
  };
  var finalList = {    
    selectedIds : ids,
    allRole: allRoleList
  };
  response.send(finalList);
};

module.exports = {
  addMainMenu,
  getAllMainMenu,
  mainMenuMaster,
  getAllMainMenuUpdate
}