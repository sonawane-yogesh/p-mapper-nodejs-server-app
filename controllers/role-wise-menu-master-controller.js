var {
  RoleWiseMenuMaster,
  SubMenuMaster,
  MainMenuMaster,
  RoleMaster
} = require("../model/index");

var mongoose = require("mongoose");

var addRoleMenu = async function (request, response) {
  var body = request.body;
  var assignRoles = body.selectedRoles;
  var role = {
    RoleName: body.roleName
  };
  var roleResult = await addRole(role);
  for (aRole of assignRoles) {
    aRole.RoleId = roleResult.id;
    await RoleWiseMenuMaster.create(aRole);
  }
  response.send();
}

var updateRoleMenu = async function (request, response) {
  var body = request.body;
  var assignRoles = body.selectedRoles;
  var roleId = body.roleId;
  await RoleWiseMenuMaster.deleteMany({
    RoleId: roleId
  });
  for (aRole of assignRoles) {
    aRole.RoleId = roleId;
    await RoleWiseMenuMaster.create(aRole);
  }
  response.send();
}

var getAllRoleMenu = function (request, response) {
  RoleWiseMenuMaster.find().then((result) => {
    response.status(200).send(result);
  }).catch((err) => {
    response.status(500).send(err);
  });
}


// This is getting RoleWiseMenu OR SubMenu By Using RoleId 
var getRoleMenuByRoleId = async function (request, response) {
  var roleId = request.query.id;
  var mainIds = [];
  var roleData = await RoleWiseMenuMaster.find({
    RoleId: mongoose.Types.ObjectId(roleId)
  });

  for (role of roleData) {
    var toObject = role.toObject();
    var mainMenuId = toObject.MainMenuId.toString();
    mainIds.push(mainMenuId);
  }
  const distinctMainIds = [...new Set(mainIds.map(x => x))]
  var mainlist = [];
  for (mainId of distinctMainIds) {
    var mainMenu = await getMainMenu(mainId);
    var subMenu = await getAllSubRoleMenu(mainId, roleId);
    var roleMenu = {
      MainMenuName: mainMenu.MainMenuName,
      HasChild: mainMenu.HasChild,
      MainMenuId: mainMenu.MainMenuId,
      SubMenu: subMenu
    };
    mainlist.push(roleMenu);
  }

  response.json(mainlist);
}


// This is for getting all subMenuMaster data by MainMenuId
var getAllSubRoleMenu = async function (mainMenuId, roleId) {
  var subMenu = await RoleWiseMenuMaster.find({
    MainMenuId: mongoose.Types.ObjectId(mainMenuId),
    RoleId: mongoose.Types.ObjectId(roleId),
  });
  var subMainList = [];
  for (sub of subMenu) {
    var tosubObject = sub.toObject();
    if (tosubObject.SubMenuId !== null) {
      var SubMenu = {
        SubMenuName: tosubObject.SubMenuMaster.SubMenuName,
        MainMenuId: tosubObject.SubMenuId.toString()
      }
      subMainList.push(SubMenu);
    }
  }
  return subMainList;
}

// This is get MainMenuMaster data by mainMenuId
var getMainMenu = async function (mainMenuId) {
  var id = mongoose.Types.ObjectId(mainMenuId);
  var result = await MainMenuMaster.findById(id);
  return result;
}


// this is save for RoleName into RoleMaster table
var addRole = async function (role) {
  var result = await RoleMaster.create(role);
  return result;
}

var getRoleMenuById = async function (request, response) {
  var roleId = request.query.id;
  var mainIds = [];
  var roleData = await RoleWiseMenuMaster.find({
    RoleId: mongoose.Types.ObjectId(roleId)
  });
  for (role of roleData) {
    var toObject = role.toObject();
    var mainMenuId = toObject.MainMenuId.toString();
    mainIds.push(mainMenuId);
  }
  const distinctMainIds = [...new Set(mainIds.map(x => x))]
  var mainlist = [];
  for (mainId of distinctMainIds) {
    var subList = [];
    var mainMenu = await getMainMenu(mainId);
    var subMenu = await SubMenuMaster.find({
      MainMenuId: mainId
    });
    for (sMenu of subMenu) {
      var toSObject = sMenu.toObject();
      var sMenuId = toSObject.id.toString();
      const userExists = await RoleWiseMenuMaster.exists({
        SubMenuId: sMenuId,
        RoleId: roleId
      });
      if (userExists) {
        subList.push(sMenu);
      }
    }
    var roleMenu = {
      MainMenu: mainMenu,
      SubMenu: subList
    };
    mainlist.push(roleMenu);
  }
  response.send(mainlist);
}

module.exports = {
  addRoleMenu,
  getAllRoleMenu,
  getRoleMenuByRoleId,
  getAllSubRoleMenu,
  addRole,
  getRoleMenuById,
  updateRoleMenu
}